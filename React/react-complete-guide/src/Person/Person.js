import React from 'react';
import './Person.css';


const person = (props) =>{
    return (
        <div className="Person">
            <p onClick={props.click}>Hi! My name is {props.name} and my age is {props.age}!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
        
    )
};

export default person;