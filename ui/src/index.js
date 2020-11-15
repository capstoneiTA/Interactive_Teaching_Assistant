import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from "./components/Launch/AuthContext";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LaunchScreen from "./components/Launch/LaunchScreen";
import Dashboard from "./components/Dashboard";
import ClassSession from "./components/SessionComps/ClassSession";

ReactDOM.render(
  <React.StrictMode>
      <AuthContextProvider>
          <Router>
              <Switch>
                  <Redirect exact from='/' to='/launch'/>
                  <Route path='/launch' component={LaunchScreen} />
                  <Route path='/dashboard' component={Dashboard} />
                  <Route path='/classSession' component={ClassSession} />
              </Switch>
          </Router>
      </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
