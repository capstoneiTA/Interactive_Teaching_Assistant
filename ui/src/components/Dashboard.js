import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import SessionConnect from './SessionConnect';
import SessionJoin from './SessionJoin';
import UserInfo from './UserInfo';
import SessionEnrollment from './SessionEnrollment';
import exitTicket from './exitTicket';
import ActivityCreate from "./ActivityCreation/ActivityCreate";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.state !==undefined){
            this.user = this.props.location.state.user;
        }else{
            this.user = '';
        }
    }
    render() {
        if (this.user.type === 'Teacher') {
            return (
                <div>
                    <div style={{padding: "10px"}}>
                        <h1>Dashboard</h1>
                        <hr />
                    </div>

                    <div style={{padding: "10px"}}>
                        <UserInfo user={this.user}/>
                    </div>

                    <div style={{padding: "10px"}}>
                        <SessionConnect CreatedBy={this.user.User_ID} />
                    </div>
                    <div style={{padding: "10px"}}>
                        <SessionJoin userId={this.user.User_ID} />
                    </div>
                    <div style={{padding: "10px"}}>
                        <SessionEnrollment userId={this.user.User_ID}/>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div style={{padding: "10px"}}>
                        <h1>Dashboard</h1>
                        <hr />
                    </div>

                    <div style={{padding: "10px"}}>
                        <UserInfo user={this.user}/>
                    </div>

                    <div style={{padding: "10px"}}>
                        <SessionJoin userId={this.user.User_ID} />
                    </div>
                    <div style={{padding: "10px"}}>
                        <SessionEnrollment userId={this.user.User_ID}/>
                    </div>
                </div>
                <div style={{padding: "10px"}}>
                    <ActivityCreate />
                </div>
            </div>
        )
    }
}

export default Dashboard;