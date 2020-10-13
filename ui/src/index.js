import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/uMeter.css'

class slider extends Component {
    render() {
        return <input type="range" min="1" max="5" value="3" className="slider" id="myRange"/>;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <slider />
    </React.StrictMode>;

    document.getElementById('root')
);
