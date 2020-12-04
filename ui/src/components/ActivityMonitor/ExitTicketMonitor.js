
import React, {Component, useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import {ExitTicketMonitorContext} from "./ExitTicketMonitorContext";
import {ExitStudentAnswersContext} from "../ActivityRun/ExitStudentAnswersContext";

import {ActivityMonitorContext} from "./ActivityMonitorContext";
import StudentExitTicket from "../ActivityRun/StudentExitTicket";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
          marginLeft: '20px',
          display: 'inline',
    },
  modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
   },
    h1: {
          textAlign: 'center',
          marginBottom: '40px'
   }
});

function createData(name, response) {
  return { name, response };
}

const rows = [];

export default function ExitTicketMonitor({quiz,user,firstname}) {
  const classes = useStyles();

  const {monitor, setMonitor, exitSocket, setExitSocket} = useContext(ActivityMonitorContext);
  const [display, setDisplay] = useState(true);
  let studentsFinished = [];
  let studentAnswers = [];
  const {answers, setAnswers} = useContext(ExitTicketMonitorContext);
  let answersHelper = {};


  useEffect(()=>{
          listen();
      }, []);

  const listen=()=>{
      exitSocket.on('exit ticket submission from student', (sessionId, firstname, answersInfo)=>{

                studentsFinished.push(firstname);
                rows.push(createData(firstname,answersInfo));
                updateResponses(answersInfo);
      })
 };
  const updateResponses = (answersInfo) =>{

         console.log(answersInfo);
         let newAnswers = {...answersHelper};
         newAnswers = answersInfo;
         //console.log(newAnswers);
         setAnswers(newAnswers);
         answersHelper = newAnswers;
        // console.log(answersHelper);
         studentAnswers.push(answersHelper);

     };
  const close = () => {
        setDisplay(false);

  };
  return (
        <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={display}
            onClose={close}
            closeAfterTransition
        >
        <Fade in={display}>
        <TableContainer component={Paper}>
         <h1 className = {classes.h1}>
              {quiz.quizName}
         </h1>
              {quiz.quizQuestions.map((question)=>{
                   return <div>
                         <h2 className = {classes.h1}>
                          {question.prompt}
                         </h2>
                </div>
                })}
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell align="right">Response</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.response}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
               </Table>
            </TableContainer>
        </Fade>
       </Modal>
    </div>

  )
}