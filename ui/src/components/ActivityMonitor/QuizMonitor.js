//General
import React, {Component, useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import StudentQuizQuestion from "../ActivityRun/StudentQuizQuestion";
import QuizQuestionMonitor from "./QuizQuestionMonitor";
import {QuizMonitorContext} from "./QuizMonitorContext";
import {ActivityMonitorContext} from "./ActivityMonitorContext";

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

export default function QuizMonitor({quiz}) {
    const {answers, setAnswers} = useContext(QuizMonitorContext);
    const {monitor, setMonitor, quizSocket, setQuizSocket, open, setOpen, activityRunning, setActivityRunning} = useContext(ActivityMonitorContext);
    const classes = useStyles();
    let studentsFinished = [];
    let answersHelper = {};

    useEffect(()=>{
        listen();
    }, []);

    const listen=()=>{
        quizSocket.on('quiz submission from student', (answersInfo, studentId, sessionId)=>{
            if(!studentsFinished.includes(studentId)){
                updateResponses(answersInfo);
                studentsFinished.push(studentId);
            }
        })
    };

    const updateResponses = (answersInfo)=>{
        if(answersInfo.answers === undefined){
            return null;
        }
        let newAnswers = {...answersHelper};
        for(let answer of answersInfo.answers){
            for(let question of newAnswers.quizQuestions){
                if(question.questionId === answer.questionId){
                    for(let option of question.options){
                        if(option.optionId === answer.answerId){
                            option.timesChosen ++;
                            break;
                        }
                    }
                    break;
                }
            }
        }
        adjustPercentages(newAnswers);
        setAnswers(newAnswers);
        answersHelper = newAnswers;
    };

    const adjustPercentages = (newAnswers) =>{
        for(let question of newAnswers.quizQuestions){
            let answerSum = 0;
            //Find the sum of
            for(let option of question.options){
                answerSum += option.timesChosen;
            }
            //Set Percentages
            if(answerSum !== 0 ){
                for(let option of question.options){
                    option.value = (option.timesChosen/answerSum) * 100;
                }
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    const initMonitorValues=()=>{
        let newAnswers = {};
        newAnswers.quizId = quiz.quizId;
        newAnswers.quizQuestions = [];

        for(let question of quiz.quizQuestions){
            let questionObject = {};
            questionObject.questionId = question.questionId;
            questionObject.prompt = question.prompt;
            questionObject.options = [];
            for(let option of question.options){
                let optionObject = {};
                optionObject.optionId = option.optionId;
                optionObject.optionText = option.option;
                optionObject.isCorrect = option.isCorrect;
                optionObject.timesChosen = 0;
                optionObject.value = 0;
                questionObject.options.push(optionObject);
            }
            newAnswers.quizQuestions.push(questionObject);
        }
        setAnswers(newAnswers);
        answersHelper = newAnswers;
    };

    const endQuiz = () => {
        setActivityRunning(false);
        setOpen(false);
        quizSocket.emit('Teacher end quiz from client', answers.quizId);
    };

    useEffect(()=>{
        initMonitorValues();
    }, []);

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
                        <button onClick={endQuiz}>End Quiz</button>
                        {answers.quizQuestions.map((question, index)=>{
                            return <div>
                                <QuizQuestionMonitor question={question} index = {index}/>
                            </div>
                        })}
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}