//General
import React, {Component, useContext, useEffect, useState} from 'react';
import StudentQuizQuestion from "./StudentQuizQuestion";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import {StudentActivityContext} from "./StudentActivityContext";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
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
    button: {
        backgroundColor: '#90CAF9',
        margin: '5px',
    },
}));

export default function StudentQuiz({quiz, socket, user, sessionId, setAnswers}) {
    const {open, setOpen, answersInfo, setAnswersInfo} = useContext(StudentActivityContext);
    const classes = useStyles();

    const initializeAnswers = ()=>{
        let chosenAnswers = {};
        chosenAnswers.quizId = quiz.quizId;
        chosenAnswers.answers = [];
        for(let question of quiz.quizQuestions){
            let answerObject = {};
            answerObject.questionId = question.questionId;
            answerObject.answerId = -1;
            chosenAnswers.answers.push(answerObject);
        }
        setAnswersInfo(chosenAnswers);
    };

    useEffect(()=>{
        initializeAnswers()
    }, []);

    let handleQuizSubmission = () => {
        setOpen(false);
        socket.emit('student submit quiz', answersInfo, user.User_ID, sessionId);
        console.log('Quiz Submitted!');
    }

    useEffect(()=>{
        setAnswers(answersInfo);
    }, [answersInfo]);

    const handleClose = () => {
        //Student chooses to click off of the quiz
        if (window.confirm('Are you sure you want to submit your quiz? (you cannot go back!!)')) {
            handleQuizSubmission();
            setOpen(false);
        } else {
            // Do nothing!
        }
    };

    return(
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2>Quiz Name: {quiz.quizName}</h2>
                        {quiz.quizQuestions.map((question, index)=>{
                            return <div>
                                <StudentQuizQuestion question={question} index = {index}/>
                            </div>
                        })}
                        <Button variant="contained" color="primary" className={classes.button} onClick={handleQuizSubmission}>
                            Submit Quiz
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}