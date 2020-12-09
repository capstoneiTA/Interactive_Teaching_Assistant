import React, { createContext, useState } from "react";

const PollContext= createContext({});

const PollContextProvider = ({ children }) => {
    const [pollInfo, setPollInfo] = useState({PollName: '', pollQuestions: []});

    return (
        <PollContext.Provider value={{ pollInfo, setPollInfo }}>
            {children}
        </PollContext.Provider>
    );
};

export { PollContext, PollContextProvider };