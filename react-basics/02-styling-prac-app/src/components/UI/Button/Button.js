import React from 'react';

// import with CSS-modules differs slightly from regular react import - add styles also need to rename css file with .module
import styles from './Button.module.css';

//import styled from 'styled-components';

// props are all forwarded by the styled components package
//const Button = styled.button`
//  width: 100%;
//  font: inherit;
//  padding: 0.5rem 1.5rem;
//  border: 1px solid #8b005d;
//  color: white;
//  background: #8b005d;
//  box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//  cursor: pointer;
//
//  @media (min-width: 768px) {
//    width: auto;
//  }
//  
//  &:focus {
//    outline: none;
//  }
//  
//  &:hover,
//  &:active {
//    background: #ac0e77;
//    border-color: #ac0e77;
//    box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
//  }
//`;
const Button = props => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

// we are importing the object styles, we have access to every class in our css file

export default Button;
