//General
import React, {Component, useEffect, useState} from 'react';

import socketIOClient from "socket.io-client";
import StudentQuiz from "./StudentQuiz";
import StudentExitTicket from "./StudentExitTicket";
import {StudentAnswersContextProvider} from "./StudentAnswersContext";
import {ExitStudentAnswersContextProvider} from "./ExitStudentAnswersContext";

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
            console.log('connected to session socket communication. Ready to accept Quizzes.')
            sockId = socket.id;
            listen();
        });
    };

    const listen=()=>{
       socket.on('quiz for students', (teacherSockId, quiz)=>{
           console.log(quiz);
           setActivity(<StudentAnswersContextProvider><StudentQuiz quiz={quiz} socket={socket} user={user} sessionId={sessionId}/></StudentAnswersContextProvider>);
       })

       socket.on('exit for students', (teacherSockId, quiz)=>{
       console.log(quiz);
       setActivity(<ExitStudentAnswersContextProvider><StudentExitTicket quiz={quiz} socket= {socket} sessionId= {sessionId} userId= {user.User_ID} firstName= {user.firstName}/></ExitStudentAnswersContextProvider>);
       })
    };



    return(
        <div>
            {activity}
        </div>
    )


}
