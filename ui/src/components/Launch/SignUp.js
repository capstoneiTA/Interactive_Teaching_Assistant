import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            type: '',
        }

        this.apiGatewayUrl = 'http://localhost:8080';

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
                <div style={backLinkStyle}>
                    <Link to='/launch/opt'>&larr;</Link>
                </div>
                <form onSubmit={this.handleSubmit} style={formStyle}>
                    <label>
                        First Name:
                        <input type='text'
                               value={this.state.firstName}
                               required
                               onChange={this.firstNameHandler}
                               style={textInputStyle}
                        />
                    </label>
                    <br/>
                    <label>
                        Last Name:
                        <input type='text'
                               value={this.state.lastName}
                               required
                               onChange={this.lastNameHandler}
                               style={textInputStyle}
                        />
                    </label>
                    <br/>
                    <label>
                        Email:
                        <input type='email'
                               value={this.state.email}
                               required
                               onChange={this.emailHandler}
                               style={textInputStyle}
                        />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type='text'
                               value={this.state.password}
                               required
                               onChange={this.passwordHandler}
                               style={textInputStyle}
                        />
                    </label>
                    <br/>
                    <label>
                        Teacher or Student
                        <select onChange={this.typeHandler} style={textInputStyle}>
                            <option value='Teacher'>Teacher</option>
                            <option value='Student'>Student</option>
                        </select>
                    </label>
                    <br/>
                    <input type='submit' value='Sign Up' style={signUpLinkStyle}/>
                    <br/>
                    <div id='errorMsg' style={errorMsgStyle}></div>
                </form>

            </div>
        );
    }
}

const containerStyle = {
    marginTop: '50px',
}

const backLinkStyle = {
    textAlign: 'center',
    width: '30px',
    margin: 'auto',
    marginBottom: '20px',
    padding: '5px 3px',
    borderRadius: '5px',
    backgroundColor: 'lightgray',
    transform: 'translateX(-120px)'
}

const signUpLinkStyle = {
    marginTop: '20px',
    marginBottom: '30px',
    marginRight: '10px',
}

const formStyle = {
    width: '260px',
    margin: 'auto',
    textAlign: 'right',
    transform: 'translateX(-20px)',
}

const textInputStyle = {
    margin: '10px',
}

const errorMsgStyle = {
    color: 'red',
    textAlign: 'center',
}

export default SignUp;