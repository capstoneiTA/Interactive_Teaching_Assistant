import React, {Component, useState} from 'react';
import { Button } from '@material-ui/core';
import PageHeader from "./Header/PageHeader";
import SessionConnect from './SessionComps/SessionConnect';
import SessionJoin from './SessionComps/SessionJoin';
import UserInfo from './UserInfo';
import SessionEnrollment from './SessionComps/SessionEnrollment';
import exitTicket from './ActivityCreation/ExitTicket/ExitTicketCreation';
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
                    <PageHeader user={this.user} sessionName={null} designation="TEACHER DASHBOARD" history={this.props.history}/>
                    <div style={pageContainer}>
                        <div style={teacherSessionsContainer}>

                            <div style={activityCreationContainer}>
                                <ActivityCreate user={this.user} />
                            </div>

                            <div style={teacherSessionsHeader}>
                                Sessions
                            </div>
                            <hr style={hrStyle}/>
                            <div>
                                <SessionEnrollment userId={this.user.User_ID}/>
                            </div>
                            <div style={sessionConnectJoinStyle}>
                                <SessionConnect CreatedBy={this.user.User_ID}/>
                                <SessionJoin userId={this.user.User_ID}/>
                            </div>
                        </div>


                    </div>



                    {/*<div style={{padding: "10px"}}>*/}
                    {/*    <UserInfo user={this.user}/>*/}
                    {/*</div>*/}

                </div>
            )
        } else {
            return (
                <div>
                    <PageHeader user={this.user} sessionName={null} designation="STUDENT DASHBOARD" history={this.props.history}/>

                    {/*<div style={{padding: "10px"}}>*/}
                    {/*    <UserInfo user={this.user}/>*/}
                    {/*</div>*/}

                    <div style={studentSessionsContainer}>
                        <div style={studentSessionsHeader}>
                            Sessions
                        </div>
                        <hr style={hrStyle}/>
                        <div>
                            <SessionEnrollment userId={this.user.User_ID}/>
                        </div>
                        <div style={sessionJoinStyle}>
                            <SessionJoin userId={this.user.User_ID}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const pageContainer = {
    display: 'flex',
    flexDirection: 'column',
}

const teacherSessionsContainer = {
    width: '800px',
    margin: 'auto',
    marginTop: '150px',
    textAlign: 'center',
}

const teacherSessionsHeader = {
    fontSize: '40px',
    color: '#555',
}

const activityCreationContainer = {
    // backgroundColor: '#eee',
    width: '800px',
    margin: '50px auto',
    marginTop: '-50px',
    textAlign: 'left',

    // paddingTop: '0px',
}

const sessionConnectJoinStyle = {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-around',
}

const studentSessionsContainer = {
    // backgroundColor: '#eee',
    width: '800px',
    margin: 'auto',
    marginTop: '150px',
    textAlign: 'center',
}

const studentSessionsHeader = {
    fontSize: '40px',
    color: '#555',
}

const sessionJoinStyle = {
    marginTop: '30px',
}

const hrStyle = {
    marginBottom: '50px',
    borderTop: '2px solid lightgray',
}

export default Dashboard;