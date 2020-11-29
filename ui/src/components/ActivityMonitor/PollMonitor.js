//General
import React, {Component, useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import StudentPollQuestion from "../ActivityRun/StudentPollQuestion";
import PollQuestionMonitor from "./PollQuestionMonitor";
import {PollMonitorContext} from "./PollMonitorContext";
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

export default function PollMonitor({poll}) {
    const[open, setOpen] = useState(true);
    const {answers, setAnswers} = useContext(PollMonitorContext);
    const {monitor, setMonitor, pollSocket, setPollSocket} = useContext(ActivityMonitorContext);
    const classes = useStyles();
    let studentsFinished = [];
    let answersHelper = {};

    useEffect(()=>{
        listen();
    }, []);

    const listen=()=>{
        pollSocket.on('poll submission from student', (answersInfo, studentId, sessionId)=>{
            if(!studentsFinished.includes(studentId)){
                updateResponses(answersInfo);
                studentsFinished.push(studentId);
            }
        })
    };

    const updateResponses = (answersInfo)=>{
        console.log(answersInfo);
        let newAnswers = {...answersHelper};
        for(let answer of answersInfo.answers){
            for(let question of newAnswers.pollQuestions){
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
        console.log(newAnswers);
        answersHelper = newAnswers;
    };

    const adjustPercentages = (newAnswers) =>{
        for(let question of newAnswers.pollQuestions){
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
        if (window.confirm('Are you sure you want to close the poll viewer? (you cannot go back!!)')) {
            setOpen(false);
        } else {
            // Do nothing!
        }
    };


    const initMonitorValues=()=>{
        let newAnswers = {};
        newAnswers.pollId = poll.pollId;
        newAnswers.pollQuestions = [];

        for(let question of poll.pollQuestions){
            let questionObject = {};
            questionObject.questionId = question.questionId;
            questionObject.prompt = question.prompt;
            questionObject.options = [];
            for(let option of question.options){
                let optionObject = {};
                optionObject.optionId = option.optionId;
                optionObject.optionText = option.option;
                optionObject.timesChosen = 0;
                optionObject.value = 0;
                questionObject.options.push(optionObject);
            }
            newAnswers.pollQuestions.push(questionObject);
        }
        setAnswers(newAnswers);
        answersHelper = newAnswers;
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
                        <h2>Poll Name: {poll.pollName}</h2>
                        {answers.pollQuestions.map((question, index)=>{
                            return <div>
                                <PollQuestionMonitor question={question} index = {index}/>
                            </div>
                        })}
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}