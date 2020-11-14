import React from 'react';
import LogoutButton from "./LogoutButton";
const PageHeader = (props) => {
    const headerText = props.text;

    return (
        <div style={headerStyle}>
            <div style={headerTextStyle}>
                {headerText}
            </div>
            <LogoutButton history={props.history}/>
        </div>
    )
}

const headerStyle = {
    width: '100%',
    backgroundColor: '#A4C3E3',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}

const headerTextStyle = {
    fontSize: '40px',
    color: 'white',
    marginLeft: '10px',
}

export default PageHeader;