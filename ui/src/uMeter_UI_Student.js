/*  Source: https://material-ui.com/components/slider/
*   Discrete Slider session
*
* */

/*  TODO
*       Handle change by getting the value from input               (v)
*       Save the change to db                                       ()
*       Notify the teacher about the change, thru socket.io         ()
*
* */

//general
import React from 'react';
const axios = require('axios');


//styling
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const apiGatewayUrl = `http://api-gateway:8080`;

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value) {
    return `${value}`;
}

//TODO: componentDidMount to set up the socket



//Call by onChangeCommitted (completed 1st requirement)
function handleChange(event, value) {

    console.log("Score Value " + value);
    /*  TODO: HOW TO SAVE TO DB?
    *       what info do we need? Session_Name | User_ID | CurrUValue | CURR TIME
    *       how do we get it? ...
    *       then how do we save in db? create a new entry and send to uMeterChange db | call a post request here??????
    * */
    //Send the new data value to db
    // Is this the right set up?
    axios.post(apiGatewayUrl + '/uMeter/update', {uScore: value}).then(function(response){
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });

    console.log("Post axios call");

    /*  TODO: HOW TO NOTIFY CHANGE?
    *       what do we need? just a socket.io object
    *       then how do we notifying the change? EMIT TO THE "SERVER" SOCKET
    * */
    //get a socket


}

export default function StudentUnderstandingMeter() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <b>Student's side uMeter</b>
            <Typography id="discrete-slider" gutterBottom>
                Student's Name
            </Typography>
            <Slider
                defaultValue={3}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                onChangeCommitted={handleChange}
            />
        </div>
    );
}

