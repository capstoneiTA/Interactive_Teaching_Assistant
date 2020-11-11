import React, { Component } from 'react';
import axios from "axios";
import SessionConnect from "./components/SessionComps/SessionConnect";
import SessionJoin from "./components/SessionComps/SessionJoin";
import SessionEnrollment from './components/SessionComps/SessionEnrollment';

let apiUrl = '';
if(process.env.REACT_APP_DEPLOY === "False"){
    apiUrl = `http://localhost:8080`;
}else{
    apiUrl = `${process.env.REACT_APP_EC2HOST}:8080`;
}

class HelloWorld extends Component {
    state = {
        word: ""
    };

    async loadWord() {
        const res = await axios.post(apiUrl + '/login', {email: "test4@email.com" , password: "password"});
        console.log(res);
        this.setState({
            word: res.data
        });
    }

    // Runs after the component is mounted
    componentDidMount() {
        this.loadWord();
    }

    render(){
        return(
            <>
                <h1 className="helloWorld">
                    {this.state.word}
                </h1>
                <SessionConnect userId="1"></SessionConnect>

                <SessionJoin userId="1"></SessionJoin>
                <SessionEnrollment userId="1"></SessionEnrollment>

            </>
        )
    }


}

export default HelloWorld;