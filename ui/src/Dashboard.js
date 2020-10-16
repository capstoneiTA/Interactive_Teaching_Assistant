import React, { Component } from 'react';
import SessionConnect from './components/SessionConnect';
import SessionJoin from './components/SessionJoin';
import SessionEnrollment from './components/SessionEnrollment';


class Dashboard extends Component {
    render() {
        return (
            <div>
                Youve made it to the dashboard.
                <SessionConnect userId="1" />
                <SessionJoin userId="1" />
                <SessionEnrollment userId="1"/>
            </div>
        )
    }
}

export default Dashboard;