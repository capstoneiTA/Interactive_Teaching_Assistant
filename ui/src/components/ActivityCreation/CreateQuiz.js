import React, {createContext, useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreateQuizQuestion from "./CreateQuizQuestion";
import TextField from "@material-ui/core/TextField";
import {QuizContext, QuizContextProvider} from "./QuizContext";
import UserContext from "../Dashboard";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({

}));

let apiGatewayUrl = '';
if(process.env.REACT_APP_DEPLOY === "False"){
    apiGatewayUrl = `http://localhost:8080`;
}else{
    apiGatewayUrl = `${process.env.REACT_APP_EC2HOST}:8080`;
}

const CreateQuiz=({user})=>{
    const classes = useStyles();
    const [questions, setQuestions] = useState([<CreateQuizQuestion />]);
    const {quizInfo, setQuizInfo} = useContext(QuizContext);

    const addQuizQuestion=()=>{
        let currentQuestions = [...questions];
        currentQuestions.push(<CreateQuizQuestion />);
        setQuestions(currentQuestions);
    };

    const createQuiz = () => {
        //combine options with corrects
        let newQuizInfo = {...quizInfo};
        let newQuizQuestions = [...newQuizInfo.quizQuestions];
        for(let question of newQuizQuestions){
            for(let i = 0; i < question.options.length; i ++){
                question.options[i] = {optionText: question.options[i], isCorrect: question.corrects[i]};
            }
            delete question.corrects;
        }
        newQuizInfo.quizQuestions = newQuizQuestions;
        setQuizInfo(newQuizInfo);
        axios.post(apiGatewayUrl + '/quiz/create', {userId: user.User_ID, quiz:newQuizInfo, quizType: 'Multiple Choice'}).then(function (res) {
                console.log('Response to Quiz Create: ' + res.data.questionsCreate);
        })
    };

    const handleChange = (e)=>{
        let newQuizInfo = {...quizInfo};
        newQuizInfo.quizName = e.target.value;
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