import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SelectActivity from "./SelectActivity";
import {TicketContextProvider} from "./TicketContext";
import Button from "@material-ui/core/Button";
import ExitTicketCreation from "./ExitTicket/ExitTicketCreation";
import {PollContextProvider} from "./Poll/PollContext";
import CreatePoll from "./Poll/CreatePoll";
import CreateQuiz from "./Quiz/CreateQuiz";
import {QuizContextProvider} from "./Quiz/QuizContext";


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
            setMenu(<QuizContextProvider><CreateQuiz user={user}/></QuizContextProvider>)
        }else if(choice === 'Poll'){
            setMenu(<PollContextProvider><CreatePoll user={user}/>></PollContextProvider>)
        }else if(choice === 'Exit Ticket'){
            setMenu(<TicketContextProvider> <ExitTicketCreation user= {user}/></TicketContextProvider>)
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