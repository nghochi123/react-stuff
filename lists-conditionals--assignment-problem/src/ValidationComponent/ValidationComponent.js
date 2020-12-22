import React from 'react';
import './ValidationComponent.css';


const validationComponent = (props) =>{
    let longEnough = null;
    if(props.len >= 5){
        longEnough = 'Text is long enough';
    } else{
        longEnough = 'Text is too short';
    }
    return (
        <div className="ValidationComponent">
            {longEnough}
        </div>
        
    )
};
export default validationComponent;