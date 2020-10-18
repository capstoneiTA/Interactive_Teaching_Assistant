//general
import React, {Component} from 'react';
import axios from 'axios';

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:7000/";

const apiGatewayUrl = `http://localhost:8080`;

class StudentUnderstandingMeter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 5
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

        this.socket.on('test', (msg)=>{
                console.log(msg);
            }
        )

    };

    handleChange =(value)=> {
        this.setState({value});

        //Send the new data value to db
        axios.post(apiGatewayUrl + '/uMeter/update', {uValue: value, sessionId: this.sessionId, userId: this.user.User_ID, timeStamp: 1}).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });

        //emit for server the info to be passed to teacher
        this.socket.emit('understanding meter update', {userId: this.user.User_ID, /*teacherSocketIds: null,*/ newValue: value});
    };

    render() {
        return (
            <div style={{ margin: 50 }}>
                <h2>Session: {this.sessionName} </h2>
                <h2>Session ID: {this.sessionId} </h2>
                <p>{this.state.value}</p>
                <p>{this.user.firstName} {this.user.lastName}</p>
                <Slider
                    min={1}
                    max={5}
                    value={this.state.value}
                    onChange={this.handleChange}
                    railStyle={{
                        height: 2,
                    }}
                    handleStyle={{
                        height: 28,
                        width: 28,
                        marginLeft: -14,
                        marginTop: -14,
                        backgroundColor: "red",
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