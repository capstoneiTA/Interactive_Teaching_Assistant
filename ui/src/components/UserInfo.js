import React, { Component } from 'react';

class UserInfo extends Component{

    constructor(props) {
        super(props);

        this.state = {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            userId: this.props.user.User_ID,
            type: this.props.user.type
        };
    }


    render(){
        return(
            <div>
                <h2>Name: {this.state.firstName} {this.state.lastName} </h2>
                <h2>ID: {this.state.userId}</h2>
                <h2>User Type: {this.state.type}</h2>
            </div>
        )
    }


}

export default UserInfo;