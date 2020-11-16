//General
import React, {Component, useContext, useEffect, useState} from 'react';

import socketIOClient from "socket.io-client";
import {ActivityMonitorContext} from "./ActivityMonitorContext";

export default function TeacherActivityMonitorContainer({sessionName}) {
    const {monitor, setMonitor, quizSocket, setQuizSocket} = useContext(ActivityMonitorContext);

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
        setQuizSocket(socket);
    },[]);

    const socketStart=()=>{
        socket.on('connect', () => {
            console.log('Monitor ready to listen to activities')
            sockId = socket.id;
        });
    };

    return(
        <div>
            {monitor}
        </div>
    )


}