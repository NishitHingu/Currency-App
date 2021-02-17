import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';


const LinkItem = ( props ) => {
    const {icon, primary, to} = props;
    
    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
      );
   
    return (
        // <RouterLink to={to}>{primary}</RouterLink>
        <li>
        <ListItem button component={renderLink}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
        </li>
    );
}
 
export default LinkItem;
