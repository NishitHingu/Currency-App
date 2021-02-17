import React from "react";
import { FetchContext } from "../Context/FetchContext";
import { useState, useContext, createContext } from "react";

export const CountryKeysContext = createContext();

const CountryKeysContextProvider = (props) => {
  const { GetDataWithBase } = useContext(FetchContext);
  const [keys, setKeys] = useState([]);
  const [isKeySet, setIsKeySet] = useState(false);
  async function FetchKeys() {
    console.log("getKeysCalled");
    let result = await GetDataWithBase();
    if (typeof result === "object") {
      result = { ...result, EUR: 1 };
      result = Object.keys(result);
      result.sort();
      setKeys(result);
      setIsKeySet(true);
      return result;
    } else {
      console.log("rejected");
      return Promise.reject();
    }
  }
  return (
    <CountryKeysContext.Provider value={{ keys, isKeySet, FetchKeys }}>
      {props.children}
    </CountryKeysContext.Provider>
  );
};

export default CountryKeysContextProvider;
