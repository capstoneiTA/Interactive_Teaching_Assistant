import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
        this.apiGatewayUrl = 'http://localhost:8080';

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
                const error = 'login failed';
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
                    <input type='submit' value='Sign In' style={signInLinkStyle}/>
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

const signInLinkStyle = {
    marginTop: '20px',
    marginRight: '10px',
}

const formStyle = {
    width: '250px',
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

export default SignIn;