//general
import React, {Component} from 'react';
import axios from 'axios';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import socketIOClient from "socket.io-client";

let ENDPOINT = '';
let apiGatewayUrl = '';
if(process.env.REACT_APP_DEPLOY === "False"){
    ENDPOINT = "http://localhost:7000/";
    apiGatewayUrl = `http://localhost:8080`;
}else{
    ENDPOINT = `${process.env.REACT_APP_EC2HOST}:7000/`;
    apiGatewayUrl = `${process.env.REACT_APP_EC2HOST}:8080`;
}

class StudentUnderstandingMeter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            teachers: [],
            students: []
        };
        this.user = this.props.user;
        this.sessionName = this.props.sessionName;
        this.sessionId = this.props.sessionId;
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

    listen =()=>{
        this.socket.emit('session init', this.user.firstName, this.user.lastName, this.user.type, this.user.User_ID, this.sockId);

        //update list of teachers
        this.socket.on('teacherList', teacherList =>{
            this.setState({teachers: teacherList});
        });

        //update list of students
        this.socket.on('studentList', studentList =>{
            this.setState({students: studentList});
        });

        this.socket.on('teacher server get understanding meter values', teacherSockId=>{
            this.socket.emit('single understanding meter update', this.user.User_ID, teacherSockId, this.state.value);
        })


    };


    handleChange =(value)=> {
        this.setState({value:value});

        //Send the new data value to db
        axios.post(apiGatewayUrl + '/uMeter/update', {uValue: value, sessionId: this.sessionId, userId: this.user.User_ID, timeStamp: 1}).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });

        let teacherSockIds = [];

        for(let teacher of this.state.teachers){
            teacherSockIds.push(teacher.sockId);
        }
        //send socket.io update
        this.socket.emit('multi understanding meter update', this.user.User_ID, teacherSockIds, value, this.state.students);
    };



    render() {
        return (
            <div style={{ margin: 50 }}>
                {/*<h2>Session: {this.sessionName} </h2>*/}
                {/*<h2>Session ID: {this.sessionId} </h2>*/}
                {/*<p>{this.state.value}</p>*/}
                {/*<p>{this.user.firstName} {this.user.lastName}</p>*/}
                <Slider
                    min={1}
                    max={5}
                    value={this.state.value}
                    onChange={this.handleChange}
                    railStyle={{
                        height: 5,
                        backgroundColor: 'lightgray',
                    }}
                    handleStyle={{
                        height: 25,
                        width: 25,
                        marginTop: -10,
                        backgroundColor: "#A4C3E3",
                        border: 0
                    }}
                    trackStyle={{
                        background: "none"
                    }}
                />
            </div>

        )
    }
}


export default StudentUnderstandingMeter;