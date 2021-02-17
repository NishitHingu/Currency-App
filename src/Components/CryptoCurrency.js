import {
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  TableRow,
  TableCell,
  Typography,
  useTheme
} from "@material-ui/core";
import React, { useContext, useEffect, useReducer } from "react";
import { Line, LineChart, YAxis } from "recharts";
import { FetchContext } from "../Context/FetchContext";
import EnhancedTableHead from "./EnhancedTableHead";
import Loader from './Loader';

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
  },
  logo: {
    height: "1.5rem",
    margin: "0 0.5rem 0 0",
  },
  incresePercentage: {
    color: "green",
  },
}));

// Formating data function
function createData(
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
    allowSort: true,
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
        };
      case "UPDATESORTINFO":
        return {
          ...state,
          order: action.payload.order,
          orderBy: action.payload.orderBy,
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
    }
  );
  const { GetCryptoCurrencyData } = useContext(FetchContext);

  const classes = useStyles();
  const theme = useTheme();
  console.log(theme);

  useEffect(() => {
    props.setPath("CryptoCurrency");
    async function fetchData() {
      let result = await GetCryptoCurrencyData();
      console.log(result);
      let displayData = result.map((result) =>
        createData(
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
      console.log(displayData);
      dispatchCryptoCurrencyData({
        type: "SETDATA",
        payload: {
          data: displayData,
        },
      });
    }
    fetchData();
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
    console.log(newPage);
    dispatchPaginationData({
      type: "SETPAGE",
      payload: {
        page: parseInt(newPage),
      },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    dispatchPaginationData({
      type: "SETROWSPERPAGE",
      payload: {
        pages: event.target.value,
      },
    });
  };

  console.log(cryptoCurrencyData, paginationData);

  return (
    <div className={classes.root}>
    <Paper className={classes.paper}>
      <TableContainer style={{ height: "90%" }}>
        <Table stickyHeader className={classes.table}>
          <EnhancedTableHead
            classes={classes}
            order={cryptoCurrencyData.order}
            orderBy={cryptoCurrencyData.orderBy}
            onRequestSort={handleRequestSort}
            headCell={headCells}
          ></EnhancedTableHead>
          {cryptoCurrencyData.loading ? (
            <Loader/>
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
                      <div className={classes.logoWrapper}>
                        <img
                          src={row.imgSrc}
                          className={classes.logo}
                          alt="logo"
                        ></img>
                        <span>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align="right">{"₹" + row.price.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      {row.marketChange24h > 0 ? (
                        <Typography className={classes.incresePercentage}>
                          {row.marketChange24h.toFixed(3)}%
                        </Typography>
                      ) : (
                        <Typography color="error">
                          {row.marketChange24h.toFixed(3)}%
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">{"₹" + row.totalVolume.toLocaleString()}</TableCell>
                    <TableCell align="right">{"₹" + row.marketCap.toLocaleString()}</TableCell>
                    <TableCell
                      padding="none"
                      size="small"
                      style={{
                        height: "60px",
                      }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <LineChart width={100} height={57} data={row.plotData}>
                          <YAxis hide={true} domain={["dataMin", "dataMax"]} />
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
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        )}
         </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={cryptoCurrencyData.cryptoData.length}
        rowsPerPage={paginationData.rowsPerPage}
        page={paginationData.page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      >
      </TablePagination>
    </Paper>
    </div>
  );
};

export default CryptoCurrency;
