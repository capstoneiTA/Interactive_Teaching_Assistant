    import React, {useState} from 'react';
    import { Button } from '@material-ui/core';
    import { Icon } from '@material-ui/core';
    import { Grid, TextField } from '@material-ui/core';
    import { makeStyles } from '@material-ui/core/styles';
    import { FormControl,InputLabel, Input,FormHelperText } from '@material-ui/core';
    import SaveIcon from '@material-ui/icons/Save';
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

    export default function ExitTicketCreation(props) {
      const [value, setValue] = useState('');
      const [prompt, setPrompt] = useState('');
      const classes = useStyles();

      const handleChange = e => {
      //console.log(e.target.getAttribute('value'));
     setValue(e.target.value);
      }

      const PromptChange = e => {
      //console.log(e.target.getAttribute('value'));
      setPrompt(e.target.value);
      }

     const submitValues = () => {
        const ExitTicketInfo = {
            'Exit Ticket Name': value,
            'Prompt': prompt
        }
        console.log(ExitTicketInfo);
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
              <Icon color="primary">add_circle</Icon>
              <Button className= {classes.root}
               variant= "contained"
               color= "primary"
               size= "small"
               onClick = {submitValues}
                >Submit
              </Button>
          </form>

         </div>
             );

      }