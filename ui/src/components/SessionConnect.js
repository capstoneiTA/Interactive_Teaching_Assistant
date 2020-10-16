import React, { useState } from 'react';
import axios from "axios";

const apiUrl = `http://localhost:8080`;

const SessionConnect = ({user_id}) => {
    const [sessionName, setSessionName] = useState({})
    const [response, setResponse] = useState({data: ''})

    const handleChange = (e) =>{
        setSessionName({ sessionName: e.target.value});
      }
    function handleSubmit(e) {
        e.preventDefault();
        console.log( 'SessionName:', {sessionName}, 'CreatedBy: ', user_id); 
        axios.post(apiUrl + '/session/join', {sessionName, user_id})
        .then(res=>{
          console.log(res);
          console.log(res.data);

        }
        ).catch(error => {
            console.log('ERROR in SessionConnect: ', error)
        })

    }


    return (

        <div>
            <form onSubmit = { handleSubmit }>
                <label> Create a session Name
                    <input type="text" name="sessionName" onChange={handleChange}/>
                </label>
                <button type="submit">Create Session</button>
            </form>
            <div>
                Response: {response.data}
            </div>

        </div>
    )
}
export default SessionConnect;