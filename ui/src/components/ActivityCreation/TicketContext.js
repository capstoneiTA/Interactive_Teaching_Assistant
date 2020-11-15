import React, { createContext, useState } from "react";

const TicketContext= createContext({});

const TicketContextProvider = ({ children }) => {
    const [quizInfo, setQuizInfo] = useState({quizName: '', prompt: ''});

    return (
        <TicketContext.Provider value={{ quizInfo, setQuizInfo }}>
            {children}
        </TicketContext.Provider>
    );
};

export { TicketContext, TicketContextProvider };