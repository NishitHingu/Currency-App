import { useEffect, useContext, useState } from "react";
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
    padding: "1rem 0.5rem 1rem 0",
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
    backgroundColor: "hsla(0,0%,100%,0.4)",
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
  // Edge cases yet if month is jan -m will not give desired results
  if (parseInt(mm) <= 0) {
    console.log(mm);
    yyyy = String(parseInt(yyyy) - 1);
    mm = String(12 + parseInt(mm));
    console.log(mm);
  }

  return yyyy + "-" + mm + "-" + dd;
};

const History = (props) => {
  const { keys: keysInitialise, isKeySet, FetchKeys } = useContext(
    CountryKeysContext
  );
  const { id } = useParams();
  console.log(id);
  const { GetHistoryData } = useContext(FetchContext);
  const [plotCountries, setPlotCountries] = useState([]);
  const [keys, setKeys] = useState(["EUR", "INR"]);
  const [dataTime, setDataTime] = useState("1M");
  const [startDate, setStartDate] = useState(getDate(0, 1));
  // eslint-disable-next-line no-unused-vars
  const [endDate, setEndDate] = useState(getDate(0, 0));
  const [base, setBase] = useState("EUR");
  const [firstRender, setFirstRender] = useState(true);
  const [plotData, setPlotData] = useState([]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [baseOpen, setBaseOpen] = useState(false);
  const [dialogBoxInput, setDialogBoxInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchingData, setFetchingData] = useState(true);
  const [failedToLoadData, setFailedToLoadData] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    props.setPath("History");
    if (isKeySet && keysInitialise.length !== keys.length) {
      setKeys(keysInitialise);
      setFirstRender(false);
      setPlotCountries([...plotCountries, id ? id : 'INR']);
    } else if (!isKeySet) {
      async function getKeys() {
        let result = await FetchKeys();
        setKeys(result);
      }
      getKeys();
      setFirstRender(false);
      setPlotCountries([...plotCountries, id ? id : 'INR']);
      console.log(plotCountries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compare = (a, b) => {
    return a["name"] > b["name"] ? 1 : -1;
  };

  useEffect(() => {
    if (!firstRender) {
      console.log(base, plotCountries.join(","), startDate, endDate);
      const fetchData = async () => {
        let result = await GetHistoryData(
          base,
          plotCountries.join(","),
          startDate,
          endDate
        );
        if (typeof result === "object") {
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
          console.log(newPlotData);
          setPlotData(newPlotData);
          setLoading(false);
          setFailedToLoadData(false);
          setFetchingData(false);
        } else {
          setTimeout(() => {
            setFailedToLoadData(true);
            setFetchingData(false);
          }, 1000);
        }
      };
      fetchData();
    }
    console.log(plotCountries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, plotCountries, startDate]);

  const handleChangeTime = (event, newValue) => {
    setDataTime(newValue);
    setFetchingData(true);
    let newDate;
    switch (newValue) {
      case "1M":
        newDate = getDate(0, 1);
        setStartDate(newDate);
        break;

      case "1Y":
        newDate = getDate(1, 0);
        setStartDate(newDate);
        break;

      case "5Y":
        newDate = getDate(5, 0);
        setStartDate(newDate);
        break;

      case "MAX":
        newDate = getDate(12, 0);
        setStartDate(newDate);
        break;

      default:
        console.log(newValue);
        break;
    }
  };

  // Dialog box click functions

  const handleClickCountryOpenDialogBox = () => {
    setCountryOpen(true);
  };
  const handleCloseCountryDialogBox = () => {
    setCountryOpen(false);
  };
  const handleCountryDialogBoxSubmit = () => {
    if (dialogBoxInput === base || plotCountries.includes(dialogBoxInput)) {
      alert("Country already ploted or it selected as the Base");
      setDialogBoxInput("");
    } else {
      setPlotCountries([...plotCountries, dialogBoxInput]);
      setCountryOpen(false);
      setDialogBoxInput("");
      setLoading(true);
    }
  };

  const handleDailogBoxInputChange = (e) => {
    setDialogBoxInput(e.target.value);
  };

  const handleClickBaseOpenDialogBox = () => {
    setBaseOpen(true);
  };
  const handleCloseBaseDialogBox = () => {
    setBaseOpen(false);
  };
  const handleBaseDialogBoxSubmit = (e) => {
    if (plotCountries.includes(dialogBoxInput)) {
      alert("Base and country cannot be same");
      setDialogBoxInput("");
    } else {
      setBase(dialogBoxInput);
      setBaseOpen(false);
      setFetchingData(true);
      setDialogBoxInput("");
    }
  };

  // Removing a country from the List
  const removeCountry = (country) => {
    let countries = [...plotCountries];
    countries = countries.filter((item) => item !== country);
    setPlotCountries(countries);
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
      <Grid item container spacing={0}>
        <Grid item xs={12} className={classes.options}>
          <Tabs
            className={classes.tabs}
            value={dataTime}
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
            open={countryOpen}
            onClose={handleClickCountryOpenDialogBox}
          >
            <div className={classes.dialogBox}>
              <DialogTitle>Choose Country</DialogTitle>
              <DialogContent>
                <CountryOption
                  value={dialogBoxInput}
                  onChange={handleDailogBoxInputChange}
                  countryNames={keys}
                  optionNo={1}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseCountryDialogBox}
                  variant="contained"
                  color={"primary"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCountryDialogBoxSubmit}
                  variant="contained"
                  color={"primary"}
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
            open={baseOpen}
            onClose={handleCloseBaseDialogBox}
          >
            <div className={classes.dialogBox}>
              <DialogTitle>Choose Base</DialogTitle>
              <DialogContent>
                <CountryOption
                  value={dialogBoxInput}
                  onChange={handleDailogBoxInputChange}
                  countryNames={keys}
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
              {`Data From: ${startDate} `}
            </span>
            <span style={{ marginLeft: "0.5rem" }}>{` To: ${endDate}`}</span>
          </Typography>
          <Typography variant="caption" align="center" component="div">
            <span style={{ marginRight: "0.5rem" }}>Base Country: {base}</span>
            <span style={{ marginLeft: "0.5rem" }}>
              PlotedCountries:
              <span style={{ marginLeft: "0.25rem" }}>
                {plotCountries.map((item, index) => (
                  <Link style={{color: theme.palette.success.info}} href={`#${item}`}>
                    {index !== plotCountries.length - 1 ? item + "," : item}
                  </Link>
                ))}
              </span>
            </span>
          </Typography>
        </Grid>
      </Grid>
      {failedToLoadData && (
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
      {!failedToLoadData ? (
        fetchingData ? (
          <Grid item xs={12} style={{ position: "relative", height: "50vh" }}>
            <Loader />
          </Grid>
        ) : (
          plotCountries.map((countryName, index) => (
            <Grid item id={countryName} container style={{ marginTop: 5 }}>
              <Grid item xs={false} sm={1}></Grid>
              <Grid className={classes.cover} item xs={12} sm={10}>
                <Paper
                  style={{ position: "relative" }}
                  className={classes.paper}
                  elevation={4}
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
                  {!loading || plotCountries.length - 1 !== index ? (
                    <ResponsiveContainer width={"100%"} height={"90%"}>
                      <AreaChart
                        data={plotData}
                        margin={{
                          top: 10,
                          right: 30,
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
                              offset="5%"
                              stopColor="#8884d8"
                              stopOpacity={0.9}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8884d8"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          stroke={theme.palette.text.secondary}
                        />
                        <YAxis
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
                          stroke={theme.palette.text.secondary}
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
