import React from 'react';

import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = (props) => {
  // if our return content changes completely we can handle it this way
  // return something else entirely
  if(props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no expenses</h2>;
  }

  return (
    <ul className='expenses-list'>
        {props.items.map((expense) => (
          <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date} 
          />
       ))}
    </ul>
  )
}

export default ExpensesList