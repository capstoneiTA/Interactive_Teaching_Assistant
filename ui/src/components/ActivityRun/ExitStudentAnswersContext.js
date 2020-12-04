import React, { createContext, useState } from "react";

const ExitStudentAnswersContext= createContext({});

const ExitStudentAnswersContextProvider = ({ children }) => {
    const [answersInfo, setAnswersInfo] = useState('');

    return (
        <ExitStudentAnswersContext.Provider value={{ answersInfo, setAnswersInfo}}>
            {children}
        </ExitStudentAnswersContext.Provider>
    );
};

export { ExitStudentAnswersContext, ExitStudentAnswersContextProvider };