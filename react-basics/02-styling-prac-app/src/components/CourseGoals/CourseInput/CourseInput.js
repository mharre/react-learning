import React, { useState } from 'react';
//import styled from 'styled-components';

import Button from '../../UI/Button/Button';
import styles from './CourseInput.module.css';

//const FormControl = styled.div`
//  margin: 0.5rem 0;
//
//  & label {
//    font-weight: bold;
//    display: block;
//    margin-bottom: 0.5rem;
//    color: ${(props) => props.invalid ? 'red' : 'black'};
//  }
//
//  & input {
//    display: block;
//    width: 100%;
//    border: 1px solid ${(props) => props.invalid ? 'red' : '#ccc'};
//    background-color: ${(props) => props.invalid ? '#ffd7d7' : 'transparent'};
//    font: inherit;
//    line-height: 1.5rem;
//    padding: 0 0.25rem;
//  }
//
//  & input:focus {
//    outline: none;
//    background: #fad0ec;
//    border-color: #8b005d;
//  }
//`;
///////////////////////////////////////////////////////////////////
// you can pass props into your element to use them inside of `` //
// ${(props) => props.invalid ? 'red' : '#ccc'} means            //
// arrow func that recieves the props as parameter               //
// should return text that should be returned in that position   //
// if invalid is true then we return red other wise return #ccc  //
///////////////////////////////////////////////////////////////////

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = event => {
    if(event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if(enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    };
    props.onAddGoal(enteredValue);
  };

  //<FormControl className={!isValid ? 'invalid':''}>
  // is the same thing as below, JS trick by using &&
  // it will render either the invalid or the other one
  // <FormControl className={!isValid && 'invalid'}>
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`${styles['form-control']} ${!isValid && styles.invalid}`}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
