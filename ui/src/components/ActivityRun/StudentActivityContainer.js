//General
import React, {Component, useContext, useEffect, useState} from 'react';

import socketIOClient from "socket.io-client";
import StudentQuiz from "./StudentQuiz";
import {StudentAnswersContextProvider} from "./StudentAnswersContext";
import {StudentActivityContext} from "./StudentActivityContext";

export default function StudentActivityContainer({user, sessionName, sessionId}) {
    const [activity, setActivity] = useState('no activity started');
    const {open, setOpen} = useContext(StudentActivityContext);

    let currentQuiz = null;

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
           currentQuiz = quiz;
           setOpen(true);
           //remove any data from any past quizzes run
           setActivity(null);
           setActivity(<StudentAnswersContextProvider><StudentQuiz quiz={quiz} socket={socket} user={user} sessionId={sessionId}/></StudentAnswersContextProvider>);
       });
        socket.on('teacher end quiz from server', (quizId)=>{
            if(currentQuiz.quizId === quizId){
                setOpen(false);
                alert("Teacher has ended the quiz");
            }
        });
    };

    return(
        <div>
            {activity}
        </div>
    )


}
