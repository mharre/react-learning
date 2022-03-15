import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // could add validation here


    setIsLoading(true);  
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYS6opbZ9OYRLfIzYSu2mYEc7KykTZriQ';
    } else { // change to async await at some point for practice sake
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYS6opbZ9OYRLfIzYSu2mYEc7KykTZriQ';
    }
    fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setIsLoading(false);
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          //console.log(data);
          let errorMessage = 'Authentication Failed';
          //if (data && data.error && data.error.message) {
          //  errorMessage = data.error.message;
          //}
          throw new Error(errorMessage);
        });
      }
    }).then(data => { // make it into this block with no errors
      //console.log(data);
      const expirationTime = new Date(
        new Date().getTime() + (+data.expiresIn * 1000)
      ); 
      // convert data.expiresIn to number with +, then convert to milliseconds, and add it to the current timestamp in milliseconds and that is then passed to new date again to construct new date object from that time stamp in milliseconds
      authCtx.login(data.idToken, expirationTime.toISOString());
      history.replace('/');
    }).catch(err => { // if error, promises above are rjected
      // keeping it simple so just using alert
      alert(err.message);
    });

  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
