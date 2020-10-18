//general
import React, {Component} from 'react';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

class simpleUMeter extends Component {
    constructor(props) {
        super(props);
        this.value = this.props.value;
        this.firstName = this.props.firstName;
        this.lastName = this.props.lastName;
    }

    render() {
        return (
            <div style={{ margin: 50 }}>
                <p>{this.value}</p>
                <p>{this.firstName} {this.lastName}</p>
                <Slider
                    min={1}
                    max={5}
                    value={this.value}
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


export default simpleUMeter;