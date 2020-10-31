//General
import React, {Component, useEffect, useState} from 'react';

import socketIOClient from "socket.io-client";
import StudentQuiz from "./StudentQuiz";

export default function StudentActivityContainer({user, sessionName}) {
    const [status, setStatus] = useState('no activity started');
    const ENDPOINT = "http://localhost:7000/";
    //Socket info
    let socket = socketIOClient(ENDPOINT + sessionName);
    let sockId = 'empty';


    //Start listening when the component mounts
    useEffect(()=>{
        socketStart();
    },[]);

    const socketStart=()=>{
        socket.on('connect', () => {
            console.log('connected to session socket communication. Ready to accept Quizzes.')
            sockId = socket.id;
            listen();
        });
    };

    const listen=()=>{
       socket.on('quiz for students', (teacherSockId, quiz)=>{
           console.log(quiz);
           setStatus(<StudentQuiz quiz={quiz}/>);
       })
    };

    return(
        <div>
            {status}
        </div>
    )


}
