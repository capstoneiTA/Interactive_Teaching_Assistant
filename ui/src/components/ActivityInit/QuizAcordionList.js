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

export default function QuizAccordionList({user}) {
    const classes = useStyles();
    const [quizList, setQuizList] = useState([]);
    const apiGatewayUrl = `http://localhost:8080`;
    let quizzesInfo = [];

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
        quizzes.map((quiz, quizIndex) => {
            let newQuizList = [...quizList];
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
            setQuizList(newQuizList);
        })
    };
    let startQuiz = (e)=>{
        let index = parseInt(e.target.name);
        console.log("starting quiz: " + quizzesInfo[index].quizName);
        console.log(quizzesInfo[index]);
    };

    useEffect(()=>{
        //Generate quiz components on teacher screen
        getQuizzes();
    }, []);

    return (
        <div className={classes.root}>
            {quizList}
        </div>
    );
}