import React, {Component, useState} from 'react';
import { Button } from '@material-ui/core';
import PageHeader from "./PageHeader";
import SessionConnect from './SessionComps/SessionConnect';
import SessionJoin from './SessionComps/SessionJoin';
import UserInfo from './UserInfo';
import SessionEnrollment from './SessionComps/SessionEnrollment';
import exitTicket from './ActivityCreation/ExitTicketCreation';
import ActivityCreate from "./ActivityCreation/ActivityCreate";
import axios from "axios";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.state !== undefined) {
            this.user = this.props.location.state.user;
        } else {
            this.user = '';
        }
    }

    render() {
        if (this.user.type === 'Teacher') {
            return (
                <div>
                    <div style={{padding: "10px"}}>
                        <h1>Dashboard</h1>
                        <hr/>
                    </div>

                    <div style={{padding: "10px"}}>
                        <UserInfo user={this.user}/>
                    </div>

                    <div style={{padding: "10px"}}>
                        <SessionConnect CreatedBy={this.user.User_ID}/>
                    </div>
                    <div style={{padding: "10px"}}>
                        <SessionJoin userId={this.user.User_ID}/>
                    </div>
                    <div style={{padding: "10px"}}>
                        <ActivityCreate user={this.user} />
                    </div>
                    <div style={{padding: "10px"}}>

                        <SessionEnrollment userId={this.user.User_ID}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <PageHeader text={"Student Dashboard"} history={this.props.history}/>

                    {/*<div style={{padding: "10px"}}>*/}
                    {/*    <h1>Dashboard</h1>*/}
                    {/*    <hr/>*/}
                    {/*</div>*/}

                    {/*<div style={{padding: "10px"}}>*/}
                    {/*    <UserInfo user={this.user}/>*/}
                    {/*</div>*/}

                    <div style={{padding: "10px"}}>
                        <SessionJoin userId={this.user.User_ID}/>
                    </div>
                    <div style={{padding: "10px"}}>
                        <SessionEnrollment userId={this.user.User_ID}/>
                    </div>
                </div>
            )
        }
    }
}

export default Dashboard;