import React, { Component } from 'react';
import SessionConnect from './components/SessionConnect';
import SessionJoin from './components/SessionJoin';
import UserInfo from './components/UserInfo';
import SessionEnrollment from './components/SessionEnrollment';


class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
          
                <h1>Dashboard</h1>
          
                <UserInfo user={this.props.location.state.user}/>
          
                <div style={{padding: "10px"}}>
                    <SessionConnect CreatedBy="1" />
                </div>
                <div style={{padding: "10px"}}>
                    <SessionJoin userId="1" />
                </div>
                <div style={{padding: "10px"}}>
                    <SessionEnrollment userId="1"/>
                </div>
            </div>
        )
    }
}

export default Dashboard;