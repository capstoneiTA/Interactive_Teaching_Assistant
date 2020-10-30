import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import TextField from '@material-ui/core/TextField';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
        this.apiGatewayUrl = '';
        if(process.env.REACT_APP_DEPLOY === "False"){
            this.apiGatewayUrl = 'http://localhost:8080';
        }else{
            this.apiGatewayUrl = `${process.env.REACT_APP_EC2HOST}:8080`;
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    emailHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let that = this;

        //post request
        axios.post(this.apiGatewayUrl + '/login', {email: this.state.email , password: this.state.password}).then(function (res) {

            console.log('res data: ', res.data);

            if(res.data.success === true){
                //redirect to dashboard
                that.props.history.push({
                        pathname: '/dashboard',
                        state: {user: res.data.user}
                    }
                    );
            } else {
                const errorMsg = document.getElementById('errorMsg');
                const error = 'Login Failed';
                errorMsg.innerHTML = error;
            }
        });


    };

    render() {
        return (
            <div style={containerStyle}>
                <IconButton component={Link}
                            to={'/launch/opt'}
                            style={backButtonStyle}>
                    <KeyboardBackspaceIcon/>
                </IconButton>
                <form onSubmit={this.handleSubmit} >
                    <TextField
                        id='standard-basic'
                        label='Email'
                        type='email'
                        required
                        InputLabelProps={{required: false}}
                        onChange={this.emailHandler}
                        style={textInputStyle}
                    />
                    <br/>
                    <TextField
                        id='standard-basic'
                        label='Password'
                        type='password'
                        required
                        InputLabelProps={{required: false}}
                        onChange={this.passwordHandler}
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

