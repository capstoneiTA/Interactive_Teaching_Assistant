import React, { createContext, useState } from "react";

const ActivityMonitorContext= createContext('');

const ActivityMonitorContextProvider = ({ children }) => {
    const [monitor, setMonitor] = useState('');
    const [quizSocket, setQuizSocket] = useState('');
    const [pollSocket, setPollSocket] = useState('');


    return (
        <ActivityMonitorContext.Provider value={{ monitor, setMonitor, quizSocket, setQuizSocket, pollSocket, setPollSocket}}>
            {children}
        </ActivityMonitorContext.Provider>
    );
};

export { ActivityMonitorContext, ActivityMonitorContextProvider };