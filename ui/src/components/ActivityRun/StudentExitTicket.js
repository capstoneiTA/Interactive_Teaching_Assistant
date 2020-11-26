import React, {Component, useContext, useEffect, useState} from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from "socket.io-client";
import axios from 'axios';
import StudentExitActivity from "./StudentExitActivity";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
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

const StudentExitTicket=({quiz,userId,sessionId,socket})=> {
      const [answer, setAnswer] = useState('');
      const classes = useStyles();
      const [display, setDisplay] = useState(true);




        useEffect(()=>{

        }, []);
      //handle submit and store students answer
//      const submitAnswer = (e) =>{
//          axios.post(apiGatewayUrl + '/ExitTicket/response', { sessionId: sessionId, questionId:quiz.quizQuestions[0].questionId, answerText: answer , userId: userId})
//          .then(function (res) {
//           console.log(res.data);
//            }, (error)=> {
//                console.log(error);
//            });
//            setAnswer('');
//      }
      const AnswerChange = e => {
          setAnswer(e.target.value);
      }
      const handleClose = () =>{
          console.log("Ticket is submitted");
          handleExitSubmission();

      }

      const handleExitSubmission = () =>{
        socket.emit('student submit exit', sessionId );
        console.log('Exit Submitted!');
        setDisplay(false);
      }

    return (
         <div className={classes.root}>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={display}
            onClose={handleClose}
            closeAfterTransition
        >
         <Fade in= {display}>
          <div className= {classes.paper}>
            <h1 className= {classes.h1}>
                  {quiz.quizName}
            </h1>
            {quiz.quizQuestions.map((question)=>{
        return <div>
                <h2> {question.prompt} </h2>
         </div>
          })}
         <textarea className= {classes.root}
                id= "answer"
                name= "answer"
                placeholder= "Enter response"
                value= {answer}
                onChange = {AnswerChange}
                rows= "4"
                cols= "50"
         />
              <Button className= {classes.root}
                variant= "contained"
                color= "primary"
                size= "small"
                onClick ={() => {
                handleClose();
                }}
                >
                  Submit
                </Button>
               </div>
              </Fade>
           </Modal>
         </div>
);

}
export default StudentExitTicket;