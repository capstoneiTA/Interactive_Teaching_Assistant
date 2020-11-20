//General
import React, {Component, useContext, useEffect, useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ProgressBar from 'react-bootstrap/ProgressBar';

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
    progressBar: {
        margin: theme.spacing(0, 0, 1, 0),
    },
    option: {
        margin: 0,
    },
    paper: {
        padding: '5px',
        margin: '5px',
    }
}));


export default function StudentPollQuestion({question, index}) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [now, setNow] = React.useState(0);


    return(
        <div>
            <Paper elevation={2} className={classes.paper}>
                <h3>{index+1}: {question.prompt}</h3>
                {question.options.map((option)=>{
                    return <div>
                        <p className={classes.option}>{option.optionText}</p>
                        <ProgressBar variant="success" className={classes.progressBar} min={0} max={100} now={option.value} label={`${option.value}%`} />
                    </div>

                })}
            </Paper>
        </div>
    )
}