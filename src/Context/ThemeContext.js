import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [mode, setMode] = useState("light");
  const customTheme = createMuiTheme({
    palette: {
      type: mode === "dark" ? "dark" : "light",
      primary: {
        light: "#ff9723",
        dark: "#c96a00",
        main: "#ff8906",
        contrastText: "#fffffe",
      },
      text: {
        primary: mode === "dark" ? "#fffffe" : "#0f0e17",
        secondary: "#a7a9be",
        disabled: "rgba(15, 14, 23, 0.38)",
        hint: "rgba(15, 14, 23, 0.38)",
        divider: "rgba(15, 14, 23, 0.38)",
      },
      background: {
        default: mode === "dark" ?  "#1a1d26" : "#fffffe",
        paper:  mode === "dark" ?  "#14131f" : "#f4f4f5",
      },
      graph: {
        primary: "#f4f4f5",
        secondary: "#a6a2c7",
        barGraph: mode !== "dark" ?  "#ff9723" : "#cf6d00",
      },
      sideBar: {
        background: "#0f0e17",
      }
    },
    overrides: {
        MuiDrawer: {
          root: {
            border: 0,   
          },   
      } 
    },
  });

  const toggleTheme = () => {
    let newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={ customTheme }>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
