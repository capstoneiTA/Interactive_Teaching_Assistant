//monitor the exit ticket
//handle student submission
//1. create a table ui that will be the interface for teachers

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
import {ActivityMonitorContext} from "./ActivityMonitorContext";
import StudentExitTicket from "../ActivityRun/StudentExitTicket";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, response) {
  return { name, response };
}

const rows = [
  createData('Student_1', 'Yes'),
  createData('Student_2', 'Need help'),
  createData('Student_3', 'I am confused about topic 2'),
];

export default function ExitTicketMonitor({quiz}) {
  const classes = useStyles();

    const {monitor, setMonitor, quizSocket, setQuizSocket} = useContext(ActivityMonitorContext);
      const [display, setDisplay] = useState(true);

  useEffect(()=>{
          listen();
      }, []);

  const listen=()=>{
      quizSocket.on('exit ticket submission from student', (sessionId,userId)=>{
      })
 };
  const close = () => {
        setDisplay(false);

  };

//student name and response

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
         <Fade in= {display}>

          <TableContainer component={Paper}>
          <h1>
             {quiz.quizName}
          </h1>
          {quiz.quizQuestions.map((question)=>{
            return <div>
                <h2> {question.prompt} </h2>
             </div>
          })}
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> Student Name </TableCell>
                <TableCell align="right">Response</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Fade>
        </Modal>
    </div>

  );
}