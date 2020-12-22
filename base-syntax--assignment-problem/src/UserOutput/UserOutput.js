import React from 'react';
import './UserOutput.css';


const userOutput = (props) =>{
    return (
        <div className="UserOutput">
            <p>Your username is {props.username}</p>
            <p>Test</p>
        </div>
        
    )
};

export default userOutput;