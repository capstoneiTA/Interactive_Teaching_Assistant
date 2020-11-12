import React, { Component, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import TextField from '@material-ui/core/TextField';


const SignIn = (props) => {
    const {user, setUser, setIsLoggedIn} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const apiGatewayUrl = 'http://localhost:8080';

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('email: ', email, 'password: ', password);

        //post request
        axios.post(apiGatewayUrl + '/login', {email: email , password}).then(function (res) {

            console.log('res data: ', res.data);

            if(res.data.success === true){
                //save user to AuthContext
                setUser(res.data.user);
                setIsLoggedIn(true);
                // redirect to dashboard
                props.history.push({
                    pathname: '/dashboard',
                    state: {user: res.data.user}
                });

            } else {
                const errorMsg = document.getElementById('errorMsg');
                const error = 'Login Failed';
                errorMsg.innerHTML = error;
            }
        });

    }

    return (
        <div style={containerStyle}>
            <IconButton component={Link}
                        to={'/launch/opt'}
                        style={backButtonStyle}>
                <KeyboardBackspaceIcon/>
            </IconButton>
            <form onSubmit={handleSubmit} >
                <TextField
                    id='standard-basic'
                    label='Email'
                    type='email'
                    required
                    InputLabelProps={{required: false}}
                    onChange={emailHandler}
                    style={textInputStyle}
                />
                <br/>
                <TextField
                    id='standard-basic'
                    label='Password'
                    type='password'
                    required
                    InputLabelProps={{required: false}}
                    onChange={passwordHandler}
                    style={textInputStyle}
                />
                <br/>
                <Button
                    variant='contained'
                    type='submit'
                    value='Sign In'
                    style={signInButtonStyle}
                >
                    Sign In
                </Button>
                <br/>
                <div id='errorMsg' style={errorMsgStyle}></div>
            </form>
        </div>
    );
}

const containerStyle = {
    marginTop: '50px',
    width: 'max-content',
    margin: 'auto',
    textAlign: 'center',
}

const backButtonStyle = {
    marginLeft: '-15px',
    marginBottom: '5px',
    transform: 'translateX(-65px)',
}

const signInButtonStyle = {
    marginTop: '20px',
    marginBottom: '30px',
    textAlign: 'center',
}

const textInputStyle = {
    marginBottom: '30px',
}

const errorMsgStyle = {
    color: 'red',
    textAlign: 'center',
}

export default SignIn;


