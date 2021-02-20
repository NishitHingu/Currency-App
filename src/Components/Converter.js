import { TextField, Grid, Paper } from "@material-ui/core";
import { useEffect, useContext, useReducer } from "react";
import { FetchContext } from "../Context/FetchContext";
import { CountryKeysContext } from "../Context/CountryKeysContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CountryOption from "./CountryOption";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  options: {
    marginBottom: 15,
  },
  cover: {
    height: "60vh",
    padding: 10,
    overflow: "scroll",
  },
  paper: {
    padding: "1rem 2rem 1rem 0",
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
    backgroundColor: theme.palette.background.paper,
  },
  seperator: {
    fontSize: 24, 
    paddingLeft: 10,
  },
  inputFeildArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: 15,
  }

}));

const Converter = (props) => {
  // Reducer function
  const converterDataReducer = (state, action) => {
    switch (action.type) {
      case "SET_COUNTRIES":
        return {
          ...state,
          countries: action.payload.countries,
        };
      case "UPDATE_FIRSTCOUNTRY":
        return {
          ...state,
          changedFirstCountry: true,
          firstCountry: action.payload.key,
        };
      case "UPDATE_SECONDCOUNTRY":
        return {
          ...state,
          changedFirstCountry: false,
          secondCountry: action.payload.key,
        };
      case "UPDATE_FIRSTVALUE":
        return {
          ...state,
          firstValue: action.payload,
        };
      case "UPDATE_SECONDVALUE":
        return {
          ...state,
          secondValue: action.payload,
        };
      case "UPDATEVALUES":
        return {
          ...state,
          firstValue: action.payload.firstVal,
          secondValue: action.payload.secondVal,
        };
      case "UPDATE_CONVERSIONRATE":
        return {
          ...state,
          conversionRate: action.payload,
        };
      case "SETPLOTDATA&CONVERTIONRATE":
        return {
          ...state,
          plotData: action.payload.plotData,
          conversionRate: action.payload.rate,
        };
      default:
        throw new Error();
    }
  };

  const getDate = (y) => {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    let yyyy = date.getFullYear() - y;
    return yyyy + "-" + mm + "-" + dd;
  };

  const { setData, GetHistoryData } = useContext(FetchContext);
  const { keys, isKeySet, FetchKeys } = useContext(CountryKeysContext); 
  const theme = useTheme();
  const [converterData, dispatchConverterData] = useReducer(
    converterDataReducer,
    {
      countries: ["EUR", "INR"],
      firstCountry: "EUR",
      firstValue: 1,
      secondCountry: "INR",
      secondValue: 1,
      conversionRate: 1,
      endDate: getDate(0),
      plotData: [],
      changedFirstCountry: true,  
    }
  );

  useEffect(() => {
    props.setPath("Converter");
    if (isKeySet && keys.length !== converterData.countries.length) {
      dispatchConverterData({
        type: "SET_COUNTRIES",
        payload: {
          countries: keys,
        }
      });
    } else if (!isKeySet) {
      async function getKeys() {
        let result = await FetchKeys();
        dispatchConverterData({
          type: "SET_COUNTRIES",
          payload: {
            countries: result,
          }
        });
      }
      getKeys();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compare = (a, b) => {
    return a["name"] > b["name"] ? 1 : -1;
  };

  useEffect(() => {
    const startDate = getDate(1);
    const fetchData = async () => {
      let result = await GetHistoryData(
        converterData.firstCountry,
        converterData.secondCountry,
        startDate,
        converterData.endDate
      );
      if (typeof result === "object") {
        let newPlotData = [];
        result = Object.entries(result);
        setData(result);
        result.forEach(([key, value]) => {
          newPlotData.push({
            name: key,
            value: value[converterData.secondCountry],
          });
        });
        newPlotData.sort(compare); // Some data is jummbled that's why this sort
        let convRate = newPlotData[newPlotData.length - 1].value;
        dispatchConverterData({
          type: "SETPLOTDATA&CONVERTIONRATE",
          payload: {
            plotData: newPlotData,
            rate: convRate,
          },
        });
        if (converterData.changedFirstCountry) {
          let newValue = converterData.firstValue * convRate;
          dispatchConverterData({
            type: "UPDATEVALUES",
            payload: {
              firstVal: converterData.firstValue,
              secondVal: newValue,
            },
          });
        } else {
          let newValue = converterData.secondValue / convRate;
          dispatchConverterData({
            type: "UPDATEVALUES",
            payload: {
              firstVal: newValue,
              secondVal: converterData.secondValue,
            },
          });
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [converterData.secondCountry, converterData.firstCountry]);

  const handleChangeOption1 = (e) => {
    let key = e.target.value;
    if (key === converterData.secondCountry) {
      alert("Base and country cannot be same");
    } else {
      dispatchConverterData({
        type: "UPDATE_FIRSTCOUNTRY",
        payload: {
          key,
        },
      });
    }
  };
  const handleChangeOption2 = (e) => {
    let key = e.target.value;
    if (key === converterData.firstCountry) {
      alert("Base and country cannot be same");
    } else {
      dispatchConverterData({
        type: "UPDATE_SECONDCOUNTRY",
        payload: {
          key,
        },
      });
    }
  };
  const changeInput1 = (e) => {
    let value = e.target.value;
    if (value < 0) {
      alert("Negative value not allowed");
      return;
    } 
    let newValue = converterData.conversionRate * value;
    dispatchConverterData({
      type: "UPDATEVALUES",
      payload: {
        firstVal: value,
        secondVal: newValue,
      },
    });
  };
  const changeInput2 = (e) => {
    let value = e.target.value;
    if (value < 0) {
      alert("Negative value not allowed");
      return;
    } 
    let newValue = value / converterData.conversionRate;
    dispatchConverterData({
      type: "UPDATEVALUES",
      payload: {
        firstVal: newValue,
        secondVal: value,
      },
    });
  };

  const CustomToolTip = ({ active, payload, label }) => {
    if (active) {
      let name = payload ? payload[0].payload.name : "";
      let value = payload ? payload[0].payload.value : "";
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
      <div className={classes.inputFeildArea}>        
        <CountryOption
          value={converterData.firstCountry}
          onChange={handleChangeOption1}
          countryNames={converterData.countries}
          optionNo={1}
          label={"Base"}
        />
        <span className={classes.seperator}> : </span>
        <CountryOption
          value={converterData.secondCountry}
          onChange={handleChangeOption2}
          countryNames={converterData.countries}
          optionNo={2}
          label={"Country"}
        />
      </div>
      <div className={classes.inputFeildArea}>
        <TextField
          style={{marginLeft: 10}} // To aline it with the country options
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={converterData.firstValue}
          onChange={changeInput1}
        />
        <span className={classes.seperator}> : </span>
        <TextField
          style={{marginLeft: 10}} // To aline it with the country options
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={converterData.secondValue}
          onChange={changeInput2}
        />
      </div>
      <Grid item container style={{marginTop: 5}}>
        <Grid item xs={false} sm={1}></Grid>
        <Grid className={classes.cover} item xs={12} sm={10}>
          <Paper className={classes.paper} elevation={4}>
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <AreaChart data={converterData.plotData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                <YAxis
                  stroke={theme.palette.text.secondary}
                  type="number"
                  domain={[
                    (dataMin) => {
                      if (dataMin > 1) {
                        return Math.floor(dataMin);
                      } else {
                        return (dataMin - (2 * dataMin / 10)).toFixed(3);
                      }
                    },
                    (dataMax) => {
                      if (dataMax > 1) {
                        return Math.ceil(dataMax);
                      } else {
                        return (dataMax + (3 * dataMax / 10)).toFixed(3);
                      }
                    }
                  ]}
                />
                <Tooltip content={<CustomToolTip />} />
                <Legend iconSize={0} />
                <Area
                  type="monotone"
                  dataKey="value"
                  name={`Data From: ${getDate(1)} To: ${converterData.endDate}`}
                  stroke={theme.palette.text.primary}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={false} sm={1}></Grid>
      </Grid>
    </Grid>
  );
};

export default Converter;
