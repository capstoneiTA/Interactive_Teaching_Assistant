import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";
import socketIOClient from "socket.io-client";
import {ActivityMonitorContext} from "../ActivityMonitor/ActivityMonitorContext";
import ExitTicketMonitor from "../ActivityMonitor/ExitTicketMonitor";
import {ExitTicketMonitorContextProvider} from "../ActivityMonitor/ExitTicketMonitorContext";
import {ExitStudentAnswersContext} from "../ActivityRun/ExitStudentAnswersContext";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    Button: {
        marginLeft: '20px',
    },

}));

export default function TicketList({user, sessionName}) {
    const classes = useStyles();
    const [quizList, setQuizList] = useState([]);
    const {monitor, setMonitor} = useContext(ActivityMonitorContext);
    let quizzesInfo = [];
    let quizAnswers = {};
    let apiGatewayUrl = '';
    let ENDPOINT = '';
    if(process.env.REACT_APP_DEPLOY === "False"){
        apiGatewayUrl = `http://localhost:8080`;
        ENDPOINT = "http://localhost:7000/";
    }else{
        apiGatewayUrl = `${process.env.REACT_APP_EC2HOST}:8080`;
        ENDPOINT = `${process.env.REACT_APP_EC2HOST}:7000/`;
    }

    //Socket info
    let socket = socketIOClient(ENDPOINT + sessionName);
    let socket_Id = 'empty';

    const socketStart=()=>{
        socket.on('connect', () => {
            socket_Id = socket.id;
            console.log(socket_Id);
        });
    };

    const getQuizzes = ()=>{
        if(user.type === 'Teacher'){
            axios.get(apiGatewayUrl + '/ExitTicket/question', {params: {userId: user.User_ID}}).then(function (res) {
                console.log(res.data);
                if(res.data.anyQuizzes){
                    quizzesInfo = res.data.quizzes;
                    generateQuizList(res.data.quizzes);
                }
            }).catch(function(error){
                console.log(error);
            })
        }
    };

    const generateQuizList=(quizzes)=>{
        let newQuizList = [...quizList];
        quizzes.map((quiz, quizIndex) => {
            newQuizList.push(<Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>{quiz.quizName}</Typography>
                    <button className={classes.Button} onClick={startExit} name={quizIndex}>Start</button>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {quiz.quizQuestions.map((question)=>{
                            return <div>
                                <h3>{question.prompt}</h3>
                            </div>
                        })}
                    </Typography>
                </AccordionDetails>
            </Accordion>)
        });
        setQuizList(newQuizList);
    };
    let startExit = (e)=>{
        let index = parseInt(e.target.name);
        axios.get(apiGatewayUrl + '/ExitTicket/initiate', {params: {sessionName: sessionName}}).then(function (res) {
            //Send quiz to students
            socket.emit('teacher start exit', socket_Id, quizzesInfo[index]);
            console.log(quizzesInfo[index]);
            //add a functions to gather exit ticket answers
            quizAnswers = quizzesInfo[index];
            setMonitor(
                <ExitTicketMonitorContextProvider>
                    <ExitTicketMonitor quiz={quizzesInfo[index]} />
                </ExitTicketMonitorContextProvider>
            )
        })
    };

   useEffect(()=>{
        //Generate quiz components on teacher screen
        getQuizzes();
        socketStart();
    }, []);

    return (
        <div className={classes.root}>
            {quizList}
        </div>
    );
}