import React, { Component } from 'react';
import SessionConnect from './SessionConnect';
import SessionJoin from './SessionJoin';
import UserInfo from './UserInfo';
import SessionEnrollment from './SessionEnrollment';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.state !==undefined){
            this.user = this.props.location.state.user;
        }else{
            this.user = '';
        }
    }
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <UserInfo user={this.user}/>
          
                <div style={{padding: "10px"}}>
                    <SessionConnect CreatedBy={this.user.User_ID} />
                </div>
                <div style={{padding: "10px"}}>
                    <SessionJoin userId={this.user.User_ID} />
                </div>
                <div style={{padding: "10px"}}>
                    <SessionEnrollment userId={this.user.User_ID}/>
                </div>
            </div>
        )
    }
}

export default Dashboard;