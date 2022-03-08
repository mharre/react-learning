import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const initialCartState = {
    items: [],
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItemToCart(state,action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++;
            if (!existingItem) { // OKAY with redux toolkit, not with just redux
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                }); 
            } else {
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state,action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id != id);
                // keep all items where the id does not match the id we are trying to remove
                // creates new array 
            } else {
                existingItem.quantity--
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price; 
            }
        }
    }
});

export const sendCartData = (cart) => {
    return async (dispatch) => {  
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );

      const sendRequest = async () => {
        const response = await fetch('https://react-http-10a52-default-rtdb.firebaseio.com/cart.json', {
            method: 'PUT', // PUT will override existing data instead of just POST
            body: JSON.stringify(cart),
        });
    
        if (!response.ok) {
            throw new Error('Sending cart data failed');
        }
      };
      
      try {
        await sendRequest();
        dispatch(
            uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Sent cart data successfully!'
            })
        );
      } catch (error) {
        dispatch(uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart data has failed'
            })
        );
      }
    };
};

export const cartActions = cartSlice.actions;
export default cartSlice;