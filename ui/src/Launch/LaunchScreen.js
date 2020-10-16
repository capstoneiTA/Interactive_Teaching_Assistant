import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignOption from './SignOption.js';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import logo from '../Assets/itaLogo.png';

class LaunchScreen extends Component {

    render() {
        return (
            <React.Fragment>
                <img src={logo} alt='ITA Logo'/>
                <Switch>
                    <Redirect exact from='/launch' to='launch/opt'/>
                    <Route path='/launch/opt' component={SignOption} />
                    <Route path='/launch/signin' component={SignIn} />
                    <Route path='/launch/signup' component={SignUp} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default LaunchScreen;