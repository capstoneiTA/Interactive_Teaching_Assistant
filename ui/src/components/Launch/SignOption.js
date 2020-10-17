import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignOption extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={linkDivStyle}>
                <div style={linkStyle}>
                    <Link to='/launch/signin'>Sign In</Link>
                </div>
                <br/>
                <div style={linkStyle}>
                    <Link to='/launch/signup'>Sign Up</Link>
                </div>

            </div>
        );
    }
}

const linkDivStyle = {
    marginTop: '50px'
};

const linkStyle = {
    textAlign: 'center',
    width: '60px',
    margin: 'auto',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: 'lightgray'
};

export default SignOption;