
import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl,InputLabel, Input,FormHelperText } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
const useStyles = makeStyles((theme) => ({
  root: {
        marginLeft: '20px',
        display: 'inline',
  },
  h1: {
        textAlign: 'center',
        marginBottom: '40px'
  }


}));


export default function StudentExitTicket(props) {
      const [answer, setAnswer] = useState('');
      const classes = useStyles();
      const submitAnswer = () =>{
      const ExitTicketAnswer = {
            'Answer': answer
        }
           console.log(ExitTicketAnswer);
      }
      const AnswerChange = e => {
            setAnswer(e.target.value);
      }
    return (
         <div className={classes.root}>
            <h1 className= {classes.h1}>
                Exit Ticket
            </h1>
         <form>
            <TextField className = {classes.h1+classes.root}
                id= "standard-basic"
                label= "prompt"
                placeholder= "prompt"
                margin= "normal"
            />
         </form>

         <textarea className= {classes.root}
                id= "answer"
                name= "answer"
                placeholder= "Enter response"
                value= {answer}
                onChange = {AnswerChange}
                rows= "4"
                cols= "50"
         />

              <Button className= {classes.root}
                variant= "contained"
                color= "primary"
                size= "small"
                onClick = {submitAnswer}
                >
                  Submit
                </Button>
             </div>
);

}