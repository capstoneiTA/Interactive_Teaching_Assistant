import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
      margin: 3,
      border: '2px solid blue',
      borderRadius: 6
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    form: {
        margin: 5,
        padding: 5,
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
      },
    h1: {
        textAlign: 'center' 
    }
  }));

const ChatBox = ({handleSubmit, handleChange, value, messages}) => {
    const classes = useStyles();
      return (
        <>
        <div className={classes.root}>
            <h1>Chat</h1>
            <List dense={true}>
            {messages.map((msg) => (
                <ListItem>
                    <div>{console.log(msg)}</div>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={msg[1]}
                  secondary={msg[0]}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            </List>
            <form className={classes.form} onSubmit={e => handleSubmit(e)}>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="message"></InputLabel>
                    <Input id="message" placeholder="Send something nice!" name="message" value={value} onChange={handleChange} autoFocus autoComplete="off"/>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={e => handleSubmit(e)}
                >
                    Send Message
                </Button>
            </form>
            </div>
          </>
      )
}
export default ChatBox