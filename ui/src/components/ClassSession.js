import React, { Component } from 'react';
import TeacherUnderstandingMeter from "./uMeter_UI_Teacher";
import StudentUnderstandingMeter from "./uMeter_UI_Student";
import TeacherClassSessionMenu from "./TeacherClassSessionMenu";
import QuizAccordionList from "./ActivityInit/QuizAcordionList";
import TicketList from "./ActivityInit/TicketList";
import Chat from './Messaging/Chat'
import {ChatContextProvider} from "./Messaging/ChatContext";
import axios from 'axios';
import StudentActivityContainer from "./ActivityRun/StudentActivityContainer";
import StudentExitActivity from "./ActivityRun/StudentExitActivity";

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
                    <ChatContextProvider><Chat user={this.user} sessionName = {this.sessionName} sessionId = {this.sessionId}/></ChatContextProvider>
                     <StudentExitActivity user={this.user} sessionName={this.sessionName} sessionId={this.sessionId}/>
                    <StudentActivityContainer user={this.user} sessionName={this.sessionName} sessionId={this.sessionId}/>
                </div>

            )

        }else{
            return (
                <div>
                    <h1>Class Session</h1>
                    <TeacherClassSessionMenu item1={<TeacherUnderstandingMeter user={this.user} sessionName = {this.sessionName} sessionId = {this.sessionId}/>} item2={<QuizAccordionList sessionName = {this.sessionName} user={this.user} />} item3={<TicketList sessionName = {this.sessionName} user={this.user} />} />
                    <ChatContextProvider><Chat user={this.user} sessionName = {this.sessionName} sessionId = {this.sessionId}/></ChatContextProvider>
                </div>
            )
        }

    }
}

export default ClassSession;