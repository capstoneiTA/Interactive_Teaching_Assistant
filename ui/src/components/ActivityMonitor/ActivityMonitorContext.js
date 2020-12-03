import React, { createContext, useState } from "react";

const ActivityMonitorContext= createContext('');

const ActivityMonitorContextProvider = ({ children }) => {
    const [monitor, setMonitor] = useState('');
    const [quizSocket, setQuizSocket] = useState('');
    const [exitSocket, setExitSocket] = useState ('');
    return (
        <ActivityMonitorContext.Provider value={{ monitor, setMonitor, quizSocket, setQuizSocket, exitSocket, setExitSocket }}>
            {children}
        </ActivityMonitorContext.Provider>
    );
};

export { ActivityMonitorContext, ActivityMonitorContextProvider };