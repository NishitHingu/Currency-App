import {
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  TableRow,
  TableCell,
  Typography,
  useTheme,
  Box,
} from "@material-ui/core";
import React, { useContext, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Line, LineChart, YAxis } from "recharts";
import { FetchContext } from "../Context/FetchContext";
import EnhancedTableHead from "./EnhancedTableHead";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  paper: {
    width: "100%",
    height: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 550,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  logo: {
    height: "1.5rem",
    margin: "0 0.5rem 0 0",
  },
  incresePercentage: {
    color: "green",
  },
  pagination: {
    backgroundColor: theme.palette.background.paper,
  },
}));

// Formating data function
function createData(
  id,
  ranking,
  name,
  price,
  imgSrc,
  marketChange24h,
  marketChange7d,
  totalVolume,
  marketCap,
  plot
) {
  let plotData = plot.map((data) => ({ value: data }));
  plotData = plotData.filter((data, index) => (index % 2 === 0 ? true : false));
  return {
    id,
    ranking,
    imgSrc,
    name,
    price,
    marketChange24h,
    marketChange7d,
    totalVolume,
    marketCap,
    plotData,
  };
}

// Table Head
const headCells = [
  {
    id: "ranking",
    align: "right",
    numeric: true,
    disablePadding: true,
    label: "",
    allowSort: false,
  },
  {
    id: "name",
    numeric: false,
    align: "left",
    disablePadding: true,
    label: "Name",
    allowSort: true,
  },
  {
    id: "price",
    align: "right",
    numeric: true,
    disablePadding: false,
    label: "Price",
    allowSort: true,
  },
  {
    id: "marketChange24h",
    align: "right",
    numeric: true,
    disablePadding: false,
    label: "24H",
    allowSort: true,
  },
  {
    id: "totalVolume",
    align: "right",
    numeric: true,
    disablePadding: false,
    label: "Volume",
    allowSort: true,
  },
  {
    id: "marketCap",
    align: "right",
    numeric: true,
    disablePadding: false,
    label: "Market Cap",
    allowSort: true,
  },
  {
    id: "last7Days",
    align: "center",
    numeric: false,
    disablePadding: false,
    label: "Last 7 Days",
    allowSort: false,
  },
];

// Sorting data functions
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const CryptoCurrency = (props) => {
  // Reducer function
  const cryptoReducer = (state, action) => {
    switch (action.type) {
      case "SETDATA":
        return {
          ...state,
          cryptoData: action.payload.data,
          loading: false,
          failedToLoad: false,
        };
      case "UPDATESORTINFO":
        return {
          ...state,
          order: action.payload.order,
          orderBy: action.payload.orderBy,
          failedToLoad: false,
        };
      case "FAILEDTOLOAD":
        return {
          ...state,
          failedToLoad: true,
        };
      default:
        return {
          ...state,
        };
    }
  };
  const paginationReducer = (state, action) => {
    switch (action.type) {
      case "SETPAGE":
        return {
          ...state,
          page: action.payload.page,
        };
      case "SETROWSPERPAGE":
        return {
          ...state,
          rowsPerPage: action.payload.pages,
        };
      default:
        return {
          ...state,
        };
    }
  };

  const [paginationData, dispatchPaginationData] = useReducer(
    paginationReducer,
    {
      page: 0,
      rowsPerPage: 10,
    }
  );
  const [cryptoCurrencyData, dispatchCryptoCurrencyData] = useReducer(
    cryptoReducer,
    {
      cryptoData: [],
      order: "desc",
      orderBy: "marketCap",
      loading: true,
      failedToLoad: false,
    }
  );
  const { GetCryptoCurrencyData } = useContext(FetchContext);
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    props.setPath("CryptoCurrency");
    // Increase scroll height so user can scroll along X-axis
    const r = document.querySelector(":root");
    r.style.setProperty("--scrollHeight", "5px");
    async function fetchData() {
      let failed = false;
      let result = await GetCryptoCurrencyData().catch((error) => {
        dispatchCryptoCurrencyData({
          type: "FAILEDTOLOAD",
        });
        failed = true;
      });
      if (!failed) {
        let displayData = result.map((result) =>
          createData(
            result.id,
            result.market_cap_rank,
            result.name,
            result.current_price,
            result.image,
            result.price_change_percentage_24h,
            result.price_change_percentage_7d_in_currency,
            result.total_volume,
            result.market_cap,
            result.sparkline_in_7d.price
          )
        );
        dispatchCryptoCurrencyData({
          type: "SETDATA",
          payload: {
            data: displayData,
          },
        });
      }
    }
    fetchData();

    return function cleanUpScroll() {
      // Decreasing the scroll size back to zero to hide the white dot in dark mode
      const r = document.querySelector(":root");
      r.style.setProperty("--scrollHeight", "0");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc =
      cryptoCurrencyData.orderBy === property &&
      cryptoCurrencyData.order === "asc";
    dispatchCryptoCurrencyData({
      type: "UPDATESORTINFO",
      payload: {
        order: isAsc ? "desc" : "asc",
        orderBy: property,
      },
    });
  };

  // Pagination Functions

  const handleChangePage = (event, newPage) => {
    dispatchPaginationData({
      type: "SETPAGE",
      payload: {
        page: parseInt(newPage),
      },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    dispatchPaginationData({
      type: "SETROWSPERPAGE",
      payload: {
        pages: event.target.value,
      },
    });
  };

  return (
    <div className={classes.root}>
      <TableContainer style={{ height: "90%" }}>
        <Table stickyHeader className={classes.table}>
          <EnhancedTableHead
            classes={classes}
            order={cryptoCurrencyData.order}
            orderBy={cryptoCurrencyData.orderBy}
            onRequestSort={handleRequestSort}
            headCell={headCells}
          ></EnhancedTableHead>
          {cryptoCurrencyData.failedToLoad ? (
            <TableBody>
              <TableRow>
                <TableCell style={{ border: "none" }}>
                  {" "}
                  {/*To remove the unwanted line apperaing at the edge*/}
                  <span
                    style={{
                      position: "absolute",
                      width: "95%",
                      top: "40%",
                    }}
                  >
                    <Typography variant="h4" align="center">
                      Failed To Load Data
                    </Typography>
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : cryptoCurrencyData.loading ? (
            <TableBody>
              <TableRow>
                <TableCell style={{ border: "none" }}>
                  {" "}
                  {/*To remove the unwanted line apperaing at the edge*/}
                  <Loader />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {stableSort(
                cryptoCurrencyData.cryptoData,
                getComparator(
                  cryptoCurrencyData.order,
                  cryptoCurrencyData.orderBy
                )
              )
                .slice(
                  paginationData.page * paginationData.rowsPerPage,
                  paginationData.page * paginationData.rowsPerPage +
                    paginationData.rowsPerPage
                )
                .map((row, index) => {
                  return (
                    <TableRow key={row.name}>
                      <TableCell component="th" id={row.ranking} scope="row">
                        {row.ranking}
                      </TableCell>
                      <TableCell padding="none" align="left">
                        <Typography
                          variant="body2"
                          component={Link}
                          to={`/cryptoCurrency/${row.id}`}
                          className={classes.logoWrapper}
                        >
                          <img
                            src={row.imgSrc}
                            className={classes.logo}
                            alt="logo"
                          ></img>
                          <span>{row.name}</span>
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {"€" +
                          (typeof row.price === "number"
                            ? row.price.toLocaleString()
                            : row.price)}
                      </TableCell>
                      <TableCell align="right">
                        {row.marketChange24h > 0 ? (
                          <Typography className={classes.incresePercentage}>
                            {typeof row.marketChange24h === "number"
                              ? row.marketChange24h.toFixed(3)
                              : row.marketChange24h}
                            %
                          </Typography>
                        ) : (
                          <Typography color="error">
                            {typeof row.marketChange24h === "number"
                              ? row.marketChange24h.toFixed(3)
                              : row.marketChange24h}
                            %
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {"€" +
                          (typeof row.totalVolume === "number"
                            ? row.totalVolume.toLocaleString()
                            : row.totalVolume)}
                      </TableCell>
                      <TableCell align="right">
                        {"€" +
                          (typeof row.marketCap === "number"
                            ? row.marketCap.toLocaleString()
                            : row.marketCap)}
                      </TableCell>
                      <TableCell
                        padding="none"
                        size="small"
                        style={{
                          height: "60px",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                          component={Link}
                          to={`/cryptoCurrency/${row.id}`}
                        >
                          <LineChart
                            width={100}
                            height={57}
                            data={row.plotData}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            <YAxis
                              hide={true}
                              domain={["dataMin", "dataMax"]}
                            />
                            {row.marketChange7d > 0 ? (
                              <Line
                                animationDuration={500}
                                dot={false}
                                connectNulls={true}
                                type="monotone"
                                dataKey="value"
                                stroke="green"
                                strokeWidth={2}
                              />
                            ) : (
                              <Line
                                animationDuration={500}
                                dot={false}
                                connectNulls={true}
                                type="monotone"
                                dataKey="value"
                                stroke={theme.palette.error[theme.palette.type]}
                                strokeWidth={2}
                              />
                            )}
                          </LineChart>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.pagination}
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={cryptoCurrencyData.cryptoData.length}
        rowsPerPage={paginationData.rowsPerPage}
        page={paginationData.page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      ></TablePagination>
    </div>
  );
};

export default CryptoCurrency;
