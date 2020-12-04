
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

export default function ExitTicketMonitor({quiz}) {
  const classes = useStyles();
  const {monitor, setMonitor, exitSocket, setExitSocket} = useContext(ActivityMonitorContext);
  const [display, setDisplay] = useState(true);
  const {answers, setAnswers} = useContext(ExitTicketMonitorContext);
  const {submissions, setSubmissions} = useState();

  let studentSubmissions = {studentId: null, studentResponse: null};

    useEffect(()=>{
        listen().then( () => setSubmissions(submissions));
    }, []);

  const listen=()=>{
      exitSocket.on('exit ticket submission from student', (sessionId, studentId, answersInfo)=>{
                // updateResponses(answersInfo);
          // studentAnswers.push(answersInfo);
          // studentsFinished.push(studentId);
          studentSubmissions.studentId = studentId;
          studentSubmissions.studentResponse = answersInfo;
          submissions.push(studentSubmissions);
      })

  };

  let itemToRender;

    if (submissions.size() > 0) {
        itemToRender = submissions.map(Entries => {
            return <div> <h2 className = {classes.h1}> {Entries.studentId} {Entries.studentResponse} </h2> </div>;
        });
    }

  // const updateSubmission = (studentSubmission) => {
  //     submissions.push(studentSubmission);
  //     setAnswers(studentSubmission.studentResponse);
  //
  //     submissions.map((entries) => {
  //         console.log("ID: " + entries.studentId + " Response: " + entries.studentResponse);
  //     });
  //
  // };

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
                closeAfterTransition>
                <Fade in={display}>
                    {/*<TableContainer component={Paper}>*/}
                    {/*    <h1 className = {classes.h1}> {quiz.quizName} </h1>*/}

                    {/*    {quiz.quizQuestions.map((question)=>{*/}
                    {/*        return <div>*/}
                    {/*             <h2 className = {classes.h1}>*/}
                    {/*                 {question.prompt}*/}
                    {/*             </h2>*/}
                    {/*        </div>})*/}
                    {/*    }*/}

                    {/*    <Table className={classes.table} aria-label="simple table">*/}
                    {/*        <TableHead>*/}
                    {/*          <TableRow>*/}
                    {/*            <TableCell>Student</TableCell>*/}
                    {/*            <TableCell align="right">Response</TableCell>*/}
                    {/*          </TableRow>*/}
                    {/*        </TableHead>*/}
                    {/*        */}
                    {/*        */}
                    {/*        <TableBody>*/}
                    {/*            {submissions.map((Entries) => (*/}
                    {/*            <TableRow key={Entries.studentId}>*/}
                    {/*              <TableCell component="th" scope="row">*/}
                    {/*                {Entries.studentId}*/}
                    {/*              </TableCell>*/}
                    {/*              <TableCell align="right">{Entries.studentResponse}</TableCell>*/}
                    {/*            </TableRow>*/}
                    {/*          ))}*/}
                    {/*        </TableBody>*/}

                    {/*   </Table>*/}

                    {/*</TableContainer>*/}

                    <h1 className = {classes.h1}> {quiz.quizName} </h1>

                    {quiz.quizQuestions.map((question)=>{
                        return <div>
                            <h2 className = {classes.h1}>
                                {question.prompt}
                            </h2>
                        </div>})
                    }
                    {itemToRender}
                </Fade>
            </Modal>
        </div>
  )
}