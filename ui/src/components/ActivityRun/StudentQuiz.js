//General
import React, {Component, useEffect, useState} from 'react';

import socketIOClient from "socket.io-client";

export default function StudentActivityContainer({quiz}) {

    return(
        <div>
            <h2>Quiz Name: {quiz.quizName}</h2>
            {quiz.quizQuestions.map((question, index)=>{
                return <div>
                    <h3> {index+1}: {question.prompt}</h3>
                    {question.options.map((option, index)=>{
                        return <p>{index + 1}) {option.option}</p>
                    })}
                </div>
            })}
        </div>
    )


}