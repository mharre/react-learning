import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    };
  }

  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    }
  }

  return {
    value: '',
    isValid: false
  };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    }
  }

  if (action.type === 'USER_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6
    }
  }

  return {
    value: '',
    isValid: false
  }
};

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,{value: '', isValid: null});

    const [passwordState, dispatchPassword] = useReducer(
      passwordReducer,{value: '', isValid: null});


    const context = useContext(AuthContext);

    // this is an example of object restructuring
    // taking value of isValid and alias assigning it to email/passwordIsValid
    const {isValid: emailIsValid} = emailState;      
    const {isValid: passwordIsValid} = passwordState
    // useEffect ran every single time even after password was valid
    // ex: more than 6 chars, typed another one it would run AGAIN - don't want this behavior
    // we use hte obj destructuring / alias assigning to manage this bad behavior

    useEffect(() => {
      // this is technically being ran with every keystroke, not the best idea to do
      // example: http request to a backend to check if username exists, don't want to send a bunch of req's
      // implement: debouncing, keeping track of time after keys are done typing
      const identifier = setTimeout(() => {
        // the trick: we save the timer, and for the next keystroke we clear it so we only have 1 ongoing timer at a time
        // only the last timer will therefore complete
        //console.log('Checking form validity')
        setFormIsValid(
          emailIsValid && passwordIsValid
        );
      }, 500);

      return () => {
        //console.log('cleanup function!!')
        clearTimeout(identifier);
      };

    },[setFormIsValid, emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    //setFormIsValid(
    //  event.target.value.includes('@') && passwordState.isValid
    //);
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword(
      {type: 'USER_INPUT', val: event.target.value}
    );

    //setFormIsValid(
    //  emailState.isValid && event.target.value.trim().length > 6
    //);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
    //setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id='email'
          label='E-Mail'
          type='email'
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          />
        <Input id='email'
          label='Password'
          type='password'
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
