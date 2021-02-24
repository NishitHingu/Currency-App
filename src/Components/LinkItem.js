import { ListItem, ListItemText, ListItemIcon, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.contrastText,
  },
  text: {
    color: theme.palette.primary.contrastText,
  },
}));

const LinkItem = ( props ) => {
    const {icon, primary, to} = props;
    const classes = useStyles();
    
    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
      );
   
    return (
        // <RouterLink to={to}>{primary}</RouterLink>
        <li>
        <ListItem button component={renderLink} className={classes.text}>
            {icon ? <ListItemIcon className={classes.icon}>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
        </li>
    );
}
 
export default LinkItem;
