import React, {createContext, useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreateQuizQuestion from "./CreateQuizQuestion";
import TextField from "@material-ui/core/TextField";
import {QuizContext, QuizContextProvider} from "./QuizContext";

const useStyles = makeStyles((theme) => ({

}));

const CreateQuiz=()=>{
    const classes = useStyles();
    const [questions, setQuestions] = useState([<CreateQuizQuestion />]);
    const {quizInfo, setQuizInfo} = useContext(QuizContext);

    const addQuizQuestion=()=>{
        let currentQuestions = [...questions];
        currentQuestions.push(<CreateQuizQuestion />);
        setQuestions(currentQuestions);
    };

    const createQuiz = () => {
        console.log(quizInfo);

    };

    const handleChange = (e)=>{
        let newQuizInfo = {...quizInfo};
        newQuizInfo.quizTitle = e.target.value;
        setQuizInfo(newQuizInfo);
    };


    return (
        <div>
            <h2>Quiz Creator</h2>
            <form>
                <TextField
                    id="filled-full-width"
                    label="Quiz Name"
                    style={{ margin: 8 }}
                    placeholder="Quiz Name"
                    helperText="Enter the name of your quiz here!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    onChange={handleChange}
                />
                <h3>Quiz Questions:</h3>
            {questions}
            </form>
            <button onClick={()=>{addQuizQuestion()}}>+</button>
            <button onClick={()=>{createQuiz()}}>
                Create!
            </button>
        </div>
    );
};



export default CreateQuiz;