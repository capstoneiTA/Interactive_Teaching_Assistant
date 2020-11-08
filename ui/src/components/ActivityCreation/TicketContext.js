import React, { createContext, useState } from "react";

const TicketContext= createContext({});
//modify what state it will account for
// quizName and quiz questions in form of an array
const TicketContextProvider = ({ children }) => {
    const [quizInfo, setQuizInfo] = useState({quizName: '', prompt: ''});

    return (
        <TicketContext.Provider value={{ quizInfo, setQuizInfo }}>
            {children}
        </TicketContext.Provider>
    );
};

export { TicketContext, TicketContextProvider };