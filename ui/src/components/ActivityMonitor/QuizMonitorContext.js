import React, { createContext, useState } from "react";

const QuizMonitorContext= createContext('');

const QuizMonitorContextProvider = ({ children }) => {
    const [answers, setAnswers] = useState({quizQuestions: []});

    return (
        <QuizMonitorContext.Provider value={{ answers, setAnswers}}>
            {children}
        </QuizMonitorContext.Provider>
    );
};

export { QuizMonitorContext, QuizMonitorContextProvider };