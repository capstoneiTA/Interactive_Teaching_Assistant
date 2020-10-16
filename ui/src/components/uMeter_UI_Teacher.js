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

/* TODO: General
*       Create a uMeter for each student (view only, can't adjust)
*       Create an average uMeter of the session (view only, can;t adjust)
*       Always listen for the change message from the student's meters
*           Pull data from db to update the UI when received the change message
* */


function generateIndividualMeter() {
    /*  TODO: Create a uMeter for each student (view only, can't adjust)
    *       What info do we need? The student lists
    *       How do we get it? ...
    *       then How do we generate uMeter for each student? For each student, create a progress bar component and bind info
    * */

}

function generateAverageMeter() {
    /*  TODO: Create an average uMeter of the session (view only, can;t adjust)
    *       What info do we need? The student lists and the score of them
    *       How do we get it? ...
    *       then How do we create an average uMeter of the session? Compile the average score then use generateIndividualMeter() to create one under teacher name
    * */
}

function handleUpdate() {
    /*  TODO: Always listen for the change message from the student's meters + data
    *       What do we need? socket.io objects
    *       How do we get it? Create one and set to listening
    *       Upon receiving message, what to do? Update the teacher data accordingly
    * */

}

export default function TeacherUnderstandingMeter() {

    return (
        <div className={"teacher-meter"}>
            <b>Teacher's side uMeter</b>
            <ul>
               <li>
                   <ProgressBar min={1} max={5} now={3} />
               </li>
                <li>
                    <ProgressBar min={1} max={5} now={1} />
                </li>
            </ul>


        </div>
    );
}

