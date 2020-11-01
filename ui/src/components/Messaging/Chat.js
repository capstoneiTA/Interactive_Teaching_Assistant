import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
import axios from "axios";
const apiUrl = `http://localhost:8080`;
const ENDPOINT = "http://localhost:7000/";

let socket;

const Chat = ({user, sessionName, sessionId}) => {
    const [value, setValue] = useState('')
    const [messages, setMessages] = useState(['test_message'])


    if (!socket){
      // socket = io(ENDPOINT + sessionName);
      socket = io(ENDPOINT + sessionName);
    }
    let sockid = '';

    useEffect(()=>{
      socket.on('connect', function(){
        sockid = socket.id;
        console.log(sockid)

        // socket.emit('room', sessionName)
      })
      
    },[])

    socket.on('message', function(data){
      console.log('Incoming message:', data)
    })

    socket.on('RECEIVE_MESSAGE', (data)=>{
      console.log(data)
    })

    // socket.on()




    const handleChange = (e) => {
        setValue(e.target.value)
      }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('submitting: ', value)
      socket.emit('message', value)
      // socket.emit('SEND_MESSAGE', {
      //   user: user,
      //   message: value
      // })
      // axios.post(apiUrl + '/chat/update', {sessionId: sessionId, userId: user.User_ID, messageContent: value}).then(function (chatRes) {
      //       console.log(chatRes.data);
      //     })
      // alert('A name was submitted: ' + value);
      // setMessages([...messages, value])
      // console.log(messages)
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