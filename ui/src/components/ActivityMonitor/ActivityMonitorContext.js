import React, { createContext, useState } from "react";

const ActivityMonitorContext= createContext('');

const ActivityMonitorContextProvider = ({ children }) => {
    const [monitor, setMonitor] = useState('');
    const [quizSocket, setQuizSocket] = useState('');
    const[open, setOpen] = useState(true);
    const [activityRunning, setActivityRunning] = useState(false);
    const [pollSocket, setPollSocket] = useState('');
    const [exitSocket, setExitSocket] = useState ('');

    return (
        <ActivityMonitorContext.Provider value={{ monitor, setMonitor, quizSocket, setQuizSocket, open, setOpen, activityRunning, setActivityRunning, pollSocket, setPollSocket, exitSocket, setExitSocket}}>
            {children}
        </ActivityMonitorContext.Provider>
    );
};

export { ActivityMonitorContext, ActivityMonitorContextProvider };