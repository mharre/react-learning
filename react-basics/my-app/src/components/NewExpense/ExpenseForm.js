import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {

    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };

    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    };

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };
    // A way to manage with just 1 state since they are similiar
    // but must always update all 3 states when updating 1
    // just down to personal preference which method is best
    // whenever you update state and depend on the previous state
    // you need to be careful use function form below
    //const [userInput, setUserInput] = useState({
    //    enteredTitle: '',
    //    enteredAmount: '',
    //    enteredDate: '',
    //});

    //const titleChangeHandler = (event) => {
    //    // bad practice don't do it this way
    //    //setUserInput({
    //    //    ...userInput,
    //    //    enteredTitle: event.target.value,
    //    //})
    //    setUserInput((prevState) => {
    //        return {...prevState, enteredTitle: event.target.value};
    //    });
    //};

    //const amountChangeHandler = (event) => { 
    //    //setUserInput({
    //    //    ...userInput,
    //    //    enteredAmount: event.target.value,
    //    //})
    //    setUserInput((prevState) => {
    //        return {...prevState, enteredAmount: event.target.value};
    //    });
    //};

    //const dateChangeHandler = (event) => {
    //    //setUserInput({
    //    //    ...userInput,
    //    //    enteredDate: event.target.value,
    //    //})
    //    setUserInput((prevState) => {
    //        return {...prevState, enteredDate: event.target.value};
    //    });
    //};

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate)
        };

        // executing our func to pass up the data
        props.onSaveExpenseData(expenseData);
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input
                    type='text'
                    value={enteredTitle}
                    onChange={titleChangeHandler}
                    />
                </div>
                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input
                    type='number'
                    value={enteredAmount}
                    min='0.01'
                    step='0.01' 
                    onChange={amountChangeHandler}
                    />
                </div>
                <div className='new-expense__control'>
                    <label>Date</label>
                    <input
                    type='date'
                    value={enteredDate}
                    min='2019-01-01'
                    max='2022-12-31'
                    onChange={dateChangeHandler}
                    />
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type='submit'>Add Expense</button>
            </div>
        </form>
    )
};

export default ExpenseForm;