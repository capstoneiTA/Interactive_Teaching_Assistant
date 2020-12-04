import React, { createContext, useState } from "react";

const StudentActivityContext= createContext('');

const StudentActivityContextProvider = ({ children }) => {
    const[open, setOpen] = useState(false);
    const [answersInfo, setAnswersInfo] = useState({});

    return (
        <StudentActivityContext.Provider value={{open, setOpen, answersInfo, setAnswersInfo}}>
            {children}
        </StudentActivityContext.Provider>
    );
};

export { StudentActivityContext, StudentActivityContextProvider };