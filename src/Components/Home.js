import { useEffect, useContext, useState } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { FetchContext } from "../Context/FetchContext";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { CountryKeysContext } from "../Context/CountryKeysContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    height: "100%",
    minWidth: 500,
    color: theme.palette.text.secondary,
  },
  cover: {
    height: "70vh",
    overflow: "scroll",
  },
  root: {
    flexGrow: 1,
  },
  toolTip: {
    opacity: 1,
    padding: "2px 5px",
    color: "444",
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
  },
  countryBtn: {
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary[theme.palette.type],
    },
  },
}));

const Home = (props) => {
  const { countryTable, setData, GetDataWithBase } = useContext(FetchContext);
  const { keys, isKeySet, FetchKeys } = useContext(CountryKeysContext);
  const [base, setBase] = useState();
  const [plotData, setPlotData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    props.setPath("Home");

    // Decrease the scrollbar height soo the whit dot in dark mode is not visible
    const r = document.querySelector(":root");
    r.style.setProperty("--scrollHeight", "0");

    if (!isKeySet) {
      async function getKeys() {
        // eslint-disable-next-line no-unused-vars
        let result = await FetchKeys();
      }
      getKeys();
    }
    const fetchData = async () => {
      let result = await GetDataWithBase("INR");
      if (typeof result === "object") {
        let dataArray = Object.entries(result);
        let maxValue = dataArray[0][1];
        let minValue = dataArray[0][1];
        let minKey = dataArray[0][0];
        dataArray.forEach(([key, value]) => {
          if (value > maxValue) {
            maxValue = value;
          } else if (minValue > value) {
            minValue = value;
            minKey = key;
          }
        });
        result = await GetDataWithBase(minKey);
        dataArray = Object.entries(result);
        setBase(minKey);
        setPlotData(getPlotData(dataArray));
        setData(result);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function compare(a, b) {
    return (a["value"] - b["value"]) * -1;
  }

  function getPlotData(data) {
    let plot = [];
    data.forEach(([key, value], index) => {
      plot.push({ name: key, value: 1 / value, rank: 1 });
    });
    plot = plot.sort(compare);
    plot.forEach((data, index) => (data.rank = index + 1));
    return plot;
  }

  const CustomToolTip = ({ active, payload, label }) => {
    if (active) {
      let name = payload ? payload[0].payload.name : "";
      let value = payload ? payload[0].payload.value : "";
      let rank = payload ? payload[0].payload.rank : "";
      return (
        <div className={classes.toolTip}>
          <p>{`Rank: ${rank}`}</p>
          <p>{`Country: ${name}`}</p>
          <p>{`Value: ${value} `}</p>
        </div>
      );
    }
    return null;
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Forex</Typography>
          <Typography variant="body1" style={{ marginTop: "1rem" }}>
            The foreign exchange market is a global decentralized or
            over-the-counter market for the trading of currencies. This market
            determines foreign exchange rates for every currency. It includes
            all aspects of buying, selling and exchanging currencies at current
            or determined prices. In terms of trading volume, it is by far the
            largest market in the world, followed by the credit market. The main
            participants in this market are the larger international banks.
            Financial centers around the world function as anchors of trading
            between a wide range of multiple types of buyers and sellers around
            the clock, with the exception of weekends. Since currencies are
            always traded in pairs, the foreign exchange market does not set a
            currency's absolute value but rather determines its relative value
            by setting the market price of one currency if paid for with
            another. Ex: US$1 is worth X CAD, or CHF, or JPY, etc.
          </Typography>
        </Grid>
        <Grid item xs={1} sm={false}></Grid>
        <Grid item xs={12} sm={10} className={classes.cover}>
          <Paper className={classes.paper}>
            <Typography variant="h5" color="textPrimary" align="center">
              Rankings
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                data={plotData}
                margin={{ left: 5, right: 10, top: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="rank"
                  padding={{ left: 15, right: 15 }}
                  stroke={theme.palette.text.secondary}
                />
                <YAxis hide stroke={theme.palette.text.secondary} />
                <Tooltip content={<CustomToolTip />} />
                <Legend />
                <Bar
                  dataKey="value"
                  name={`Conversion rate with base country as ${countryTable[base]}`}
                  animationDuration={1000}
                  fill={theme.palette.graph.barGraph}
                  minPointSize={2}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={1} sm={false}></Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            style={{ marginBottom: "0", marginTop: "1rem" }}
          >
            Ranked Countries
          </Typography>
        </Grid>
        <Grid container spacing={1} style={{ margin: " 0 1rem" }}>
          {keys.map((element) => {
            return (
              <Grid
                key={element}
                item
                xs={6}
                sm={4}
                md={3}
                style={{ cursor: "default" }}
              >
                <Button
                  style={{ textTransform: "none" }}
                  component={Link}
                  to={`/history/${element}`}
                  className={classes.countryBtn}
                >
                  <Typography variant="body2" noWrap={true}>
                    {element + ": "}
                    {countryTable[element]}
                  </Typography>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
