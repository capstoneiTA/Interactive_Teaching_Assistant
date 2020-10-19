import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import ClassSession from "./ClassSession";

const apiUrl = `http://localhost:8080`;

class SessionJoin extends Component  {
    constructor(props) {
        super(props);
        this.userId = this.props.userId;

        this.state = {
           sessionName: '',
            message: ''
        };
    }

    handleChange = (e) =>{
        this.setState({sessionName: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let that = this;
        console.log('body to be posted to session/join:','SessionName:', this.state.sessionName, 'userId ', this.userId);

        //join session
        axios.post(apiUrl + '/session/join', {sessionName:this.state.sessionName, userId:this.userId}).then(res=>{
            //Get user information
            axios.get(apiUrl + '/userInfo', {params: {userId: this.userId}}).then(userRes=>{

                //start understanding meter listener
                axios.post(apiUrl + '/uMeter/create', {sessionId: res.data.sessionId, userId: this.userId}).then(function (uMeterRes) {
                    console.log(uMeterRes.data);
                    // routing should go here
                    that.props.history.push({
                            pathname: '/classSession',
                            state: {user: userRes.data.user, sessionName: that.state.sessionName, sessionId: res.data.sessionId}
                        }
                    );
                });



                let response = res.data;
                if (response.sessionExists === true){
                    this.setState({message: 'Added User: '+ this.userId  + ' to Session: ' +  this.state.sessionName})
                } else {
                    this.setState({message: 'There is no session called: ' +  this.state.sessionName})
                }
            });

        }).catch(error => {
            console.log('ERROR in SessionJoin: ', error)
        })



    };

    render(){
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label> join a session by name
                        <input type="text" name="sessionName" onChange={this.handleChange}/>
                    </label>
                    <button type="submit">Join Session</button>
                </form>
                <div>
                    {this.state.message}
                </div>

            </div>
        )
    }
}
export default withRouter(SessionJoin);