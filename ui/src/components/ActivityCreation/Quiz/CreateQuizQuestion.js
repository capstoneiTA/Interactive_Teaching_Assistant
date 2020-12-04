import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {QuizContext} from "./QuizContext";

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

export default function CreateQuizQuestion() {
    const classes = useStyles();
    const [prompt, setPrompt] = useState('');
    const [options, setOptions] = useState(['','','','']);
    const [corrects, setCorrects] = useState([false, false, false, false]);
    const [quizIndex, setQuizIndex] = useState(null);
    const {quizInfo, setQuizInfo} = useContext(QuizContext);

    const updateOptions =(index, value)=>{
        let newOptions = {...options};
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const setQuestionIndex=()=>{
        //Set the index for future use
        setQuizIndex(quizInfo.quizQuestions.length);

        //Add empty object for use to create quiz question
        let newQuizInfo = {...quizInfo};
        let newQuizInfoQuestions = [...newQuizInfo.quizQuestions];
        newQuizInfoQuestions.push({prompt: prompt, options: options, corrects: corrects});
        newQuizInfo.quizQuestions = newQuizInfoQuestions;
        setQuizInfo(newQuizInfo);
    };


    //Set the index and the blank question info on component render
    useEffect(() => {
        if(quizIndex === null){
            setQuestionIndex();
        }
    });


    const handlePromptChange=(e)=>{
        //set prompt state
        setPrompt(e.target.value);

        let newQuizInfo = {...quizInfo};
        let newQuizInfoQuestions = [...newQuizInfo.quizQuestions];
        newQuizInfoQuestions[quizIndex]['prompt'] = e.target.value;
        newQuizInfo.quizQuestions = newQuizInfoQuestions;
        setQuizInfo(newQuizInfo);
    };

    const handleOptionChange=(e)=>{
        let index = parseInt(e.target.name);
        //set option 1 state
        let newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);

        //set global quizInfo state
        let newQuizInfo = {...quizInfo};
        let newQuizInfoQuestions = [...newQuizInfo.quizQuestions];
        newQuizInfoQuestions[quizIndex]['options'] = newOptions;
        newQuizInfo.quizQuestions = newQuizInfoQuestions;
        setQuizInfo(newQuizInfo);
    };

    const handleCheckBoxChange=(e)=>{
        let index = parseInt(e.target.name);
        //set option 1 state
        let newCorrects = [...corrects];
        newCorrects[index] = e.target.checked;
        setCorrects(newCorrects);

        //set global quizInfo state
        let newQuizInfo = {...quizInfo};
        let newQuizInfoQuestions = [...newQuizInfo.quizQuestions];
        newQuizInfoQuestions[quizIndex]['corrects'] = newCorrects;
        newQuizInfo.quizQuestions = newQuizInfoQuestions;
        setQuizInfo(newQuizInfo);
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
            <FormControlLabel
                value="correct?"
                control={<Checkbox color="primary" />}
                label="correct?"
                labelPlacement="right"
                name="0"
                onChange={handleCheckBoxChange}
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
            <FormControlLabel
                value="correct?"
                control={<Checkbox color="primary" />}
                label="correct?"
                labelPlacement="right"
                name="1"
                onChange={handleCheckBoxChange}
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
            <FormControlLabel
                value="correct?"
                control={<Checkbox color="primary" />}
                label="correct?"
                labelPlacement="right"
                name="2"
                onChange={handleCheckBoxChange}
            />
            <TextField
                label="Option 4"
                id="margin-none"
                onInput={ e=>updateOptions(3,e.target.value)}
                fullWidth
                className={classes.option}
                onChange={handleOptionChange}
                name='3'
            />
            <FormControlLabel
                value="correct?"
                control={<Checkbox color="primary" />}
                label="correct?"
                labelPlacement="right"
                name="3"
                onChange={handleCheckBoxChange}
            />
        </div>
    );
}