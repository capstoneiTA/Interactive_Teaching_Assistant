import { createContext, useState } from 'react';

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn)
    }

    return (
        <AuthContext.Provider value={{user, setUser, isLoggedIn, toggleLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };