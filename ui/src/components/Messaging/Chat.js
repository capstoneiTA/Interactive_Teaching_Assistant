import React, { useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

import { ChatContext } from "./ChatContext";
import ChatBox from "./ChatBox";
import ChatDrawer from "./ChatDrawer";

let apiUrl = "";
let ENDPOINT = "";
if (process.env.REACT_APP_DEPLOY === "False") {
  apiUrl = `http://localhost:8080`;
  ENDPOINT = `http://localhost:7000/`;
} else {
  apiUrl = `${process.env.REACT_APP_EC2HOST}:8080`;
  ENDPOINT = `${process.env.REACT_APP_EC2HOST}:7000/`;
}

const Chat = ({ user, sessionName, sessionId }) => {
  const [value, setValue] = useState("");
  const { messages, setMessages } = useContext(ChatContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  let socket = socketIOClient(ENDPOINT + sessionName);
  let sockid = "";

  useEffect(() => {
    axios
      .post(apiUrl + "/chat/join", {
        sessionName: sessionName,
        sessionId: sessionId,
      })
      .then(function (res) {
        if (res.data.chat_created === true) {
          console.log("RES FROM CLASSCHAT", res.data);
          socket.on("connect", function () {
            sockid = socket.id;
          });
          listen();
        } else {
          console.log("chat listener creation error");
        }
      })
      .catch((err) => console.log(err));
    axios
      .get(apiUrl + "/messages/get", {
        params: {
          sessionId: sessionId,
        },
      })
      .then(function (res) {
        console.log("GETRES", res);
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    updateMessages = (data) => {
      console.log("data in useeffect2", data);
      setMessages(data);
    };
  }, [messages]);

  const listen = () => {
    socket.on("chat message from server", function (data) {
      console.log("message from server", data);
      updateMessages(data);
    });
  };

  let updateMessages = (data) => {
    console.log("The first definition");
    let newMessages = [...messages];
    newMessages.push(data);
    setMessages(newMessages);
  };

  // const gatherAllMessages = (data) => {
  //   let newMessages = []
  //   for (let message of messages){
  //     if (message.createdAt === data[0].createdAt){
  //       for (msg of data) {
  //         newMessages.push(msg)
  //       }
  //       return newMessages
  //     } else {
  //       newMessages.push(message)
  //     }
  //   }
  // }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting user", user);
    // console.log('submitting: ', value);
    axios
      .post(apiUrl + "/messages/create", {
        Session_ID: sessionId,
        Message_Content: value,
        user: {
          id: user.User_ID,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        replyTo: null,
      })
      .then(function (res) {
        if (res.data.messageCreation === true) {
          console.log("MESSAGE CREATED SUCCESS");
        } else {
          console.log("FAILED");
        }
      });
    socket.emit("chat message from client", {
      Session_ID: sessionId,
      Message_Content: value,
      user: {
        id: user.User_ID,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      replyTo: null,
      createdAt: new Date(),
    });
    setValue("");

    //Clear text box here
  };

  return (
    <>
      <ChatBox
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        messages={messages}
        user={user}
      />
    </>
  );
};

export default Chat;
