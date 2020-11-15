import React from 'react';
import LogoutButton from "./LogoutButton";
const PageHeader = (props) => {
    const firstName = props.user.firstName;
    const lastName = props.user.lastName;
    const designation = props.designation;
    const sessionName = props.sessionName;

    if (designation === "TEACHER DASHBOARD" || designation === "STUDENT DASHBOARD") {
        return (
            <div style={headerStyle}>
                <div style={headerTextStyle}>
                    <div style={nameStyle}>
                        {firstName} {lastName}
                    </div>
                    <div style={capsStyle}>
                        {designation}
                    </div>
                </div>
                <LogoutButton history={props.history}/>
            </div>
        )
    } else {
        return (
            <div style={headerStyle}>
                <div style={headerTextStyle}>
                    <div style={capsStyle}>
                        SESSION
                    </div>
                    <div>
                        {sessionName}
                    </div>
                </div>
                <LogoutButton history={props.history}/>
            </div>
        )
    }

}

const headerStyle = {
    width: '100%',
    backgroundColor: '#A4C3E3',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: '2',
}

const headerTextStyle = {
    fontSize: '40px',
    color: 'white',
    marginLeft: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
}

const nameStyle = {
    marginRight: '30px',
}

const capsStyle = {
    fontSize: '20px',
    marginRight: '20px',
}

export default PageHeader;