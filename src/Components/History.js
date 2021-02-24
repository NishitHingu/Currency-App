import { useEffect, useContext, useReducer } from "react";
import { FetchContext } from "../Context/FetchContext";
import { CountryKeysContext } from "../Context/CountryKeysContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  Typography,
  IconButton,
  Link,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import CountryOption from "./CountryOption";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Loader from "./Loader";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  options: {
    marginBottom: 15,
  },
  cover: {
    height: "50vh",
    padding: 10,
    overflow: "scroll",
  },
  paper: {
    padding: "1rem 0",
    minWidth: 500,
    height: "100%",
  },
  tabs: {
    flexGrow: 1,
  },
  CountryOption: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: 15,
  },
  toolTip: {
    opacity: 1,
    padding: "2px 5px",
    color: "444",
    backgroundColor: theme.palette.background.default,
  },
  dialogBox: {
    margin: "2rem",
  },
}));

const getDate = (y, m) => {
  let date = new Date();
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1 - m).padStart(2, "0"); // January is 0!
  let yyyy = date.getFullYear() - y;
  // Edge cases so if month is jan -m will gives desired results
  if (parseInt(mm) <= 0) {
    yyyy = String(parseInt(yyyy) - 1);
    mm = String(12 + parseInt(mm));
  }

  return yyyy + "-" + mm + "-" + dd;
};

const History = (props) => {
  const { keys: keysInitialise, isKeySet, FetchKeys } = useContext(
    CountryKeysContext
  );
  const { id } = useParams();

  const timeAndPlotReducer = (state, action) => {
    switch (action.type) {
      case "INTIALSETPLOTCOUNTRIES":
        return {
          ...state,
          keys: action.payload.keys,
          plotCountries: action.payload.countries,
          firstRender: false,
        };
      case "SETPLOTDATA":
        return {
          ...state,
          plotData: action.payload.data,
          loading: false,
          failedToLoadData: false,
          fetchingData: false,
        };
      case "SETSTARTDATE":
        return {
          ...state,
          startDate: action.payload.newDate,
          dataTime: action.payload.newValue,
          fetchingData: true,
        };
      case "SETPLOTCOUNTRIES":
        return {
          ...state,
          plotCountries: action.payload.data,
          loading: true,
        };
      case "SETBASE":
        return {
          ...state,
          base: action.payload.base,
          fetchingData: true,
        };
      case "REMOVEDCOUNTRY":
        return {
          ...state,
          plotCountries: action.payload.countries,
        };
      case "SET2":
        return {
          ...state,
        };
      case "FAILEDTOLOAD":
        return {
          ...state,
          failedToLoadData: true,
          fetchingData: false,
        };
      default:
        return { ...state };
    }
  };

  const dialogBoxReducer = (state, action) => {
    switch (action.type) {
      case "COUNTRYOPEN":
        return {
          ...state,
          countryOpen: true,
        };
      case "BASEOPEN":
        return {
          ...state,
          baseOpen: true,
        };
      case "COUNTRYCLOSE":
        return {
          ...state,
          countryOpen: false,
          dialogBoxInput: "",
        };
      case "BASECLOSE":
        return {
          ...state,
          baseOpen: false,
          dialogBoxInput: "",
        };
      case "EMPTYBOX":
        return {
          ...state,
          dialogBoxInput: "",
        };
      case "SETDIALOGBOX":
        return {
          ...state,
          dialogBoxInput: action.payload,
        };
      default:
        break;
    }
  };

  const { GetHistoryData } = useContext(FetchContext);
  const [plotAndTime, dispatchPlotAndTime] = useReducer(timeAndPlotReducer, {
    plotCountries: [],
    plotData: [],
    base: "EUR",
    keys: ["EUR", "INR"],
    dataTime: "1M",
    startDate: getDate(0, 1),
    endDate: getDate(0, 0),
    firstRender: true,
    fetchingData: true,
    loading: true,
  });
  // eslint-disable-next-line no-unused-vars
  const [dialogBox, dispatchDialogBox] = useReducer(dialogBoxReducer, {
    countryOpen: false,
    baseOpen: false,
    dialogBoxInput: "",
  });
  const theme = useTheme();

  useEffect(() => {
    props.setPath("History");

    // Decrease the scrollbar height soo the whit dot in dark mode is not visible
    const r = document.querySelector(":root");
    r.style.setProperty("--scrollHeight", "0");

    if (isKeySet && keysInitialise.length !== plotAndTime.keys.length) {
      dispatchPlotAndTime({
        type: "INTIALSETPLOTCOUNTRIES",
        payload: {
          keys: keysInitialise,
          countries: [id ? id : "INR"],
        },
      });
    } else if (!isKeySet) {
      async function getKeys() {
        let failed = false;
        let result = await FetchKeys().catch((error) => {
          setTimeout(() => {
            dispatchPlotAndTime({
              type: "FAILEDTOLOAD",
            });
          }, 1000);
          failed = true;
        });
        if (!failed) {
          dispatchPlotAndTime({
            type: "INTIALSETPLOTCOUNTRIES",
            payload: {
              keys: result,
              countries: [id ? id : "INR"],
            },
          });
        }
      }
      getKeys();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compare = (a, b) => {
    return a["name"] > b["name"] ? 1 : -1;
  };

  useEffect(() => {
    if (!plotAndTime.firstRender) {
      const fetchData = async () => {
        let failed = false;
        let result = await GetHistoryData(
          plotAndTime.base,
          plotAndTime.plotCountries.join(","),
          plotAndTime.startDate,
          plotAndTime.endDate
        ).catch((error) => {
          setTimeout(() => {
            dispatchPlotAndTime({
              type: "FAILEDTOLOAD",
            });
          }, 1000);
          failed = true;
        });
        if (typeof result === "object" && !failed) {
          let newPlotData = [];
          result = Object.entries(result);
          result.forEach(([key, value]) => {
            newPlotData.push({ name: key, ...value });
          });
          while (newPlotData.length > 500) {
            newPlotData = newPlotData.filter((data, index) =>
              index % 2 ? data : null
            );
          }
          newPlotData.sort(compare); // Some data is jummbled that's why this sort
          dispatchPlotAndTime({
            type: "SETPLOTDATA",
            payload: {
              data: newPlotData,
            },
          });
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plotAndTime.base, plotAndTime.plotCountries, plotAndTime.startDate]);

  const handleChangeTime = (event, newValue) => {
    let newDate;
    switch (newValue) {
      case "1M":
        newDate = getDate(0, 1);
        break;

      case "1Y":
        newDate = getDate(1, 0);
        break;

      case "5Y":
        newDate = getDate(5, 0);
        break;

      case "MAX":
        newDate = getDate(12, 0);
        break;

      default:
        break;
    }
    dispatchPlotAndTime({
      type: "SETSTARTDATE",
      payload: {
        newDate,
        newValue,
      },
    });
  };

  // Dialog box click functions

  const handleClickCountryOpenDialogBox = () => {
    dispatchDialogBox({
      type: "COUNTRYOPEN",
    });
  };
  const handleCloseCountryDialogBox = () => {
    dispatchDialogBox({
      type: "COUNTRYCLOSE",
    });
  };
  const handleCountryDialogBoxSubmit = () => {
    if (
      dialogBox.dialogBoxInput === plotAndTime.base ||
      plotAndTime.plotCountries.includes(dialogBox.dialogBoxInput)
    ) {
      alert("Country already ploted or it is selected as the Base");
      dispatchDialogBox({
        type: "EMPTYBOX",
      });
    } else {
      dispatchPlotAndTime({
        type: "SETPLOTCOUNTRIES",
        payload: {
          data: [...plotAndTime.plotCountries, dialogBox.dialogBoxInput],
        },
      });
      dispatchDialogBox({
        type: "COUNTRYCLOSE",
      });
    }
  };

  const handleDailogBoxInputChange = (e) => {
    dispatchDialogBox({
      type: "SETDIALOGBOX",
      payload: e.target.value,
    });
  };

  const handleClickBaseOpenDialogBox = () => {
    dispatchDialogBox({
      type: "BASEOPEN",
    });
  };
  const handleCloseBaseDialogBox = () => {
    dispatchDialogBox({
      type: "BASECLOSE",
    });
  };
  const handleBaseDialogBoxSubmit = (e) => {
    if (plotAndTime.plotCountries.includes(dialogBox.dialogBoxInput)) {
      alert("Base and country cannot be same");
      dispatchDialogBox({
        type: "EMPTYBOX",
      });
    } else {
      dispatchPlotAndTime({
        type: "SETBASE",
        payload: {
          base: dialogBox.dialogBoxInput,
        },
      });
      dispatchDialogBox({
        type: "BASECLOSE",
      });
    }
  };

  // Removing a country from the List
  const removeCountry = (country) => {
    let countries = [...plotAndTime.plotCountries];
    countries = countries.filter((item) => item !== country);
    dispatchPlotAndTime({
      type: "REMOVEDCOUNTRY",
      payload: {
        countries,
      },
    });
  };

  // Custom tooltip for the Graph
  const CustomToolTip = ({ active, payload, label }) => {
    if (active) {
      let name = payload ? payload[0].payload.name : "";
      let value = payload ? payload[0].value : "";
      return (
        <div className={classes.toolTip}>
          <p>{`Date: ${name}`}</p>
          <p>{`Value: ${value} `}</p>
        </div>
      );
    }
    return null;
  };

  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={1}>
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            Compare Historical Data
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.options}>
          <Tabs
            className={classes.tabs}
            value={plotAndTime.dataTime}
            onChange={handleChangeTime}
            textColor="primary"
            indicatorColor="primary"
            centered
          >
            <Tab label="1M" value="1M" />
            <Tab label="1Y" value="1Y" />
            <Tab label="5Y" value="5Y" />
            <Tab label="Max" value="MAX" />
          </Tabs>
        </Grid>
        <Grid item xs={12} container style={{ flexGrow: 1 }} justify="center">
          <Button
            style={{ marginRight: "0.5rem" }}
            variant="contained"
            color="primary"
            elevation={2}
            onClick={handleClickCountryOpenDialogBox}
          >
            + Add Country
          </Button>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={dialogBox.countryOpen}
            onClose={handleClickCountryOpenDialogBox}
          >
            <div className={classes.dialogBox}>
              <DialogTitle>Choose Country</DialogTitle>
              <DialogContent>
                <CountryOption
                  value={dialogBox.dialogBoxInput}
                  onChange={handleDailogBoxInputChange}
                  countryNames={plotAndTime.keys}
                  optionNo={1}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseCountryDialogBox}
                  variant="contained"
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCountryDialogBoxSubmit}
                  variant="contained"
                  color="primary"
                >
                  Ok
                </Button>
              </DialogActions>
            </div>
          </Dialog>
          <Button
            style={{ marginLeft: "0.5rem" }}
            variant="contained"
            color="primary"
            elevation={2}
            onClick={handleClickBaseOpenDialogBox}
          >
            Change Base
          </Button>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={dialogBox.baseOpen}
            onClose={handleCloseBaseDialogBox}
          >
            <div className={classes.dialogBox}>
              <DialogTitle>Choose Base</DialogTitle>
              <DialogContent>
                <CountryOption
                  value={dialogBox.dialogBoxInput}
                  onChange={handleDailogBoxInputChange}
                  countryNames={plotAndTime.keys}
                  optionNo={1}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseBaseDialogBox}
                  variant="contained"
                  color={"primary"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBaseDialogBoxSubmit}
                  variant="contained"
                  color={"primary"}
                >
                  Ok
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </Grid>
        <Grid
          item
          xs={12}
          container
          style={{ flexGrow: 1, marginTop: "0.5rem" }}
          direction="column"
          justify="center"
        >
          <Typography variant="caption" align="center" component="div">
            <span style={{ marginRight: "0.5rem" }}>
              {`Data From: ${plotAndTime.startDate} `}
            </span>
            <span
              style={{ marginLeft: "0.5rem" }}
            >{` To: ${plotAndTime.endDate}`}</span>
          </Typography>
          <Typography variant="caption" align="center" component="div">
            <span style={{ marginRight: "0.5rem" }}>
              Base Country: {plotAndTime.base}
            </span>
            <span style={{ marginLeft: "0.5rem" }}>
              PlotedCountries:
              <span style={{ marginLeft: "0.25rem" }}>
                {plotAndTime.plotCountries.map((item, index) => (
                  <Link
                    key={item}
                    style={{ color: theme.palette.success.info }}
                    href={`#${item}`}
                  >
                    {index !== plotAndTime.plotCountries.length - 1
                      ? item + ","
                      : item}
                  </Link>
                ))}
              </span>
            </span>
          </Typography>
        </Grid>
      </Grid>
      {plotAndTime.failedToLoadData && (
        <Grid
          item
          xs={12}
          justify="center"
          alignItems="center"
          style={{ marginTop: "3rem" }}
        >
          <Typography component="div" variant="h4" align="center">
            No data found
          </Typography>
        </Grid>
      )}
      {!plotAndTime.failedToLoadData ? (
        plotAndTime.fetchingData ? (
          <Grid item xs={12} style={{ position: "relative", height: "50vh" }}>
            <Loader />
          </Grid>
        ) : (
          plotAndTime.plotCountries.map((countryName, index) => (
            <Grid item id={countryName} container style={{ marginTop: 5 }}>
              <Grid item xs={false} sm={1}></Grid>
              <Grid className={classes.cover} item xs={12} sm={10}>
                <Paper
                  style={{ position: "relative" }}
                  className={classes.paper}
                  elevation={3}
                >
                  <Grid container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                      <Typography variant="h4" align="center">
                        {countryName}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        aria-label="delete"
                        onClick={() => removeCountry(countryName)}
                      >
                        <HighlightOffOutlinedIcon color="secondary" />
                      </IconButton>
                    </Grid>
                  </Grid>
                  {!plotAndTime.loading ||
                  plotAndTime.plotCountries.length - 1 !== index ? (
                    <ResponsiveContainer width={"100%"} height={"90%"}>
                      <AreaChart
                        data={plotAndTime.plotData}
                        margin={{
                          top: 10,
                          right: 0,
                          left: 0,
                          bottom: 10,
                        }}
                        syncId="Chart"
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="2%"
                              stopColor={theme.palette.graph.primary}
                              stopOpacity={0.9}
                            />
                            <stop
                              offset="97%"
                              stopColor={theme.palette.graph.secondary}
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        {/* <CartesianGrid strokeDasharray="2 2" /> */}
                        <XAxis
                          dataKey="name"
                          stroke={theme.palette.text.secondary}
                        />
                        <YAxis
                          hide
                          stroke={theme.palette.text.secondary}
                          type="number"
                          domain={[
                            (dataMin) => {
                              if (dataMin > 1) {
                                return Math.floor(dataMin);
                              } else {
                                return (dataMin - (2 * dataMin) / 10).toFixed(
                                  3
                                );
                              }
                            },
                            (dataMax) => {
                              if (dataMax > 1) {
                                return Math.ceil(dataMax);
                              } else {
                                return (dataMax + (3 * dataMax) / 10).toFixed(
                                  3
                                );
                              }
                            },
                          ]}
                        />
                        <Tooltip content={<CustomToolTip />} />
                        <Area
                          type="monotone"
                          dataKey={countryName}
                          stroke={theme.palette.text.primary}
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorUv)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        width: "95%",
                        height: "70%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Loader />
                    </div>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={false} sm={1}></Grid>
            </Grid>
          ))
        )
      ) : null}
    </Grid>
  );
};

export default History;
