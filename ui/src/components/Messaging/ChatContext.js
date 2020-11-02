import React, { createContext, useState } from "react";

const ChatContext= createContext([]);

const ChatContextProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    return (
        <ChatContext.Provider value={{messages, setMessages}}>
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatContextProvider };