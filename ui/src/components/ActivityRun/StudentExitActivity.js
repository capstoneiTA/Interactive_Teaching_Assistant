//General
import React, {useEffect, useState} from 'react';

import socketIOClient from "socket.io-client";
import StudentExitTicket from "./StudentExitTicket";

export default function StudentExitActivity({user, sessionName, sessionId}) {
    const [Status, SetStatus] = useState('no activity started');

    let ENDPOINT = '';
    if(process.env.REACT_APP_DEPLOY === "False"){
        ENDPOINT = 'http://localhost:7000/';
    }else{
        ENDPOINT = `${process.env.REACT_APP_EC2HOST}:7000/`;
    }
    //Socket info
    let socket = socketIOClient(ENDPOINT + sessionName);
    let socket_Id = 'empty';


    //Start listening when the component mounts
    useEffect(()=>{
        socketStart();
    },[]);

    const socketStart=()=>{
        socket.on('connect', () => {
            console.log('connected to session socket communication. Ready to accept Quizzes.')
            socket_Id = socket.id;
            listen();
        });
    };

    const listen=()=>{
       socket.on('exit for students', (teacherSockId, quiz)=>{
           console.log(quiz);
            SetStatus(<StudentExitTicket quiz={quiz} sessionId= {sessionId} userId= {user.User_ID}/>);
       })
    };

    return(
        <div>
            {Status}
        </div>
    )



}
