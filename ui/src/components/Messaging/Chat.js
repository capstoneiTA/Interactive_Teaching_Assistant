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
  const [myMessages, setMyMessages] = useState([]);
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
          // console.log("RES FROM CLASSCHAT", res.data);
          socket.on("connect", connectUser);
          sockid = socket.id;
          // console.log("socketid", socket);
          listen();
        } else {
          console.log("chat listener creation error");
        }
      })
      .catch((err) => console.log(err));
    // socket.emit("user init", { hello: user.User_ID });
    // axios
    //   .get(apiUrl + "/messages/get", {
    //     params: {
    //       sessionId: sessionId,
    //     },
    //   })
    //   .then(function (res) {
    //     console.log("GETRES", res);
    //     setMessages(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    updateMessages = (data) => {
      // console.log("data in useeffect2", data);
      setMessages(data);
      getMyMessages(data);
    };
  }, [messages]);

  const listen = () => {
    socket.on("chat message from server", function (data) {
      console.log("message from server", data);
      updateMessages(data);
    });
    socket.on("reply message from server", function (data) {
      console.log("reply message from server", data);
      updateMessages(data);
    });
    socket.on("starter messages", function (data) {
      setMessages(data);
      getMyMessages(data);
      // updateMessages(data);
      // updateMessages(data);
    });
  };

  function connectUser() {
    // Called whenever a user signs in
    var userId = user.User_ID; // Retrieve userId
    console.log("USER ID FROM CONNECT", userId);
    if (!userId) return;
    socket.emit("user init", userId);
  }

  let updateMessages = (data) => {
    console.log("The first definition");
    let newMessages = [...messages];
    newMessages.push(data);
    setMessages(newMessages);
  };

  const getMyMessages = (msges) => {
    const newMyMessages = [];
    for (let msg of msges) {
      // console.log("msguserid", msg.user.id, "myUSERID", user.User_ID);
      if (msg.user.id === user.User_ID) {
        newMyMessages.push(msg.Message_ID);
      }
    }
    // console.log(newMyMessages);
    setMyMessages(newMyMessages);
  };

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
        console.log("resDATA", res.data);
        if (res.data.messageCreation === true) {
          console.log("MESSAGE CREATED SUCCESS", res.data);
          socket.emit("chat message from client", {
            Session_ID: res.data.Session_ID,
            Message_Content: res.data.Message_Content,
            user: res.data.user,
            replyTo: res.data.replyTo,
            createdAt: res.data.createdAt,
            Message_ID: res.data.Message_ID,
          });
          setValue("");
        } else {
          console.log("FAILED");
        }
      });
  };
  const handleReply = (Message_ID) => {
    axios
      .post(apiUrl + "/messages/create", {
        Session_ID: sessionId,
        Message_Content: value,
        user: {
          id: user.User_ID,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        replyTo: Message_ID,
      })
      .then(function (res) {
        console.log("resDATA", res.data);
        if (res.data.messageCreation === true) {
          console.log("MESSAGE CREATED SUCCESS", res.data);
          socket.emit("reply message from client", {
            Session_ID: res.data.Session_ID,
            Message_Content: res.data.Message_Content,
            user: res.data.user,
            replyTo: res.data.replyTo,
            createdAt: res.data.createdAt,
            Message_ID: res.data.Message_ID,
          });
          setValue("");
        } else {
          console.log("FAILED");
        }
      });
  };

  return (
    <>
      <ChatBox
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        messages={messages}
        user={user}
        handleReply={handleReply}
        myMessages={myMessages}
      />
    </>
  );
};

export default Chat;
