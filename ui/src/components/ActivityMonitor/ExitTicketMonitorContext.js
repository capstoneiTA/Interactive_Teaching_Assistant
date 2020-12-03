import React, { createContext, useState } from "react";

const ExitTicketMonitorContext= createContext('');

const ExitTicketMonitorContextProvider = ({ children }) => {
    const [answers, setAnswers] = useState({quizQuestions: [0]});

    return (
        <ExitTicketMonitorContext.Provider value={{ answers, setAnswers }}>
            {children}
        </ExitTicketMonitorContext.Provider>
    );
};

export { ExitTicketMonitorContext, ExitTicketMonitorContextProvider };