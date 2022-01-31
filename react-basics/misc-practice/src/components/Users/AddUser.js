import React, { useState } from 'react';

import classes from './AddUser.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name an age (non empty values).'
            });
            return;
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (greater than 0).'
            });
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

    const errorHandler = () => {
        setError(null);
    };

    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
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
        </div>
    )
};
// passing button props - type

export default AddUser;