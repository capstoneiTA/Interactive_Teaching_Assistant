import React, { createContext, useState } from "react";

const StudentActivityContext= createContext('');

const StudentActivityContextProvider = ({ children }) => {
    const[open, setOpen] = useState(false);

    return (
        <StudentActivityContext.Provider value={{open, setOpen}}>
            {children}
        </StudentActivityContext.Provider>
    );
};

export { StudentActivityContext, StudentActivityContextProvider };