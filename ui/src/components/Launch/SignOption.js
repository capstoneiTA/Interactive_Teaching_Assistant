import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class SignOption extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid
                container
                direction='column'
                alignItems='center'
                style={gridStyle}
            >
                <Button
                    variant='contained'
                    component={Link}
                    to={'/launch/signin'}
                    style={buttonStyle}
                >
                    Sign In
                </Button>
                <Button
                    variant='contained'
                    component={Link}
                    to={'/launch/signup'}
                    style={buttonStyle}
                >
                    Sign Up
                </Button>
            </Grid>
        );
    }
}

const gridStyle = {
    marginTop: '50px'
};

const buttonStyle = {
    width: '95px',
    marginBottom: '30px'
};

export default SignOption;