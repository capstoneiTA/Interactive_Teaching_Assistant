import React, { Component } from 'react';
import TeacherUnderstandingMeter from "./components/uMeter_UI_Teacher";
import StudentUnderstandingMeter from "./components/uMeter_UI_Student";


class ClassSession extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.state !==undefined){
            this.userId = this.props.location.state.userId;
        }else{
            this.userId = '';
        }
    }
    render() {
        return (
            <div>
                <h1>Class Session</h1>
                <StudentUnderstandingMeter userId = {this.state.userId}/>
                <TeacherUnderstandingMeter userId = {this.state.userId}/>
            </div>
        )
    }
}

export default ClassSession;