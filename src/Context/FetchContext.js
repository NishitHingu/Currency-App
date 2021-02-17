import { useState, createContext } from "react";
import axios from "axios";

export const FetchContext = createContext();

const FetchContextProvider = (props) => {
  const [data, setData] = useState();
  async function GetDataWithBase(base) {
    let result = await axios
      .get(`https://api.exchangeratesapi.io/latest?base=${base ? base : "EUR"}`)
      .then((result) => {
        return result.data.rates;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  }
  async function GetHistoryData(base, symbol, start, end) {
    let result = await axios
      .get(
        `https://api.exchangeratesapi.io/history?start_at=${start}&end_at=${end}&symbols=${symbol}&base=${
          base ? base : "EUR"
        }`
      )
      .then((result) => {
        // setData(result.data.rates);
        return result.data.rates;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  }

  async function GetCryptoCurrencyData(base) {
    let result = await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${base ? base : "INR"}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=2C24h%2C7d`
      )
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return result;
  }

  return (
    <FetchContext.Provider
      value={{
        data,
        setData,
        GetDataWithBase,
        GetHistoryData,
        GetCryptoCurrencyData,
      }}
    >
      {props.children}
    </FetchContext.Provider>
  );
};

export default FetchContextProvider;
