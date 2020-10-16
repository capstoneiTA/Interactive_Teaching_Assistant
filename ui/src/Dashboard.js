import React, { Component } from 'react';
import SessionConnect from './components/SessionConnect';
import SessionJoin from './components/SessionJoin';


class Dashboard extends Component {
    render() {
        return (
            <div>
                Youve made it to the dashboard.
                <SessionConnect CreatedBy="1" />
                <SessionJoin userId="1" />
            </div>
        )
    }
}

export default Dashboard;