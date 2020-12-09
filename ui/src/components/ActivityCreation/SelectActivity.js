import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const SelectActivity=({activities, parentCallback})=> {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2>What type of activity would you like to create?</h2>
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                {activities.map((value)=>{
                    return <Button onClick={()=>{parentCallback(value)}}>{value}</Button>;
                })}
            </ButtonGroup>
        </div>
    );
}

export default SelectActivity;