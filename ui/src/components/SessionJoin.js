import React, { useState } from 'react';
import axios from "axios";

const apiUrl = `http://localhost:8080`;

const SessionJoin = ({userId}) => {
    const [sessionName, setSessionName] = useState('')
    const [response, setResponse] = useState('')

    const handleChange = (e) =>{
        setSessionName( e.target.value );
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('body to be posted to session/join:','SessionName:', sessionName, 'userId ', userId); 
        axios.post(apiUrl + '/session/join', {sessionName, userId})
        .then(res=>{
          console.log(res);
          console.log(res.data);
          // routing should go here
          setResponse(res.data);
        }).catch(error => {
            console.log('ERROR in SessionJoin: ', error)
        })

    }


    return (
        <div>
            <form onSubmit = { handleSubmit }>
                <label> join a session by name
                    <input type="text" name="sessionName" onChange={handleChange}/>
                </label>
                <button type="submit">Join Session</button>
            </form>
            <div>
                Response: {response.data}
            </div>

        </div>
    )
}
export default SessionJoin;