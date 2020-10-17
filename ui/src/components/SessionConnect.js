import React, { useState } from 'react';
import axios from "axios";

const apiUrl = `http://localhost:8080`;


const SessionConnect = ({CreatedBy}) => {
    const [sessionName, setSessionName] = useState('')
    const [response, setResponse] = useState({message: ''})

    const handleChange = (e) =>{
        setSessionName( e.target.value );
      }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('body to be posted to session/create:','SessionName:', sessionName, 'CreatedBy: ', CreatedBy);
        axios.post(apiUrl + '/session/create', {sessionName, CreatedBy})
        .then(res=>{
          console.log(res);
          console.log(res.data);
          if (res.data.dbAdd === true){
            setResponse({message: 'New session: ' + sessionName + ' created'});
          }else if(res.data.verified === false){
              setResponse({message: 'Error: Only user type teacher may create a Session'});
          }else{
              setResponse({message: 'Session: ' + sessionName + ' already exists, creation failed'});
          }
          
        }).catch(error => {
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
                {response.message}
            </div>

        </div>
    )
}
export default SessionConnect;