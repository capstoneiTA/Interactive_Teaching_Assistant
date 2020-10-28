import React, { Component } from 'react';
import TeacherUnderstandingMeter from "./uMeter_UI_Teacher";
import StudentUnderstandingMeter from "./uMeter_UI_Student";
import TeacherClassSessionMenu from "./TeacherClassSessionMenu";
import QuizAccordionList from "./ActivityInit/QuizAcordionList";
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
        this.quizExample = {quizName: 'My First Quiz', quizQuestions: [
                {prompt: 'What color is the sky?', options: ['Blue', 'Green', 'Red', 'Purple'], corrects: [true, false, false, false]},
                {prompt: 'What color is grass?', options: ['Blue', 'Green', 'Red', 'Purple'], corrects: [false, true, false, false]},
                {prompt: 'What color is dirt?', options: ['Blue', 'Brown', 'Red', 'Purple'], corrects: [false, true, false, false]},
                {prompt: 'How many states are in the USA?', options: ['50', '10000', '3', '19'], corrects: [true, false, false, false]},
            ]
        };

        this.quizzes = [this.quizExample, this.quizExample, this.quizExample, this.quizExample];
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
                    <TeacherClassSessionMenu item1={<TeacherUnderstandingMeter user={this.user} sessionName = {this.sessionName} sessionId = {this.sessionId}/>} item2={<QuizAccordionList quizzes={this.quizzes} />}/>
                    <Chat user={this.user} sessionName = {this.sessionName} sessionId = {this.sessionId}/>
                </div>
            )
        }

    }
}

export default ClassSession;