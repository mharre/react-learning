import React from 'react';

import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses';

const App = () => {
  const expenses = [
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
    console.log(expense)
  };

  // good practice to have onNameHere to indicate function pointer
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
