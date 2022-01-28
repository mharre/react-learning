import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
    return (
        <button
        className={classes.button}
        type={props.type || 'button'}
        onClick={props.onClick}
        >
            {props.children}
        </button>
    )
};
// type = props.type or button as a fallback
// we need props.children so the 'Add User' will be shown 
// without props.children nothing is shown unless we hard code in

export default Button