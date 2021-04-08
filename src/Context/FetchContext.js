import { useState, createContext } from "react";
import axios from "axios";

export const FetchContext = createContext();

const FetchContextProvider = (props) => {
  const countryTable = {
    AUD: "Australia",
    BGN: "Bulgaria",
    BRL: "Brazil",
    CAD: "Canada",
    CHF: "Switzerland",
    CNY: "China",
    CZK: "Czech Republic",
    DKK: "Denmark",
    EUR: "Euro",
    GBP: "United Kingdom",
    HKD: "Hong Kong",
    HRK: "Croatia",
    HUF: "Hungaria",
    IDR: "Indonesia",
    ILS: "Israeli Shekel",
    INR: "India",
    ISK: "Iceland",
    JPY: "Japan",
    KRW: "South Korea",
    MXN: "Mexico",
    MYR: "Malaysia",
    NOK: "Norway",
    NZD: "New Zealand",
    PHP: "Philippines",
    PLN: "Poland",
    RON: "Romania",
    RUB: "Russia",
    SEK: "Sweden",
    SGD: "Singapore",
    THB: "Thailand",
    TRY: "Turkey",
    USD: "United States",
    ZAR: "South Africa",
  };

  const [data, setData] = useState();

  async function GetDataWithBase(base) {
    let result = await axios
      .get(`https://api.ratesapi.io/api/latest?base=${base ? base : "EUR"}`)
      .then((result) => {
        return result.data.rates;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
    return result;
  }
  async function GetHistoryData(base, symbol, start, end) {
    let result = await axios
      .get(
        `https://api.ratesapi.io/api/${end}?base=${
          base ? base : "EUR"
        }&symbols=${symbol}`
      )
      .then((result) => {
        console.log(result);
        return Promise.reject("failed to get resources");
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
    return result;
  }

  async function GetCryptoCurrencyData(base) {
    let result = await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${
          base ? base : "EUR"
        }&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=2C24h%2C7d`
      )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
    return result;
  }

  async function FetchCryptoData(id) {
    let result = await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${
          id ? id : "bitcoin"
        }?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
      )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
    return result;
  }

  async function CryptoCurrencyCountries() {
    let result = await axios
      .get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
    return result;
  }

  async function CryptoHistoryFetch(base, id) {
    let result = await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${
          id ? id : "bitcoin"
        }/market_chart?vs_currency=${
          base ? base : "eur"
        }&days=356&interval=daily`
      )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
    return result;
  }

  return (
    <FetchContext.Provider
      value={{
        data,
        countryTable,
        setData,
        GetDataWithBase,
        GetHistoryData,
        GetCryptoCurrencyData,
        FetchCryptoData,
        CryptoCurrencyCountries,
        CryptoHistoryFetch,
      }}
    >
      {props.children}
    </FetchContext.Provider>
  );
};

export default FetchContextProvider;
