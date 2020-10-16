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
                <SessionConnect CreatedBy="1" />
                <SessionJoin userId="1" />
                <SessionEnrollment userId="1"/>
            </div>
        )
    }
}

export default Dashboard;