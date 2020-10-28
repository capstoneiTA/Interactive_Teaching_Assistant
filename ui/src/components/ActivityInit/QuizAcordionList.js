import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProgressBar from "react-bootstrap/ProgressBar";
import {generateNewNodeTag} from "react-native-web/dist/vendor/react-native/Animated/NativeAnimatedHelper";

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

export default function QuizAccordionList({quizzes}) {
    const classes = useStyles();
    const [quizList, setQuizList] = useState([]);

    const generateQuizList=(quizzes)=>{
        quizzes.map((quiz, quizIndex) => {
            quizList.push(<Accordion>
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
                                {question.options.map((option, optionIndex)=>{
                                    if(question.corrects[optionIndex]){
                                        return <p className={classes.correct}>{option}</p>
                                    }else{
                                        return <p className={classes.incorrect}>{option}</p>
                                    }
                                })}
                            </div>
                        })}
                    </Typography>
                </AccordionDetails>
            </Accordion>)
        })
    };
    const startQuiz = (e)=>{
        let index = parseInt(e.target.name);
        console.log(quizzes[index]);
    };

    //Generate quiz components on teacher screen
    generateQuizList(quizzes);




    return (
        <div className={classes.root}>
            {quizList}
        </div>
    );
}