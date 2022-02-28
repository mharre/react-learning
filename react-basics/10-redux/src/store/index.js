import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialCounterState = {
    counter: 0,
    showCounter: true
};

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state,action) {
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});

const intialAuthState = {
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: intialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    },
});

const store = configureStore({
    reducer: {counter: counterSlice.reducer, auth: authSlice.reducer}
});
// only 1 .reducer can be passed to createStore so multile slices could present issue. 
// configureStore solves this, must pass configuration object where we set a reducer property
// reducer can only be used once in configureStore but we can set it as an object with a key of our choice and the value would be differnt reducer functions

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
// creatslice automaticallyyy creates unique action identifiers for our reducers
// methods of .actions are the names that we have in our reducers object in the slice (inc, dec.. etc) all done automatically by toolkit
export default store;