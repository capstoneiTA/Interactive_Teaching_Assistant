import React, { createContext, useState } from 'react';

const AuthContext = createContext({});


const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider};