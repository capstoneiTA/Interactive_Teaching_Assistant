    import React, {useState, useContext, createContext,useForm} from 'react';
    import { Button } from '@material-ui/core';
    import { Icon } from '@material-ui/core';
    import { Grid, TextField } from '@material-ui/core';
    import { makeStyles } from '@material-ui/core/styles';
    import UserContext from "../Dashboard";
    import { FormControl,InputLabel, Input,FormHelperText } from '@material-ui/core';
    import SaveIcon from '@material-ui/icons/Save';
    import axios from "axios";
    import {TicketContext, TicketContextProvider} from "./TicketContext";

    let apiGatewayUrl = '';
    if(process.env.REACT_APP_DEPLOY === "False"){
        apiGatewayUrl= `http://localhost:8080`;
    }else{
       apiGatewayUrl = `${process.env.REACT_APP_EC2HOST}:8080`;
    }

    const useStyles = makeStyles((theme) => ({
      root: {
            marginLeft: '20px',
            display: 'inline',
            marginBottom: '10px',
      },
      h1: {
            textAlign: 'center',
            marginBottom: '40px'
      }

    }));

const ExitTicketCreation=({user})=> {

      const [value, setValue] = useState('');
      const [prompt, setPrompt] = useState('');
      const {quizInfo, setQuizInfo} = useContext(TicketContext);
      const classes = useStyles();

       const handleChange = e => {
       let newQuizInfo = {...quizInfo};
       setValue(e.target.value);
       newQuizInfo.quizName = e.target.value;
       setQuizInfo(newQuizInfo);
      }

      const PromptChange = e => {
      let newQuizInfo = {...quizInfo};
      setPrompt(e.target.value);
      newQuizInfo.prompt = e.target.value;
      setQuizInfo(newQuizInfo);

      }

     const submitValues = (e) => {
        e.preventDefault();
        let newQuizInfo = {...quizInfo};
         console.log('create:','quizName:', value, 'prompt: ', prompt, 'userId:', user.userId);
         axios.post(apiGatewayUrl + '/ExitTicket/create', {userId:user.User_ID, quiz: newQuizInfo,  quizType:'Exit Ticket'})
        .then(function (res) {
           console.log(res.data);
        }, (error)=> {
            console.log(error);
        });
        setValue('');
        setPrompt('');
     }

        return (
            <div className={classes.root}>
             <h1 className= {classes.h1}>
                 Create Exit Ticket
             </h1>
          <form>
             <TextField className = {classes.h1+classes.root}
                 id= "standard-basic"
                 label= "Exit Ticket Name"
                 placeholder= "Exit Ticket Name"
                 margin= "normal"
                 value= {value}
                 onChange= {handleChange}
             />
             <TextField className = {classes.h1+classes.root}
                 id= "standard-basic"
                 label= "prompt"
                 name= "prompt"
                 placeholder= "Prompt"
                 margin= "normal"
                 value= {prompt}
                 onChange= {PromptChange}
             />

              <Button className= {classes.root}
               variant= "contained"
               color= "primary"
               size= "small"
               type= 'submit'
               onClick = {submitValues}
                >Submit
              </Button>
          </form>

         </div>
             );

      }

export default ExitTicketCreation;