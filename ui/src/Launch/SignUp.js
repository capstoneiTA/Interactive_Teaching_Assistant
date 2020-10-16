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
        console.log('registered');
        console.log(this.state);

        axios.post(this.apiGatewayUrl + '/signup', {email: this.state.email , password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, type: this.state.type}).then(function (res) {
            console.log(res.data.dbAdd);
            console.log(res.data);
        });
        //redirect to dashboard
        this.props.history.push('/dashboard');
    };


    render() {
        return (
            <div>
                <Link to='/launch/opt'>Back</Link>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                        <input type='text'
                               value={this.state.firstName}
                               onChange={this.firstNameHandler}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input type='text'
                               value={this.state.lastName}
                               onChange={this.lastNameHandler}
                        />
                    </label>
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
                    <label>
                        Type:
                        <select onChange={this.typeHandler}>
                                defaultValue='Select'>
                            <option defaultValue>Select</option>
                            <option value='Teacher'>Teacher</option>
                            <option value='Student'>Student</option>
                        </select>
                    </label>
                    <input type='submit' value='Sign Up'/>
                    {/*<Link to='/dashboard'>Sign Up</Link>*/}
                </form>
            </div>
        );
    }
}

export default SignUp;