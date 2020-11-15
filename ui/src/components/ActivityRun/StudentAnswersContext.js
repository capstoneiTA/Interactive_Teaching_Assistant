import React, { createContext, useState } from "react";

const StudentAnswersContext= createContext({});

const StudentAnswersContextProvider = ({ children }) => {
    const [answersInfo, setAnswersInfo] = useState({});

    return (
        <StudentAnswersContext.Provider value={{ answersInfo, setAnswersInfo}}>
            {children}
        </StudentAnswersContext.Provider>
    );
};

export { StudentAnswersContext, StudentAnswersContextProvider };