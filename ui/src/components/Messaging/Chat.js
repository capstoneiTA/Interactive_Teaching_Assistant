import React, {useContext, useEffect, useState} from 'react';
import io from 'socket.io-client';
import axios from "axios";
import {QuizContext} from "../ActivityCreation/QuizContext";
import {ChatContext} from "./ChatContext";
const apiUrl = `http://localhost:8080`;
const ENDPOINT = "http://localhost:7000/";

const Chat = ({user, sessionName, sessionId}) => {
    const [value, setValue] = useState('');
    const {messages, setMessages} = useContext(ChatContext);
    let socket = io(ENDPOINT + sessionName);
    let sockid = '';

    useEffect(()=>{
        axios.post(apiUrl + '/chat/join', {sessionName: 'test'}).then(function (res) {
            if(res.data.chat_created === true){
                socket.on('connect', function(){
                    sockid = socket.id;
                });
                listen();
            }else{
                console.log('chat listener creation error');
            }
        });
    }, []);


    useEffect(()=>{
        updateMessages=(data)=>{
            setMessages(data);
        };
    }, [messages]);

    const listen =()=>{
        socket.on('chat message from server', function(data){
            console.log('Incoming message for : ' + sockid +  ' ' + data);
            //Update messages state
            updateMessages(data);
        });
    };

    let updateMessages=(data)=>{
        console.log("The first definition");
        let newMessages = [...messages];
        newMessages.push(data);
        setMessages(newMessages);
        console.log(newMessages);
    };



    const handleChange = (e) => {
        setValue(e.target.value)
      };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('submitting: ', value);
      socket.emit('chat message from client', value);

      //Clear text box here
    };


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