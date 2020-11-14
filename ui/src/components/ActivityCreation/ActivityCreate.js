import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SelectActivity from "./SelectActivity";
import CreateQuiz from "./CreateQuiz";
import {QuizContextProvider} from "./QuizContext";
import Button from "@material-ui/core/Button";
import ExitTicketCreation from "./ExitTicketCreation";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxHeight: '600px',
        overflowY: 'scroll',

    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const ActivityCreate = ({user}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);



    const selectActivityCallback = (choice)=>{
        if(choice === 'Quiz'){
            setMenu(<QuizContextProvider><CreateQuiz user={user} setOpen={setOpen} parentCallback={selectActivityCallback}/></QuizContextProvider>);
        }else if(choice === 'Poll'){

        }else if(choice === 'Exit Ticket'){
            setMenu(<ExitTicketCreation/>);
        }else if(choice === 'Initial'){
            setMenu(<SelectActivity activities={['Quiz', 'Poll', 'Exit Ticket']} parentCallback={selectActivityCallback}/>);
        }
    };
    const [menu, setMenu] = useState(<SelectActivity activities={['Quiz', 'Poll', 'Exit Ticket']} parentCallback={selectActivityCallback}/>);



    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button type="button" onClick={handleOpen}>
                Create Activity
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {menu}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default ActivityCreate;