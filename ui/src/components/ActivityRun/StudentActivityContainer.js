//General
import React, {Component, useEffect, useState} from 'react';

import socketIOClient from "socket.io-client";
import StudentQuiz from "./StudentQuiz";
import {StudentAnswersContextProvider} from "./StudentAnswersContext";
import StudentPoll from "./StudentPoll";

export default function StudentActivityContainer({user, sessionName, sessionId}) {
    const [activity, setActivity] = useState('no activity started');

    let ENDPOINT = '';
    if(process.env.REACT_APP_DEPLOY === "False"){
        ENDPOINT = 'http://localhost:7000/';
    }else{
        ENDPOINT = `${process.env.REACT_APP_EC2HOST}:7000/`;
    }
    //Socket info
    let socket = socketIOClient(ENDPOINT + sessionName);
    let sockId = 'empty';


    //Start listening when the component mounts
    useEffect(()=>{
        socketStart();
    },[]);

    const socketStart=()=>{
        socket.on('connect', () => {
            console.log('connected to session socket communication. Ready to accept Activities.')
            sockId = socket.id;
            listen();
        });
    };

    const listen=()=>{
       socket.on('quiz for students', (teacherSockId, quiz)=>{
           console.log(quiz);
           setActivity(<StudentAnswersContextProvider><StudentQuiz quiz={quiz} socket={socket} user={user} sessionId={sessionId}/></StudentAnswersContextProvider>);
       })

        socket.on('poll for students', (teacherSockId, poll)=>{
            console.log(poll);
            setActivity(<StudentAnswersContextProvider><StudentPoll poll={poll} socket={socket} user={user} sessionId={sessionId}/></StudentAnswersContextProvider>);
        })


    };

    return(
        <div>
            {activity}
        </div>
    )


}
