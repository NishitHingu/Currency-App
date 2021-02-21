import {
  Grid,
  makeStyles,
  Typography,
  Paper,
  Link,
  Button,
  useTheme,
  ButtonGroup,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { FetchContext } from "../Context/FetchContext";
import CountryOption from "./CountryOption";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  block: {
    display: "block",
  },
  info: {
    marginTop: "-0.75rem",
  },
  loader: {
    height: "100%",
    widht: "100%",
  },
  increase: {
    color: theme.palette.success.main,
  },
  description: {
    maxHeight: 120,
    overflow: "hidden",
  },
  readMore: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  graphWrapper: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    height: "100%",
    minWidth: 500,
    color: theme.palette.text.secondary,
  },
  cover: {
    height: "60vh",
    margin: `0.5rem 0 2rem 0`,
    overflow: "scroll",
  },
  toolTip: {
    opacity: 1,
    padding: "2px 5px",
    color: "444",
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
  },
  countryOption: {
    display: "flex", 
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: 'center',
    },

  },
}));

const CryptoCurrencyWithID = (props) => {
  const { id } = useParams();
  const {
    FetchCryptoData,
    CryptoCurrencyCountries,
    CryptoHistoryFetch,
  } = useContext(FetchContext);
  const [data, setData] = useState({});
  const [base, setBase] = useState("EUR");
  const [loading, setLoading] = useState(true);
  const [descriptionCut, setDescriptionCut] = useState(true);
  const [supportedCountries, setSupportedCountries] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState("prices");
  const [plotData, setPlotData] = useState([]);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const theme = useTheme();

  function createData(
    id,
    name,
    symbol,
    imgSrc,
    description,
    rank,
    score,
    communityDataScore,
    reddit_subscribers,
    twitter_followers,
    market_rank,
    market_cap,
    market_high24,
    market_low24,
    market_change24,
    current_price,
    price_change24h,
    price_change30d,
    price_change1Y,
    volume,
    supply,
    homePageLink
  ) {
    let coinGecko = {
      rank,
      score,
    };
    let community = {
      score: communityDataScore,
      reddit: reddit_subscribers,
      twitter: twitter_followers,
    };
    let market = {
      rank: market_rank,
      market_cap,
      high24: market_high24,
      low24: market_low24,
      change24: market_change24,
    };
    let price = {
      current: current_price,
      change24h: price_change24h,
      change30d: price_change30d,
      change1Y: price_change1Y,
    };
    return {
      id,
      name,
      symbol,
      imgSrc,
      description,
      coinGecko,
      community,
      market,
      price,
      volume,
      supply,
      homePageLink,
    };
  }

  const getDate = (date) => {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    let yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  function createPlotData(date, value) {
    date = new Date(date);
    date = getDate(date);
    return { date, value };
  }

  function convertToLocaleString(item) {
    return typeof item === "number" ? item.toLocaleString() : item;
  }

  useEffect(() => {
    const GetCountries = async () => {
      let failed = false;
      let result = await CryptoCurrencyCountries().catch(error => {
        failed = true;
        setFailedToLoad(true);
      });
      if (!failed) {
        result = result.map((value) => value.toUpperCase());
        setSupportedCountries(result);
      };      
    };
    GetCountries();

    return function cleanUpScroll() {
      const r = document.querySelector(":root");
      r.style.setProperty("--scrollHeight", "0");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.setPath("CryptoCurrency");
    async function fetchData() {
      let failed = false;
      let result = await FetchCryptoData(id ? id : "").catch(error => {
        failed = true;
        setFailedToLoad(true);
      });
      if (!failed) {
        let newData = createData(
          result.id,
          result.name,
          result.symbol,
          result.image.small,
          result.description.en,
          result.coingecko_rank,
          result.coingecko_score,
          result.community_score,
          result.community_data.reddit_subscribers,
          result.community_data.twitter_followers,
          result.market_cap_rank,
          result.market_data.market_cap[base.toLocaleLowerCase()],
          result.market_data.high_24h[base.toLocaleLowerCase()],
          result.market_data.low_24h[base.toLocaleLowerCase()],
          result.market_data.market_cap_change_percentage_24h,
          result.market_data.current_price[base.toLocaleLowerCase()],
          result.market_data.price_change_percentage_24h,
          result.market_data.price_change_percentage_30d,
          result.market_data.price_change_percentage_1y,
          result.market_data.total_volume[base.toLocaleLowerCase()],
          result.market_data.total_supply,
          result.links.homepage[0]
        );
        setData(newData);
        setLoading(false);
      };      
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, base]);

  useEffect(() => {
    async function historyFetch() {
      let failed = false;
      let result = await CryptoHistoryFetch(base, id).catch(error => {
        failed = true;
        setFailedToLoad(true);
      });
      if (!failed) {
        result = result[selectedPlot];
        let newPlotData = result.map((result) =>
          createPlotData(result[0], result[1])
        );
        setPlotData(newPlotData);
      };
    };
    historyFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, base, selectedPlot]);

  const handleDescription = () => {
    setDescriptionCut(!descriptionCut);
  };
  const handleChangeBase = (e) => {
    setBase(e.target.value);
  };
  const handleSetSelectedPlot = (option) => {
    setSelectedPlot(option);
  };

  // Recharts ToolTip

  const CustomToolTip = ({ active, payload, label }) => {
    if (active) {
      let date = payload ? payload[0].payload.date : "";
      let value = payload ? payload[0].payload.value : "";
      return (
        <div className={classes.toolTip}>
          <p>{`Date: ${date}`}</p>
          <p>{`Value: ${value} `}</p>
        </div>
      );
    }
    return null;
  };

  const classes = useStyles();

  return (
    <div className={classes.loader}>
      {failedToLoad ? (
        <Typography variant='h3' align='center' style={{paddingTop: '20vh'}}>Failed To Load Resources</Typography>
      ) : ( !loading ? (
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              direction: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h4"
              style={{ display: "flex", alignItems: "center" }}
              component="span"
            >
              <img src={data.imgSrc} alt="icon" style={{ padding: "1rem" }} />
              <span>
                {data.name}({data.symbol.toUpperCase()})
              </span>
            </Typography>
            <Typography
              variant="h6"
              component="span"
              style={{ paddingLeft: "1rem" }}
            >
              {convertToLocaleString(data.price.current)}{" "}
              {base.toLocaleUpperCase()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} direction="row">
              <Grid
                item
                xs={12}
                sm={6}
                style={{ padding: "1rem", flexGrow: 1 }}
              >
                <Paper>
                  <Grid container style={{ padding: "1rem" }} spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6">CoinGecko</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.info}>
                      Rank: {data.coinGecko.rank}
                    </Grid>
                    <Grid item xs={6} className={classes.info}>
                      Score: {data.coinGecko.score}
                    </Grid>
                    <Grid item xs={12} className={classes.subtitle}>
                      <Typography variant="h6">Community</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.info}>
                      Score: {data.community.score}
                    </Grid>
                    <Grid item xs={6} className={classes.info}>
                      <Link color="textSecondary" href={`${data.homePageLink}`}>
                        {data.name} HomePage
                      </Link>
                    </Grid>
                    <Grid item xs={6} className={classes.info}>
                      Twitter Followers:{" "}
                      {convertToLocaleString(data.community.twitter)}
                    </Grid>
                    <Grid item xs={6} className={classes.info}>
                      Reddit Followers:{" "}
                      {convertToLocaleString(data.community.reddit)}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ padding: "1rem", flexGrow: 1 }}
              >
                <Paper>
                  <Grid container style={{ padding: "1rem" }} spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Market</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.info}>
                      Rank: {data.market.rank}
                    </Grid>
                    <Grid item xs={6} className={classes.info}>
                      24h:{" "}
                      {data.market.change24 > 0 ? (
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.increase}
                        >
                          {typeof data.market.change24 === "number"
                            ? data.market.change24.toFixed(3)
                            : data.market.change24}
                          %
                        </Typography>
                      ) : (
                        <Typography
                          component="span"
                          variant="body2"
                          color="error"
                        >
                          {typeof data.market.change24 === "number"
                            ? data.market.change24.toFixed(3)
                            : data.market.change24}
                          %
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} className={classes.info}>
                      Cap: {convertToLocaleString(data.market.market_cap)}
                    </Grid>
                    <Grid item xs={12} className={classes.info}>
                      24h High / 24h Low:
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ paddingLeft: "0.5rem" }}
                        className={classes.increase}
                      >
                        {data.market.high24}
                      </Typography>{" "}
                      /
                      <Typography
                        component="span"
                        variant="body2"
                        color="error"
                      >
                        {data.market.low24}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.info}>
                      Max Supply: {convertToLocaleString(data.supply)}
                    </Grid>
                    <Grid item xs={12} className={classes.info}>
                      Volume: {convertToLocaleString(data.volume)}
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ padding: "1rem" }}>
            <Paper style={{ padding: "1rem", position: "relative" }}>
              <Grid container>
                <Grid item xs={12} style={{ position: "relative" }}>
                  <Typography variant="h6">Description</Typography>
                  <Typography
                    component="div"
                    variant="body2"
                    className={descriptionCut ? classes.description : null}
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></span>
                    <Typography align="center" className={classes.readMore}>
                      <Button
                        style={{ width: "100%" }}
                        onClick={handleDescription}
                      >
                        Read {descriptionCut ? "More" : "Less"}
                      </Button>
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper style={{ padding: "1rem", marginTop: "1rem" }}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6">Price Change</Typography>
                  <Typography variant="body1" component="div">
                    <Grid container spacing={3}>
                      <Grid item xs={6} sm={4}>
                        24 Hours:{" "}
                        {data.price.change24h > 0 ? (
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.increase}
                          >
                            {typeof data.price.change24h === "number"
                              ? data.price.change24h.toFixed(4)
                              : data.price.change24h}
                            %
                          </Typography>
                        ) : (
                          <Typography
                            component="span"
                            variant="body2"
                            color="error"
                          >
                            {typeof data.price.change24h === "number"
                              ? data.price.change24h.toFixed(4)
                              : data.price.change24h}
                            %
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        30 Days:{" "}
                        {data.price.change30d > 0 ? (
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.increase}
                          >
                            {typeof data.price.change30d === "number"
                              ? data.price.change30d.toFixed(4)
                              : data.price.change30d}
                            %
                          </Typography>
                        ) : (
                          <Typography
                            component="span"
                            variant="body2"
                            color="error"
                          >
                            {typeof data.price.change30d === "number"
                              ? data.price.change30d.toFixed(4)
                              : data.price.change30d}
                            %
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        One Year:{" "}
                        {data.price.change1Y > 0 ? (
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.increase}
                          >
                            {typeof data.price.change1Y === "number"
                              ? data.price.change1Y.toFixed(4)
                              : data.price.change1Y}
                            %
                          </Typography>
                        ) : (
                          <Typography
                            component="span"
                            variant="body2"
                            color="error"
                          >
                            {typeof data.price.change1Y === "number"
                              ? data.price.change1Y.toFixed(4)
                              : data.price.change1Y}
                            %
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container alignItems="flex-end">
                  <Grid item xs={1}></Grid>
                  <Grid
                    item
                    xs={11}
                    sm={9}
                    style={{ padding: "1rem 0 0.25rem 0rem" }}
                  >
                    <ButtonGroup color="primary" disableElevation>
                      <Button
                        onClick={() => handleSetSelectedPlot("prices")}
                        variant={
                          selectedPlot === "prices" ? "contained" : "outlined"
                        }
                      >
                        Prices
                      </Button>
                      <Button
                        onClick={() => handleSetSelectedPlot("market_caps")}
                        value="Prices"
                        variant={
                          selectedPlot === "market_caps"
                            ? "contained"
                            : "outlined"
                        }
                      >
                        Market
                      </Button>
                      <Button
                        onClick={() => handleSetSelectedPlot("total_volumes")}
                        value="Prices"
                        variant={
                          selectedPlot === "total_volumes"
                            ? "contained"
                            : "outlined"
                        }
                      >
                        Volume
                      </Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    className={classes.countryOption}
                  >
                    <CountryOption
                      value={base}
                      countryNames={supportedCountries}
                      onChange={handleChangeBase}
                      optionNo={1}
                    ></CountryOption>
                  </Grid>
                  <Grid item xs={false} sm={1}></Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} sm={false}></Grid>
              <Grid item xs={12} sm={10} className={classes.cover}>
                <Paper className={classes.graphWrapper} elevation={3}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={plotData}
                      margin={{ left: 5, right: 10, top: 10 }}
                      padding={{ left: 10 }}
                    >
                      <CartesianGrid strokeDasharray="2 2" />
                      <XAxis hide padding={{ left: 0, right: 15 }} />
                      <YAxis hide padding={{ bottom: 0, top: 20 }} />
                      <Tooltip content={<CustomToolTip />} />
                      <Line
                        type="monotone"
                        dot={false}
                        dataKey="value"
                        stroke={theme.palette.info[theme.palette.type]}
                        strokeWidth={2}
                        animationDuration={1000}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={1} sm={false}></Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.loader}>
          <Loader />
        </div>
      ))}
    </div>
  );
};

export default CryptoCurrencyWithID;
