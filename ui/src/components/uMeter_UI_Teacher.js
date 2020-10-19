//General
import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import SimpleUMeter from "./SimpleUMeter";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:7000/";

class TeacherUnderstandingMeter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
            students: [],
            studentMeters: [],
        };
        //basic info
        this.user = this.props.user;
        this.sessionName = this.props.sessionName;
        this.sessionId = this.props.sessionId;

        //Socket info
        this.socket = socketIOClient(ENDPOINT + this.props.sessionName);
        this.sockId = 'empty';
    }


    componentDidMount() {
        this.socketStart();
    }

    socketStart=()=>{
        this.socket.on('connect', () => {
            this.sockId = this.socket.id;
            this.listen();
        });
    };

    listen = () =>{
        this.socket.emit('session init', this.user.firstName, this.user.lastName, this.user.type, this.user.User_ID, this.sockId);

        //update list of teachers
        this.socket.on('teacherList', teacherList =>{
            this.setState({teachers: teacherList});
        });

        //update list of students
        this.socket.on('studentList', studentList =>{
            this.setState({students: studentList}, ()=>{
                this.updateStudentMeterInfo();
                this.socket.emit('teacher client get understanding meter values', this.sockId);
            });
        });

        this.socket.on('update understanding meter', (userId, value)=>{
            this.updateStudentComponentsFromChange(userId, value);
        });
    };

    updateStudentComponentsFromChange=(userId, value)=>{
        //console.log(userId +' update to ' + value + 'students length: ' + this.state.studentMeters.length);
        for(let i = 0; i < this.state.studentMeters.length; i++){
            if(this.state.studentMeters[i]['userId'] === userId){
                let studentMeters = [...this.state.studentMeters];
                let studentMeter = {...studentMeters[i]};
                studentMeter.value = value;
                studentMeters[i] = studentMeter;
                this.setState({studentMeters:studentMeters});
                console.log(this.state.studentMeters[i].userId +' update to ' +this.state.studentMeters[i].value);
            }
        }
    };

    updateStudentMeterInfo=()=>{
        let newStudentMeters=[];
        for(let student of this.state.students){
            newStudentMeters.push({userId: student.userId, value: 5, firstName: student.firstName, lastName: student.lastName});
        }
        this.setState( {studentMeters:newStudentMeters}) ;
    };



    render() {
        return (
            <div>
                <h2>Session: {this.sessionName} </h2>
                <h2>Session ID: {this.sessionId} </h2>
                <h2>Student Meters</h2>

                {this.state.studentMeters.map((meter) => {
                    return <div>
                        <h2>{meter.firstName} {meter.lastName}: </h2>
                        <ProgressBar min={1} max={5} now={meter.value} label={meter.value}/>
                        </div>
                })}
            </div>
        );
    }
}

export default TeacherUnderstandingMeter;

