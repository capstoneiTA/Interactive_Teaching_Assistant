import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import { makeStyles } from "@material-ui/core/styles";

import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    borderRadius: 6,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  form: {
    padding: 5,
    paddingBottom: 15,
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  h1: {
    textAlign: "center",
  },
}));

const onOptionsClick = (e) => {
  console.log(e.target);
};

const ChatBox = ({ handleSubmit, handleChange, value, messages, user }) => {
  const classes = useStyles();
  const [count, setCount] = useState(0);

  return (
    <>
      <div className={classes.root}>
        <List dense={true}>
          {messages.map((msg) => {
            if (msg.userId === user.User_ID) {
              return (
                <>
                  <ListItem
                    key={count}
                    style={{
                      textAlign: "right",
                      color: "blue",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <AccountCircle />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={msg.userId} secondary={msg.msg} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <MoreVertIcon onClick={onOptionsClick} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </>
              );
            } else {
              return (
                <>
                  <ListItem key={count}>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountCircle />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={msg.userId} secondary={msg.msg} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <MoreVertIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </>
              );
            }
          })}
        </List>
        <Divider />
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="message"></InputLabel>
            <Input
              id="message"
              placeholder="Send something nice!"
              name="message"
              value={value}
              onChange={handleChange}
              autoFocus
              autoComplete="off"
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => handleSubmit(e)}
          >
            Send Message
          </Button>
        </form>
      </div>
    </>
  );
};
export default ChatBox;
