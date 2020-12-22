import React from 'react';
import './UserInput.css';


const userInput = (props) =>{
    return (
        <div className="UserInput">
            <p>Username: {props.username}</p>
            <input type='text' onChange={props.changed} value={props.username}/>
        </div>
        
    )
};

export default userInput;