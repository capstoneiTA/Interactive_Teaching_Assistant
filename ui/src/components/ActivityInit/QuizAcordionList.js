import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProgressBar from "react-bootstrap/ProgressBar";
import {generateNewNodeTag} from "react-native-web/dist/vendor/react-native/Animated/NativeAnimatedHelper";
import axios from "axios";
import socketIOClient from "socket.io-client";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    correct: {
        color: 'green',
    },
    incorrect: {
        color: 'red',
    },
    startButton: {
        marginLeft: '20px',
    },

}));

export default function QuizAccordionList({user, sessionName}) {
    const classes = useStyles();
    const [quizList, setQuizList] = useState([]);
    let quizzesInfo = [];
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
    let sockId = 'empty';

    const socketStart=()=>{
        socket.on('connect', () => {
            sockId = socket.id;
        });
    };

    const getQuizzes = ()=>{
        if(user.type === 'Teacher'){
            axios.get(apiGatewayUrl + '/quiz/retrieve', {params: {userId: user.User_ID}}).then(function (res) {
                if(res.data.anyQuizzes){
                    quizzesInfo = res.data.quizzes;
                    generateQuizList(res.data.quizzes);
                }
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
                    <button className={classes.startButton} onClick={startQuiz} name={quizIndex}>Start</button>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {quiz.quizQuestions.map((question)=>{
                            return <div>
                                <h3>{question.prompt}</h3>
                                {question.options.map((option)=>{
                                    if(option.isCorrect){
                                        return <p className={classes.correct}>{option.option}</p>
                                    }else{
                                        return <p className={classes.incorrect}>{option.option}</p>
                                    }
                                })}
                            </div>
                        })}
                    </Typography>
                </AccordionDetails>
            </Accordion>)
        });
        setQuizList(newQuizList);
    };
    let startQuiz = (e)=>{
        let index = parseInt(e.target.name);
        axios.get(apiGatewayUrl + '/quiz/start', {params: {sessionName: sessionName}}).then(function (res) {
            //Send quiz to students
            socket.emit('teacher start quiz', sockId, quizzesInfo[index]);
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