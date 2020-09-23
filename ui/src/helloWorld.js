import React, { Component } from 'react';
import axios from "axios";

const apiUrl = `http://localhost:8080`;

class HelloWorld extends Component {
    state = {
        word: ""
    };

    async loadWord() {
        const res = await axios.get(apiUrl + '/word');
        console.log(res);
        this.setState({
            word: res.data
        });
    }

    //Runs after the component is mounted
    componentDidMount() {
        this.loadWord();
    }

    render(){
        return(
            <h1 className="helloWorld">
                {this.state.word}
            </h1>
        )
    }


}

export default HelloWorld;