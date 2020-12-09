import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            type: 'Student',
        }
        this.apiGatewayUrl = '';
        console.log(process.env);
        if(process.env.REACT_APP_DEPLOY === "False"){
            this.apiGatewayUrl = 'http://localhost:8080';
        }else{
            this.apiGatewayUrl = `${process.env.REACT_APP_EC2HOST}:8080`;
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    firstNameHandler = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }

    lastNameHandler = (e) => {
        this.setState({
            lastName: e.target.value
        })
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

    typeHandler = (e) => {
        this.setState( {
            type: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let that = this;

        axios.post(this.apiGatewayUrl + '/signup', {email: this.state.email , password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, type: this.state.type}).then(function (res) {
            console.log('dbadd: ', res.data.dbAdd);
            console.log('res.data: ', res.data);

            if (res.data.dbAdd === true) {
                //redirect to login
                that.props.history.push('/launch/signin');
            } else {
                const errorMsg = document.getElementById('errorMsg');
                const error = res.data.name + ', ' + res.data.errors[0].message;
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
                        label='First Name'
                        type='text'
                        required
                        InputLabelProps={{required: false}}
                        onChange={this.firstNameHandler}
                        style={textInputStyle}
                    />
                    <br/>
                    <TextField
                        id='standard-basic'
                        label='Last Name'
                        type='text'
                        required
                        InputLabelProps={{required: false}}
                        onChange={this.lastNameHandler}
                        style={textInputStyle}
                    />
                    <br/>
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
                    <InputLabel
                        htmlFor="select"
                    >
                    </InputLabel>
                    <NativeSelect
                        id="select"
                        style={textInputStyle}
                        onChange={this.typeHandler}
                    >
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                    </NativeSelect>
                    <br/>
                    <Button
                        variant='contained'
                        type='submit'
                        value='Sign Up'
                        style={signUpButtonStyle}
                    >
                        Sign Up
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

const signUpButtonStyle = {
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

export default SignUp;