import React from 'react';

import classes from './Cart.module.css';

const Cart = (props) => {
    const cardItems =
        <ul className={classes['card-item']}>{
            [{id: 'c1', name: 'sushi', amount: 2, price: 12.99}].map((item) =>
                <li>{item.name}</li>)}
        </ul>

    return (
        <div>
            {cardItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>36.53</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </div>
    )
};

export default Cart;