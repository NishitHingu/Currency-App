import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkItem from "./LinkItem";
import Home from "@material-ui/icons/Home";
import History from "@material-ui/icons/History";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import MoneySharpIcon from "@material-ui/icons/MoneySharp";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';


const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "1rem",
    width: "100%",
  },
  wrapper: {
    height: "100%",
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.sideBar.background,
      // opacity: "0.6",
      // backgroundImage: 'url(https://images.pexels.com/photos/6120172/pexels-photo-6120172.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)',
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
    },
  },
  heading: {
    color: theme.palette.primary.contrastText,
    marginLeft: '-10px',
  },
}));

function NavOptions(props) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Divider />
      <List onClick={() => props.onChange()}>
        <ListItem className={classes.title}>
        <ListItemIcon><MonetizationOnIcon color="primary" fontSize="large"/></ListItemIcon>
          <Typography variant="h4" align="center" className={classes.heading}>
            Currency
          </Typography>
        </ListItem>
        <LinkItem to="/" primary="Home" icon={<Home />}>
          Home
        </LinkItem>
        <LinkItem to="/history" primary="History" icon={<History />} />
        <LinkItem
          to="/converter"
          primary="Converter"
          icon={<AttachMoneyRoundedIcon />}
        />
        <LinkItem
          to="/cryptoCurrency"
          primary="CryptoCurrency"
          icon={<MoneySharpIcon />}
        />
      </List>
    </div>
  );
}

export default NavOptions;
