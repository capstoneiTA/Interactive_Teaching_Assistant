import React, { Component } from 'react';
import SessionConnect from './components/SessionConnect';
import SessionJoin from './components/SessionJoin';
import SessionEnrollment from './components/SessionEnrollment';


class Dashboard extends Component {
    render() {
        return (
            <div>
                Youve made it to the dashboard.
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