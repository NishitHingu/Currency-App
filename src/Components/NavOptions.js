import { Divider, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LinkItem from './LinkItem';
import Home from '@material-ui/icons/Home';
import History from '@material-ui/icons/History';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import MoneySharpIcon from '@material-ui/icons/MoneySharp';


const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    // wrapper: {
    //     height: '100%',
    //     '&::before' : {
    //         content: '""',
    //         display: 'block',
    //         position: "absolute",
    //         left: 0,
    //         top: 0,
    //         width: "100%",
    //         height: "100%",
    //         opacity: "0.6",
    //         backgroundImage: 'url(https://images.pexels.com/photos/6120172/pexels-photo-6120172.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)',
    //         backgroundRepeat: 'no-repeat',
    //         backgroundSize: 'cover',
    //         backgroundPosition: 'center',
    //     }
        
    // }
}));

function NavOptions() {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.toolbar}></div>
            <Divider />
            <List>
                 <LinkItem to="/" primary="Home" icon={<Home/>}/>
                <LinkItem to="/history" primary="History" icon={<History/>}/>
                <LinkItem to="/converter" primary="Converter" icon={<AttachMoneyRoundedIcon/>}/>
            </List>
            <Divider/>            
            <List>
                <LinkItem to="/cryptoCurrency" primary="CryptoCurrency" icon={<MoneySharpIcon/>}/>
            </List>
        </div>
    );
}
 
export default NavOptions;