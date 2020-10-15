import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StudentUnderstandingMeter from "./uMeter_UI_Student";
import TeacherUnderstandingMeter from "./uMeter_UI_Teacher";


class UMeterTest extends Component {
    render() {
        return (
            <div className={"umetertest"}>
                <StudentUnderstandingMeter />,
                <TeacherUnderstandingMeter />,
            </div>
        );
    }
}

ReactDOM.render(
    <UMeterTest />,
    document.getElementById('root')
);