import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
        console.log('signedIn');
        console.log(this.state);
        //redirect to dashboard
        this.props.history.push('/dashboard');
    }

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