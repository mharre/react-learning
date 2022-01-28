import React, { useState } from 'react';

import classes from './AddUser.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');

    const addUserHandler = (event) => {
        event.preventDefault();
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            return;
        }
        if (+enteredAge < 1) {
            return;
        }
        // the + before enteredAge converts it to int

        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
    }

    const usernameChangeHandler = (event) => {
        // this is called to keep track of the keystrokes
        setEnteredUsername(event.target.value);
    };

    const ageChangeHandler = (event) => {
        // this is called to keep track of the keystrokes
        setEnteredAge(event.target.value);
    };

    return (
        <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text'
            value={enteredUsername} onChange={usernameChangeHandler} />
            <label htmlFor='age'>Age (Years)</label>
            <input id='age' type='number'
            value={enteredAge} onChange={ageChangeHandler}/>
            <Button type='submit'>Add User</Button>
        </form>
        </Card>
    )
};
// passing button props - type

export default AddUser;