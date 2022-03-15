import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    // return in milliseconds
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    }
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;
    // converts truthy or falsey value into a true / false boolean
    // if token is string that is not empty it will return true, if empty it will return false

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer); // clear timer if timer was set
        }
    };

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        // LS is synchronous 
        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime); //loginHandler is executed if the remainingTime expires
    };

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration); //loginHandler is executed if the remainingTime expires
        }
    }, [tokenData, logoutHandler])
    // we need to do it like this because we can't refer to the logout handler before its initialized


    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;