import { useTheme } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { Spinner } from 'spin.js';

const Loader = (props) => {
    const theme = useTheme();
    let opts = {
        lines: 11, // The number of lines to draw
        length: 0, // The length of each line
        width: 20, // The line thickness
        radius: 44, // The radius of the inner circle
        scale: 0.5, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        speed: 0.8, // Rounds per second
        rotate: 0, // The rotation offset
        animation: 'spinner-line-shrink', // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: theme.palette.text.primary, // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        shadow: '0 0 1px transparent', // Box-shadow for the lines
        zIndex: 2000000000, // The z-index (defaults to 2e9)
        className: 'spinner', // The CSS class to assign to the spinner
        position: 'absolute', // Element positioning
      };
    const loader = useRef(null);
    useEffect(() => {
      // eslint-disable-next-line no-unused-vars
      let spinner = new Spinner(opts).spin(loader.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return (
        <div style={{ width: '100%', height: "100%"}} ref={loader}>
        </div>
    );
}
 
export default Loader;