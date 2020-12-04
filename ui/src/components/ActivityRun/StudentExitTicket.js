import React, {Component, useContext, useEffect, useState} from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from "socket.io-client";
import axios from 'axios';
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import {ExitStudentAnswersContext} from "./ExitStudentAnswersContext";
let apiGatewayUrl = '';

    if(process.env.REACT_APP_DEPLOY === "False"){
        apiGatewayUrl= `http://localhost:8080`;
    }else{
       apiGatewayUrl = `${process.env.REACT_APP_EC2HOST}:8080`;
    }
const useStyles = makeStyles((theme) => ({
  root: {
        marginLeft: '20px',
        display: 'inline',
  },
   modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxHeight: '600px',
        overflowY: 'scroll',
        },
    h1: {
        textAlign: 'center',
        marginBottom: '40px'
  }

}));

export default function StudentExitTicket({quiz,socket,sessionId,userId}){
      const [answer, setAnswer] = useState('');
      const {answersInfo, setAnswersInfo} = useContext(ExitStudentAnswersContext);
      const classes = useStyles();
      const [display, setDisplay] = useState(true);


    //  handle submit and store students answer
      const submitAnswer = (e) =>{
          axios.post(apiGatewayUrl + '/ExitTicket/response', { sessionId: sessionId, questionId:quiz.quizQuestions[0].questionId, answerText: answer , userId: userId})
          .then(function (res) {
           console.log(res.data);
            }, (error)=> {
                console.log(error);
            });
            setAnswer('');
      };

      const AnswerChange = e => {
          setAnswersInfo(e.target.value);
      };
      const handleClose = () =>{
          console.log("Ticket is submitted");
          console.log("student responded" + answer);
          handleExitSubmission();

      };

      const handleExitSubmission = () =>{
        socket.emit('student submit exit', sessionId, userId, answersInfo);
        console.log('Exit Submitted!');
        setDisplay(false);
      };

    return (
      <div className={classes.root}>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={display}
            onClose={handleClose}
            closeAfterTransition>
             <Fade in= {display}>
                <div className= {classes.paper}>

                    <h1 className= {classes.h1}>{quiz.quizName}</h1>


                    {quiz.quizQuestions.map((question)=>{
                        return <div> <h2> {question.prompt} </h2> </div>
                    })}

                    <textarea className= {classes.root}
                        id= "answer"
                        name= "answer"
                        placeholder= "Enter response"
                        value= {answersInfo}
                        onChange = {AnswerChange}
                        rows= "4"
                        cols= "50"/>

                      <Button className= {classes.root}
                        variant= "contained"
                        color= "primary"
                        size= "small"
                        onClick ={() => { handleClose(); submitAnswer();}}>
                          Submit
                      </Button>
                </div>
            </Fade>
         </Modal>
      </div>
    );
}
