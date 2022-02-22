import { useState } from 'react';

const useInput = (validateValue) => {  
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue) //this is where our validate func is being called, the entered value which is the state we manage, is the value passed into the useState func
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => { //allows us to reset form
    setEnteredValue('');
    setIsTouched(false);
  }; 

  return {
    value: enteredValue,
    isValid: valueIsValid, 
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }

};

export default useInput;