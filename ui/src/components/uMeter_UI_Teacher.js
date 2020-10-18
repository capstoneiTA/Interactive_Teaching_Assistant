//General
import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:7000/";

class TeacherUnderstandingMeter extends Component {
    constructor(props) {
        super(props);
        //basic info
        this.user = this.props.user;
        this.sessionName = this.props.sessionName;
        this.sessionId = this.props.sessionId;
        //the "score"
        this.state = { currValue: 5 };
        this.socket = socketIOClient(ENDPOINT + this.props.sessionName);
        //this.sockId = 'empty';
        this.socketListen()
    }

    // componentDidMount() {
    //     this.socketListen();
    // }

    socketListen=()=>{
        this.socket.on('update from server', (userId, newValue) => {
            console.log('RECEIVED UPDATE ' + newValue);
            this.setNewVal(newValue);
        });
    };
    //call when new value is passed from server through socket
    setNewVal = value => {
        this.setState(value);
    };

    render() {
        return (
            <div>
                <h2>Session: {this.sessionName} </h2>
                <h2>Session ID: {this.sessionId} </h2>


                <ProgressBar min={1} max={5} now={this.state.currValue} />
            </div>
        );
    }
}

export default TeacherUnderstandingMeter;