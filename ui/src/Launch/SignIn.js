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
        console.log('signedIn');
        console.log(this.state);
        let that = this;

        //post request
        axios.post(this.apiGatewayUrl + '/login', {email: this.state.email , password: this.state.password}).then(function (res) {
            if(res.data.success === true){
                //redirect to dashboard
                that.props.history.push('/dashboard');
            }else{
                console.log(res.data);
              //something else
            }
        });


    };

    render() {
        return (
            <div>
                <Link to='/launch/opt'>Back</Link>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input type='text'
                               value={this.state.email}
                               onChange={this.emailHandler}
                        />
                    </label>
                    <label>
                        Password:
                        <input type='text'
                               value={this.state.password}
                               onChange={this.passwordHandler}
                        />
                    </label>
                    <input type='submit' value='Sign In'/>
                </form>
            </div>
        );
    }
}

export default SignIn;