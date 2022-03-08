import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
    items: [],
    totalQuantity: 0,
    changed: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        replaceCart(state,action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state,action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id)
            state.totalQuantity++;
            state.changed = true;
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
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
                // keep all items where the id does not match the id we are trying to remove
                // creates new array 
            } else {
                existingItem.quantity--
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price; 
            }
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;