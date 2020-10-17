/*  Source: https://material-ui.com/components/slider/
*   Discrete Slider session
*
* */

/*  TODO
*       Handle change by getting the value from input               (v)
*       Save the change to db                                       (v)
*       Notify the teacher about the change, thru socket.io         ()
*
* */

//general
import React, {Component} from 'react';
import axios from 'axios';
import Slider from 'react-native-slider';
import { StyleSheet, View, Text } from 'react-native';
//import UserInfo from "./UserInfo";

const apiGatewayUrl = `http://api-gateway:8080`;

class StudentUnderstandingMeter extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.state !==undefined){
            this.user = this.props.location.state.user;
        }else{
            this.user = '';
        }
    }

    state = {
        value: 3
    };

    render() {
        return (

            <View style={styles.container}>
                <Slider
                    value={this.state.value}
                    onValueChange={handleChange}
                />
                <Text>
                    Value: {this.state.value}
                    Name: {this.user.state.name}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
    }
});

function handleChange(e) {
    let value = e.target.value;
    console.log("Score Value: " + value);
    console.log("User name: " + this.user.state.userId);

    this.setState({value});

    //Send the new data value to db
    axios.post(apiGatewayUrl + '/uMeter/update', {uScore: value, userId: this.user.state.userId}).then(function(response){
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });

    /*  TODO: HOW TO NOTIFY CHANGE?
    *       what do we need? just a socket.io object
    *       then how do we notifying the change? EMIT TO THE "SERVER" SOCKET
    * */
    //get a socket


}

export default StudentUnderstandingMeter;

//import {StyledComponentProps} from "@material-ui/core";

//styling
// import Slider from '@material-ui/core/Slider';
// import Typography from '@material-ui/core/Typography';
// import makeStyles from '@material-ui/core/styles';
// const useStyles = makeStyles({
//     root: {
//         width: 300,
//     },
// });
//
// function valuetext(value) {
//     return `${value}`;
// }
//Call by onChangeCommitted (completed 1st requirement)

// export default function StudentUnderstandingMeter() {
//     const classes = useStyles();
//     return (
//         <div className={classes.root}>
//             <Typography id="discrete-slider" gutterBottom>
//                 Student's Name
//             </Typography>
//             <Slider
//                 defaultValue={3}
//                 getAriaValueText={valuetext}
//                 aria-labelledby="discrete-slider"
//                 valueLabelDisplay="auto"
//                 step={1}
//                 marks
//                 min={1}
//                 max={5}
//                 onChangeCommitted={handleChange}
//             />
//         </div>
//     );
// }