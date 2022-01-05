import React, { useState} from 'react';

import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];
const App = () => {

  // initial state of our dummy expenses
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

// ***example of old react / what it does under the hood for the below return statement
// ***createElement takes 3 + args
// ***1st = element we want to create
// ***2nd = attributes in form of object
// ***3rd = content inside of the actual element
// return React.createElement(
//   'div',
//   {},
//   React.createElement('h2', {}, "Let's get started!"),
//   React.createElement(Expenses, {items: expenses})
// );
  const addExpenseHandler = (expense) => {
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses]
    });
  };

  // good practice to have onNameHere to indicate function pointer
  // when we pass data upwards we are also 'lifting the state up'
  // we can then pass that new data down via props BECAUSE
  // we can't pass data in between siblings (only parent/child)
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
