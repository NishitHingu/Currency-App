import React, { useState, useContext } from "react";
import Home from "./Components/Home";
import Converter from "./Components/Converter";
import History from "./Components/History";
import NavOptions from "./Components/NavOptions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CountryKeysContextProvider from "./Context/CountryKeysContext";
import FetchContextProvider from "./Context/FetchContext";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { Drawer, Hidden, useTheme } from "@material-ui/core";
import CryptoCurrency from "./Components/CryptoCurrency";
import CryptoCurrencyWithID from "./Components/CryptoCurrencyWithID";
import { ThemeContext } from "./Context/ThemeContext";

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    boxShadow: "none",
    backgroundColor: theme.palette.sideBar.background,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    color: theme.palette.primary.contrastText,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    margin: "0",
    border: "none",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.sideBar.background,
  },
  title: {
    flexGrow: 1,
  },
  container: {
    overflow: "scroll",
    padding: theme.spacing(3),
    boxSizing: "border-box",
    maxWidth: "100vw",
    height: `calc(100vh - ${theme.mixins.toolbar.height})`,
    borderTopLeftRadius: '15px',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("sm")]: {
      borderTopLeftRadius: '0',
    },
    [theme.breakpoints.up("sm")]: {
      height: `calc(100vh - ${theme.mixins.toolbar["@media (min-width:600px)"].minHeight}px)`,
    },
    [theme.breakpoints.down("xs")]: {
      height: `calc(100vh - ${theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight}px)`,
      borderTopLeftRadius: '0',
    },
  },
}));

function App(props) {
  const classes = useStyles();
  const { window } = props;
  const theme = useTheme();
  const [DrawerState, setDrawerState] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const { mode, toggleTheme } = useContext(ThemeContext);


  const DrawerToggle = () => {
    setDrawerState(!DrawerState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Router basename="/Currency-App">
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
              onClick={DrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {currentPath}
            </Typography>
            <Button onClick={toggleTheme} color="inherit">
              {mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
            </Button>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="Navigation Options">
          <Hidden mdUp>
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={DrawerState}
              onClose={DrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <NavOptions onChange={() => setDrawerState(false)} />
            </Drawer>
          </Hidden>
          <Hidden smDown>
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <NavOptions onChange={() => setDrawerState(false)} />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.container}>
            <FetchContextProvider>
              <CountryKeysContextProvider>
                <Switch>
                  <Route exact path="/">
                    <Home setPath={setCurrentPath} />
                  </Route>
                  <Route path="/converter">
                    <Converter setPath={setCurrentPath} />
                  </Route>
                  <Route path="/history/:id">
                    <History setPath={setCurrentPath} />
                  </Route>
                  <Route path="/history">
                    <History setPath={setCurrentPath} />
                  </Route>
                  <Route exact path="/cryptoCurrency">
                    <CryptoCurrency setPath={setCurrentPath} />
                  </Route>
                  <Route path="/CryptoCurrency/:id">
                    <CryptoCurrencyWithID setPath={setCurrentPath} />
                  </Route>
                </Switch>
              </CountryKeysContextProvider>
            </FetchContextProvider>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
