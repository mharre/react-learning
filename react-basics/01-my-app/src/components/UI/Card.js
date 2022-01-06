import React from 'react';

import './Card.css';
// we don't set or change children, this allows wrapper Card to work
// anything inside of the card tags are the children / avail to use
const Card = (props) => {
    const classes = 'card ' + props.className;

    return <div className={classes}>{props.children}</div>
};

export default Card;