//General
import React, {Component, useContext, useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {StudentAnswersContext} from "./StudentAnswersContext";

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
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}));


export default function StudentPollQuestion({question, index}) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const {answersInfo, setAnswersInfo} = useContext(StudentAnswersContext);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        let newAnswersInfo = {...answersInfo};
        for(let answer of newAnswersInfo.answers){
            if(answer.questionId === question.questionId){
                answer.answerId = parseInt(event.target.value)
                break;
            }
        }
        setAnswersInfo(newAnswersInfo);
    };

    return(
        <div>
            <Paper elevation={2}>
                <form>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">{index+1}: {question.prompt}</FormLabel>
                        <RadioGroup aria-label="poll" name={"question "+(index+1)} value={value} onChange={handleRadioChange}>
                            {question.options.map((option, index)=>{
                                return <FormControlLabel value={option.optionId.toString()} control={<Radio />} label={option.option}/>
                            })}
                        </RadioGroup>
                    </FormControl>
                </form>
            </Paper>
        </div>
    )
}