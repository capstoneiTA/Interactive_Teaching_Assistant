import React, { createContext, useState } from "react";

const ExitTicketMonitorContext= createContext('');

const ExitTicketMonitorContextProvider = ({ children }) => {
    const [ExitMonitor, setExitMonitor] = useState('');
    const [ExitSocket, setExitSocket] = useState('');

    return (
        <ExitTicketMonitorContext.Provider value={{ ExitMonitor, setExitMonitor,ExitSocket, setExitSocket }}>
            {children}
        </ExitTicketMonitorContext.Provider>
    );
};

export { ExitTicketMonitorContext, ExitTicketMonitorContextProvider };