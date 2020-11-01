import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
//material ui
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

let apiUrl = '';
if(process.env.REACT_APP_DEPLOY === "False"){
    apiUrl = `http://localhost:8080`;
}else{
    apiUrl = `${process.env.REACT_APP_EC2HOST}:8080`;
}




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

const SessionEnrollment = ({userId}) => {
    const [response, setResponse] = useState({message: []});
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('body to be sent to session/enrollments:', 'userId ', userId); 
        axios.get(apiUrl + '/session/enrollments', { params: { userId: userId } })
        .then(res=>{
          console.log(res);
          console.log(res.data.enrollments);
          setResponse({message: res.data.enrollments});
        }).catch(error => {
            console.log('ERROR in SessionEnrollment: ', error)
        })
    };

    const handleSessionClick = (session) => {
        console.log('selected session ','SessionName:', session);

        // //join session
        axios.post(apiUrl + '/session/join', {sessionName:session, userId:userId}).then(res=>{
            //Get user information
            axios.get(apiUrl + '/userInfo', {params: {userId: userId}}).then(userRes=>{
                //start understanding meter listener
                axios.post(apiUrl + '/uMeter/create', {sessionId: res.data.sessionId, userId: userId}).then(function (uMeterRes) {
                    console.log(uMeterRes.data);
                    // routing should go here
                    history.push({
                            pathname: '/classSession',
                            state: {user: userRes.data.user, sessionName: session, sessionId: res.data.sessionId}
                        }
                    );
                });
            });

        }).catch(error => {
            console.log('ERROR in SessionJoin: ', error)
        })
    };



    //styling
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event, session) => {
        handleSessionClick(session);
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div>
            <div className={classes.root}>
                <div>
                    <form onSubmit={handleSubmit}>
                        <Button
                            type={"submit"}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        >
                            Enrollment List
                        </Button>
                    </form>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            {response.message.map((enrollment, index) =>
                                                    <MenuItem key={index} onClick={(event) => handleClose(event, enrollment)}>{enrollment}</MenuItem>
                                            )}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        </div>

    )
};

export default SessionEnrollment;