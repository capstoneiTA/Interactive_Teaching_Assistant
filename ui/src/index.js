import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Meters components
import StudentUnderstandingMeter from "./uMeter_UI_Student";
import TeacherUnderstandingMeter from "./uMeter_UI_Teacher";

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './App';
import HelloWorld from './helloWorld';
import LaunchScreen from "./Launch/LaunchScreen";
import Dashboard from "./Dashboard";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Redirect exact from='/' to='/launch'/>
              <Route path='/launch' component={LaunchScreen} />
              <Route path='/dashboard' component={Dashboard} />
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
