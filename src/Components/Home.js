import { useEffect, useContext, useState } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import { CountryKeysContext } from "../Context/CountryKeysContext";
import { Link } from 'react-router-dom'

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
}));

const Home = (props) => {
  const { countryTable, setData, GetDataWithBase } = useContext(FetchContext);
  const { keys, isKeySet, FetchKeys } = useContext(CountryKeysContext);
  const [base , setBase] = useState();
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
    plot.forEach((data, index) => data.rank = index + 1);
    return plot;
  }

  const CustomToolTip = ({ active, payload, label }) => {
    if (active) {
      let name = payload ? payload[0].payload.name : "";
      let value = payload ? payload[0].payload.value : "";
      let rank =  payload ? payload[0].payload.rank : "";
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
          <Typography variant="h3" align='center'>Currency Ranking</Typography>
          <Typography variant="body1" style={{marginTop: '1rem',}}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi itaque dignissimos molestias doloribus veritatis repellat omnis illo aspernatur beatae ipsam distinctio, molestiae deleniti aperiam quo similique illum doloremque voluptates quaerat.
    Quas exercitationem itaque iusto minus. Autem ea suscipit beatae, magnam accusantium in necessitatibus odit. Illum explicabo amet tenetur consectetur unde, quam ex reprehenderit suscipit earum corporis asperiores numquam, consequatur magnam!
          </Typography>
        </Grid>
        <Grid item xs={1} sm={false}></Grid>
        <Grid item xs={12} sm={10} className={classes.cover}>
          <Paper className={classes.paper}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={plotData} margin={{left: 5, right: 10, top: 10}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey='rank'
                  padding={{ left: 15, right: 15 }}
                  stroke={theme.palette.text.secondary}
                />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip content={<CustomToolTip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={theme.palette.success[theme.palette.type]}
                  strokeWidth={3}
                  name={`Conversion rate with base country as ${countryTable[base]}`}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>        
        <Grid item xs={1} sm={false}></Grid>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ marginBottom: '-1rem', marginTop: '0.5rem'}}>
            Ploted Countries
          </Typography>
        </Grid>
        <Grid container spacing={1} style={{ margin: ' 0 1rem',}}>
          {keys.map((element) => {
            return (
              <Grid key={element} item xs={6} sm={4} md={3} style={{ cursor: 'default'}} >
                <Button
                  style={{textTransform: 'none'}}
                  component={Link}
                  to={`/history/${element}`}
                >
                <Typography variant='body2' noWrap={true}>
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
