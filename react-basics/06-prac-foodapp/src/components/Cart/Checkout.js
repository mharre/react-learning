import React, { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const validName = !isEmpty(enteredName);
        const validStreet = !isEmpty(enteredStreet);
        const validPostal = !isNotFiveChars(enteredPostal);
        const validCity = !isEmpty(enteredCity);

        setFormInputValidity({
            name: validName,
            street: validStreet,
            postal: validPostal,
            city: validCity
        });

        const formIsValid = 
            validName &&
            validStreet &&
            validPostal &&
            validCity;

        if (!formIsValid) {
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        }); // passing obj data from checkout to cart component

    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameInputRef} />
          {!formInputValidity.name && <p>Please input a valid name</p>}
        </div>
        <div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetInputRef} />
          {!formInputValidity.street && <p>Please input a valid street</p>}
        </div>
        <div className={`${classes.control} ${formInputValidity.postal ? '' : classes.invalid}`}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' ref={postalInputRef} />
          {!formInputValidity.postal && <p> Must be 5 digits only</p>}
        </div>
        <div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityInputRef} />
          {!formInputValidity.city && <p>Please input a valid city</p>}
        </div>
        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    )
};
// type button so it doesn't submit form if clicked

export default Checkout;