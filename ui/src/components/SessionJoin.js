import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import {withStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import InputAdornment from "@material-ui/core/InputAdornment";

const apiUrl = `http://localhost:8080`;

const styles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '150ch',
        },
    },
    iconButton: {
        padding:5,
    },
});

class SessionJoin extends Component  {
    constructor(props) {
        super(props);
        this.userId = this.props.userId;

        this.state = {
           sessionName: '',
            message: ''
        };
    }

    handleChange = (e) =>{
        this.setState({sessionName: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let that = this;
        console.log('body to be posted to session/join:','SessionName:', this.state.sessionName, 'userId ', this.userId);

        //join session
        axios.post(apiUrl + '/session/join', {sessionName:this.state.sessionName, userId:this.userId}).then(res=>{
            //Get user information
            axios.get(apiUrl + '/userInfo', {params: {userId: this.userId}}).then(userRes=>{
                //start understanding meter listener
                axios.post(apiUrl + '/uMeter/create', {sessionId: res.data.sessionId, userId: this.userId}).then(function (uMeterRes) {
                    console.log(uMeterRes.data);
                    // routing should go here
                    that.props.history.push({
                            pathname: '/classSession',
                            state: {user: userRes.data.user, sessionName: that.state.sessionName, sessionId: res.data.sessionId}
                        }
                    );
                });

                let response = res.data;
                if (response.sessionExists === true){
                    this.setState({message: 'Added User: '+ this.userId  + ' to Session: ' +  this.state.sessionName})
                } else {
                    this.setState({message: 'There is no session called: ' +  this.state.sessionName})
                }
            });

        }).catch(error => {
            console.log('ERROR in SessionJoin: ', error)
        })



    };

    render(){
        const {classes} = this.props;
        return (
            <div>
                <form className={classes.root} role="form" onSubmit={this.handleSubmit}>
                    <label>Join Session: </label>
                    <div className="row">
                        <div className="form-group col-3">
                            <TextField
                                label="Session Name"
                                variant="outlined"
                                onChange={this.handleChange}
                                size="medium"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton type="submit" className={classes.iconButton} aria-label="Join">
                                            <ArrowForwardIosIcon />
                                        </IconButton>
                                    </InputAdornment>,
                                }}

                            />
                        </div>
                    </div>
                </form>

                <div>
                    {this.state.message}
                </div>
            </div>
        )
    }
}
export default withStyles(styles, {withTheme: true})(withRouter(SessionJoin));