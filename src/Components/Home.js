import { useEffect, useContext, useState } from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FetchContext } from "../Context/FetchContext";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    paddingRight: theme.spacing(5),
    height: '70vh',
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
  },
  toolTip: {
    opacity: 1,
    padding: "2px 5px",
    color: "#444",
    backgroundColor: "hsla(0,0%,100%,0.4)",
  },
}));

const Home = (props) => {
  const { data, setData, GetDataWithBase } = useContext(FetchContext);
  const [plotData, setPlotData] = useState([]);
  // let windWidth = window.innerWidth;
  // let windHeight = (window.innerHeight - 120); // removing the height taken by navbar, padding etc

  useEffect(() => {
    props.setPath("Home");
    const fetchData = async () => {
      let result = await GetDataWithBase("INR");
      if (typeof result === "object") {
        let dataArray = Object.entries(result);
        let maxValue = dataArray[0][1];
        let minValue = dataArray[0][1];
        let minKey = dataArray[0][0];
        let maxKey = dataArray[0][0];
        dataArray.forEach(([key, value]) => {
          if (value > maxValue) {
            maxValue = value;
            maxKey = key;
          } else if (minValue > value) {
            minValue = value;
            minKey = key;
          }
        });
        // console.log(maxValue, minValue);
        // console.log(maxKey + " , " + minKey);
        result = await GetDataWithBase(minKey);
        dataArray = Object.entries(result);
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
    data.forEach(([key, value]) => {
      plot.push({ name: key, value: 1 / value });
    });
    plot = plot.sort(compare).slice(0);
    // console.log(plot);
    return plot;
  }

  const CustomToolTip = ({ active, payload, label }) => {
    if (active) {
      let name = payload ? payload[0].payload.name : "";
      let value = payload ? payload[0].payload.value : "";
      return (
        <div className={classes.toolTip}>
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
        <Grid item xs={1} sm={false}></Grid>
        <Grid item xs={12} sm={10}>
          <Paper className={classes.paper}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={plotData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey=""
                  padding={{ left: 15, right: 15 }}
                />
                <YAxis />
                <Tooltip content={<CustomToolTip />} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={1} sm={false}></Grid>
      </Grid>
    </div>
  );
};

export default Home;
