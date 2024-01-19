import React from "react";
import { FetchContext } from "../Context/FetchContext";
import { useState, useContext, createContext } from "react";

export const CountryKeysContext = createContext();

const CountryKeysContextProvider = (props) => {
  const { countryTable } = useContext(FetchContext);
  const [keys, setKeys] = useState([]);
  const [isKeySet, setIsKeySet] = useState(false);
  async function FetchKeys() {
    setKeys(Object.keys(countryTable));
    setIsKeySet(true);
    return Promise.resolve(Object.keys(countryTable));
  }
  return (
    <CountryKeysContext.Provider value={{ keys, isKeySet, FetchKeys }}>
      {props.children}
    </CountryKeysContext.Provider>
  );
};

export default CountryKeysContextProvider;
