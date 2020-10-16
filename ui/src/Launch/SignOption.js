import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignOption extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Link to='/launch/signin'>Sign In</Link>
                <Link to='/launch/signup'>Sign Up</Link>
            </div>
        );
    }
}

export default SignOption;