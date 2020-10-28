import React, { Component } from 'react';
import TeacherUnderstandingMeter from "./uMeter_UI_Teacher";
import StudentUnderstandingMeter from "./uMeter_UI_Student";
import Chat from './Messaging/Chat'

class ClassSession extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.state !==undefined){
            this.user = this.props.location.state.user;
            console.log(this.user);
            this.sessionName = this.props.location.state.sessionName;
            this.sessionId = this.props.location.state.sessionId;
        }else{
            this.user = '';
            this.sessionName = '';
            this.sessionId = '';
        }
    }
    render() {
        if(this.user.type === 'Student'){
            return (
                <div>
                    <h1>Class Session</h1>
                    <StudentUnderstandingMeter value={5} user={this.user} sessionName = {this.sessionName} sessionId = {this.sessionId}/>
                    <Chat user={this.user} sessionName = {this.sessionName} sessionId = {this.sessionId}/>
                </div>
            )
        }else{
            return (
                <div>
                    <h1>Class Session</h1>
                    <TeacherUnderstandingMeter user={this.user} sessionName = {this.sessionName} sessionId = {this.sessionId}/>
                    <Chat user={this.user} sessionName = {this.sessionName} sessionId = {this.sessionId}/>
                </div>
            )
        }

    }
}

export default ClassSession;