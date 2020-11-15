import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {PollContext} from "./PollContext";

const {useEffect} = require("react");

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginBottom: '40px',
    },
    prompt: {
        display: 'block',
        width: '75%',
    },
    option: {
        display: 'inline-block',
        width: '65%',
    },
    check: {
        display: 'inline-block',

    }
}));

export default function CreatePollQuestion() {
    const classes = useStyles();
    const [prompt, setPrompt] = useState('');
    const [options, setOptions] = useState(['','','','']);
    const [pollIndex, setPollIndex] = useState(null);
    const {pollInfo, setPollInfo} = useContext(PollContext);

    const updateOptions =(index, value)=>{
        let newOptions = {...options};
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const setQuestionIndex=()=>{
        //Set the index for future use
        setPollIndex(pollInfo.pollQuestions.length);

        //Add empty object for use to create poll question
        let newPollInfo = {...pollInfo};
        let newPollInfoQuestions = [...newPollInfo.pollQuestions];
        newPollInfoQuestions.push({prompt: prompt, options: options});
        newPollInfo.pollQuestions = newPollInfoQuestions;
        setPollInfo(newPollInfo);
    };


    //Set the index and the blank question info on component render
    useEffect(() => {
        if(pollIndex === null){
            setQuestionIndex();
        }
    });


    const handlePromptChange=(e)=>{
        //set prompt state
        setPrompt(e.target.value);

        let newPollInfo = {...pollInfo};
        let newPollInfoQuestions = [...newPollInfo.pollQuestions];
        newPollInfoQuestions[pollIndex]['prompt'] = e.target.value;
        newPollInfo.pollQuestions = newPollInfoQuestions;
        setPollInfo(newPollInfo);
    };

    const handleOptionChange=(e)=>{
        let index = parseInt(e.target.name);
        //set option 1 state
        let newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);

        //set global pollInfo state
        let newPollInfo = {...pollInfo};
        let newPollInfoQuestions = [...newPollInfo.pollQuestions];
        newPollInfoQuestions[pollIndex]['options'] = newOptions;
        newPollInfo.pollQuestions = newPollInfoQuestions;
        setPollInfo(newPollInfo);
    };

    return (
        <div className={classes.form}>
            <TextField
                id="filled-full-width"
                label="Prompt"
                style={{ margin: 8 }}
                placeholder="Prompt"
                onInput={ e=>setPrompt(e.target.value)}
                fullWidth
                multiline
                rowsMax={2}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
                className={classes.prompt}
                onChange={handlePromptChange}
            />
            <TextField
                label="Option 1"
                id="margin-none"
                onInput={ e=>updateOptions(0,e.target.value)}
                fullWidth
                className={classes.option}
                onChange={handleOptionChange}
                name='0'
            />

            <TextField
                label="Option 2"
                id="margin-none"
                onInput={ e=>updateOptions(1,e.target.value)}
                fullWidth
                className={classes.option}
                onChange={handleOptionChange}
                name='1'
            />

            <TextField
                label="Option 3"
                id="margin-none"
                onInput={ e=>updateOptions(2,e.target.value)}
                fullWidth
                className={classes.option}
                onChange={handleOptionChange}
                name='2'
            />

        </div>
    );
}