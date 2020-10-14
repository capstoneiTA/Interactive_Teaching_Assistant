/*  Source: https://material-ui.com/components/slider/
*   Discrete Slider session
*
*   Dependencies Installed in UI only:
    *   @material-ui/core
    *   react-bootstrap
* */

import React from 'react';

//Student Side
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

//Teacher Side
import ProgressBar from 'react-bootstrap/ProgressBar';

//Student uMeter
const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value) {
    return `${value}`;
}


//TODO how to get value from slider and push to db then send db value to progress bar
export default function UnderstandingMeter() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <Typography id="discrete-slider" gutterBottom>
                    Understanding Score
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
                />
            </div>
            <div className={""}>
                <b>Display on teacher</b>

                <ProgressBar now={valuetext} />
            </div>
        </div>

    );
}

