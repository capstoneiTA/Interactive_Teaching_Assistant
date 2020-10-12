import React, {Component} from 'react';
import '../css/uMeter.css';

const apiUrl = `http://localhost:9000`;

class App extends Component {

    render() {
        return (
            <div class="slidecontainer">
                <input type="range" min="1" max="5" value="3" class="slider" id="myRange"/>
            </div>
        )
    }


}

export default App;