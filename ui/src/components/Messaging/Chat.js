import React, {useEffect, useState} from 'react'
import socketIOClient from 'socket.io-client'
import axios from "axios";
import useSocket from 'use-socket.io-client';
const apiUrl = `http://localhost:8080`;
const ENDPOINT = "http://localhost:7000/";


const Chat = ({user, sessionName, sessionId}) => {
    const [socket] = useSocket(ENDPOINT + sessionName)
    const [value, setValue] = useState('')
    const [messages, setMessages] = useState(['test_message'])

    socket.connect()
    console.log(socket)

    // const ENDPOINT = "http://localhost:7000/";
    // let socket = socketIOClient(ENDPOINT + sessionName);

    // socket.on('plswork', (message) => {
    //   console.log(message)
    // })

    useEffect(() => { 
      // anytime we mount the component this is run
      socket.on("connection", data => {
        socket.emit('chat update', 1, 'test_message')
        // setMessages(data); 
      });
      // anytime we unmount, this is run
          return () => { 
            // socket.off("SENDING_NEW_TIME");
           }; 
      }, []);

    const handleChange = (e) => {
        setValue(e.target.value)
      }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('submitting')
      socket.emit(value)
      axios.post(apiUrl + '/chat/update', {sessionId: sessionId, userId: user.User_ID, messageContent: value}).then(function (chatRes) {
            console.log(chatRes.data);
          })
      
      socket.on('chat update', () => {
        socket.emit(value)
        console.log('message submitted')
        axios.post(apiUrl + '/message/create', {sessionId: sessionId, userId: user.User_ID, messageContent: value}).then(function (chatRes) {
          console.log(chatRes.data);
        })

      })
      alert('A name was submitted: ' + value);
      setMessages([...messages, value])
      console.log(messages)
    }


    return (
        <>
        <h1>CHAT</h1>
        <form onSubmit={e => handleSubmit(e)}>
        <label>
          Name:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        {messages.map((msg)=> (
          <p>{msg}</p>
        ))}
      </div>
        </>
    )
}

export default Chat