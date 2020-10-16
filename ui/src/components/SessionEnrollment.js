import React, { useState } from 'react';
import axios from "axios";

const apiUrl = `http://localhost:8080`;

const SessionEnrollment = ({userId}) => {
    const [response, setResponse] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('body to be sent to session/enrollments:', 'userId ', userId); 
        axios.get(apiUrl + '/session/enrollments', {userId})
        .then(res=>{
          console.log(res);
          console.log(res.data.enrollments);
          // routing should go here
          setResponse(res.data);
        }).catch(error => {
            console.log('ERROR in SessionEnrollment: ', error)
        })

    }


    return (
        <div>
            <form onSubmit = { handleSubmit }>
                <label>view Enrollments</label>
                <button type="submit">View session enrollments</button>
            </form>
            <div>
                Response: {response.data}
            </div>

        </div>
    )
}
export default SessionEnrollment;