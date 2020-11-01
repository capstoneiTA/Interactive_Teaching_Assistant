import React, {useEffect, useState} from 'react'
import socketIOClient from 'socket.io-client'
import axios from "axios";

let apiUrl = '';
if(process.env.REACT_APP_DEPLOY === "False"){
    apiUrl = `http://localhost:8080`;
}else{
    apiUrl = `${process.env.REACT_APP_EC2HOST}:8080`
}

const Chat = ({user, sessionName, sessionId}) => {
    const [value, setValue] = useState('')

    let ENDPOINT = '';
    if(process.env.REACT_APP_DEPLOY === "False"){
        ENDPOINT = `http://localhost:7000/`;
    }else{
        ENDPOINT = `${process.env.REACT_APP_EC2HOST}:7000/`;
    }

    let socket = socketIOClient(ENDPOINT + sessionName);

    axios.post(apiUrl + '/chat/create', {sessionId: sessionId, userId: user.User_ID}).then(function (chatRes) {
      console.log(chatRes.data);
    })
    socket.on('plswork', (message) => {
      console.log(message)
    })

    useEffect(()=>{
        socket.on('connect', () =>{
          socket.emit('chat update', 1, 'test_message')
          console.log('connected')
    });
    }, [])

    const handleChange = (e) => {
        setValue(e.target.value)
      }
    
    const handleSubmit = (e) => {
        alert('A name was submitted: ' + value);
        e.preventDefault();
      }


    return (
        <>
        <h1>CHAT</h1>
        <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        </>
    )
}

export default Chat