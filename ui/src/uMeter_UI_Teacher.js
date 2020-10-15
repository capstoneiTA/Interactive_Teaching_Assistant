/*  Source: https://material-ui.com/components/slider/
*   Discrete Slider session
*
*   Dependencies Installed in UI only:
    *   @material-ui/core
    *   react-bootstrap
* */
//General
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

//TODO there should be a socket that always listening for changes from db or from the student meter

function handleChange() {

}

export default function TeacherUnderstandingMeter() {

    return (
        <div className={"teacher-meter"}>
            <b>Display on teacher</b>

            <ProgressBar min={1} max={5} now={3} />
        </div>
    );
}

