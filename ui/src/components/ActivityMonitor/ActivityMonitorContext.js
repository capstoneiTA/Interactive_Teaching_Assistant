import React, { createContext, useState } from "react";

const ActivityMonitorContext= createContext('');

const ActivityMonitorContextProvider = ({ children }) => {
    const [monitor, setMonitor] = useState('');
    const [quizSocket, setQuizSocket] = useState('');
    const[open, setOpen] = useState(true);

    return (
        <ActivityMonitorContext.Provider value={{ monitor, setMonitor, quizSocket, setQuizSocket, open, setOpen}}>
            {children}
        </ActivityMonitorContext.Provider>
    );
};

export { ActivityMonitorContext, ActivityMonitorContextProvider };