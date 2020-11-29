import React, { createContext, useState } from "react";

const PollMonitorContext= createContext('');

const PollMonitorContextProvider = ({ children }) => {
    const [answers, setAnswers] = useState({pollQuestions: []});

    return (
        <PollMonitorContext.Provider value={{ answers, setAnswers }}>
            {children}
        </PollMonitorContext.Provider>
    );
};

export { PollMonitorContext, PollMonitorContextProvider };