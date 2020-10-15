/*  Source: https://material-ui.com/components/slider/
*   Discrete Slider session
*
* */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value) {
    return `${value}`;
}

function handleChange(event, value) {
    console.log("Score Value " + value);
    //TODO save the score here in db and notify change

}

export default function StudentUnderstandingMeter() {

    const classes = useStyles();

    return (
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
                onChangeCommitted={handleChange}
            />
        </div>
    );
}

