import React, { useState } from 'react';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import InputAdornment from "@material-ui/core/InputAdornment";

let apiUrl = '';
if(process.env.REACT_APP_DEPLOY === "False"){
    apiUrl = `http://localhost:8080`;
}else{
    apiUrl = `${process.env.REACT_APP_EC2HOST}:8080`;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '150ch',
        },
    },
    iconButton: {
        padding: 5,
    },
}));

const SessionConnect = ({CreatedBy}) => {
    const [sessionName, setSessionName] = useState('');
    const [response, setResponse] = useState({message: ''});

    const handleChange = (e) =>{
        setSessionName( e.target.value );
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('body to be posted to session/create:','SessionName:', sessionName, 'CreatedBy: ', CreatedBy);


        axios.post(apiUrl + '/session/create', {sessionName, CreatedBy})
        .then(res=>{
          console.log(res);
          console.log(res.data);
          if (res.data.dbAdd === true){
            setResponse({message: 'New session: ' + sessionName + ' created'});
          }else if(res.data.verified === false){
              setResponse({message: 'Error: Only user type teacher may create a Session'});
          }else{
              setResponse({message: 'Session: ' + sessionName + ' already exists, creation failed'});
          }
          
        }).catch(error => {
            console.log('ERROR in SessionConnect: ', error)
        })
    };

    const classes = useStyles();

    return (
        <div>
            {/*<form className={classes.root} role="form" onSubmit={handleSubmit}>*/}
            <form onSubmit={handleSubmit}>
                {/*<label>Create Session: </label>*/}
                {/*<div className="row">*/}
                    {/*<div className="form-group col-4">*/}
                        <TextField
                            // label="New Session Name"
                            label="Create New Session"
                            variant="outlined"
                            onChange={handleChange}
                            size="small"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton type="submit" className={classes.iconButton} aria-label="Create">
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </InputAdornment>,
                            }}

                        />
                    {/*</div>*/}
                {/*</div>*/}
            </form>

            <div>
                {response.message}
            </div>
        </div>
    )
};
export default SessionConnect;