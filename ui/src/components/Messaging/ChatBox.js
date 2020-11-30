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
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    borderRadius: 6,
    padding: 15,
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

const ChatBox = ({ handleSubmit, handleChange, value, messages, user }) => {
  const formatDate = (date) => {
    return (
      (date.getUTCMonth() + 1).toString() +
      "/" +
      date.getUTCDate() +
      "/" +
      date.getUTCFullYear().toString() +
      " " +
      date.getUTCHours() +
      ":" +
      ("0" + date.getMinutes()).substr(-2)
      //  +
      // ":" +
      // date.getUTCSeconds()
    );
  };
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        {/*<h1>Chat</h1>*/}
        <div style={{ overflowY: "scroll" }}>
          <List dense={true} style={{ overflow: "scroll" }}>
            {messages.map((msg) => {
              if (msg.user.id === user.User_ID) {
                return (
                  <>
                    <ListItem
                      align="right"
                      key={user}
                      style={{
                        background: "#1982FC",
                        borderRadius: "10px",
                        margin: "10px",
                        maxWidth: "60%",
                        float: "right",
                        // minWidth: "40%",
                      }}
                    >
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align="right"
                            primary={msg.Message_Content}
                            // secondary={msg.user.firstName}
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align="right"
                            secondary={
                              formatDate(new Date(msg.createdAt)) + " UTC"
                            }
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                    {/* <Divider /> */}
                  </>
                );
              } else {
                return (
                  <>
                    <ListItem
                      key={user}
                      style={{
                        background: "#d3d3d3",
                        borderRadius: "10px",
                        maxWidth: "60%",
                        minWidth: "40%",
                        margin: "10px",
                      }}
                    >
                      <ListItemIcon>
                        <Avatar>
                          {msg.user.firstName.charAt(0) +
                            msg.user.lastName.charAt(0)}
                        </Avatar>
                      </ListItemIcon>

                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align="left"
                            primary={msg.Message_Content}
                            secondary={
                              msg.user.firstName + " " + msg.user.lastName
                            }
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align="left"
                            secondary={
                              formatDate(new Date(msg.createdAt)) + " UTC"
                            }
                          ></ListItemText>
                        </Grid>
                      </Grid>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </ListItem>
                  </>
                );
              }
            })}
          </List>
        </div>
        <div style={inputDivContainer}>
          <form
            className={classes.form}
            onSubmit={(e) => handleSubmit(e)}
            style={inputFormContainer}
          >
            <FormControl margin="normal" style={chatInputStyle}>
              <InputLabel htmlFor="message"></InputLabel>
              <Input
                id="message"
                placeholder="Send something nice!"
                onBlur="Send something nice!"
                name="message"
                value={value}
                onChange={handleChange}
                autoFocus
                autoComplete="off"
                size="normal"
              />
            </FormControl>
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              // color="primary"
              onClick={(e) => handleSubmit(e)}
              style={sendButtonStyle}
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

const chatListStyle = {
  overflow: "scroll",
  // height: '100%',
  // overflowY: 'auto',
};

const inputDivContainer = {
  borderTop: "2px solid lightgray",
};

const inputFormContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const chatInputStyle = {
  width: "79%",
  margin: "10px",
};

const sendButtonStyle = {
  width: "19%",
  margin: "10px",
};

export default ChatBox;
