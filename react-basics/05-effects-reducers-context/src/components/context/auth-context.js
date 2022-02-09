import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
    //not technically necessary, helps with IDE auto complete if we are passing a func anywhere else in our app
    //it is good to pass dummy func in with same name
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const storedUserLogin = localStorage.getItem('isLoggedIn');
  
      if (storedUserLogin === '1') {
        setIsLoggedIn(true);
      }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler}}
                >

            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;