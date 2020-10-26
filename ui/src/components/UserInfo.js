import React, {Component, useState} from 'react';

//material-ui cards
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        margin: "left",
    },
    title: {
        fontSize: 24,
        color: "black",
    },
    pos: {
        marginBottom: 12,
    },
});

function UserInfo(props) {

    const [firstName, setFirstName] = useState(props.user.firstName);
    const [lastName, setLastName] = useState(props.user.lastName);
    const [userId, setuserId] = useState(props.user.User_ID);
    const [type, settype] = useState(props.user.type);

    const classes = useStyles();

    return(
        <div>
            <Card className={classes.root} variant ={"outlined"}>
                <CardContent>
                    <Typography className={classes.title} color="primary" gutterBottom>
                        User's Info
                    </Typography>
                    <Typography variant="body2" component="p">
                        Name: {firstName} {lastName}
                        <br />
                        ID: {userId}
                        <br />
                        Type: {type}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserInfo;