import React, {useContext} from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthContext } from "./Launch/AuthContext";

const LogoutButton = (props) => {
    const {setUser, setIsLoggedIn} = useContext(AuthContext);

    const logout = () => {
        setUser();
        setIsLoggedIn(false);

        props.history.push('/launch');
    }

    return (
        <div>
            <ExitToAppIcon style={buttonStyle} onClick={logout}/>
        </div>
    )
}

const buttonStyle = {
    color: 'white',
    fontSize: '40px',
    marginRight: '10px',
}

export default LogoutButton;