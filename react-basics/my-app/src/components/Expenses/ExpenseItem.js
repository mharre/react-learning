import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

// default HTML elements support className = ... 
// custom HTML elements DO NOT, only support what we tell them to support
// must change code in the actual component to allow this behavior
const ExpenseItem = (props) => {
// hooks, useExample, must be called inside component functions
// not inside of nested functions or outside, only 1 exception

  // array destructuring (split into 2 arr)
  // returns a special function that we can use / array
  // first val is the current state value 
  // second element is the updating function

  return (
    <li>
    <Card className='expense-item'>
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{props.title}</h2>
        <div className='expense-item__price'>${props.amount}</div>
      </div>
    </Card>
    </li>
  );
}
// onEvents all want a function
// can do onClick={() => {console.log('test')}} but not typical
// don't call clickHandler() because JS would execute when line 22 is rendered

export default ExpenseItem;