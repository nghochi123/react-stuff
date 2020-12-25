import React, { useEffect, useRef } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../context/auth-context'

const cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  useEffect(()=>{
    toggleBtnRef.current.click();
  }, [])
  const btnClass = [classes.Button];
  if(props.showPersons){
    btnClass.push(classes.Red);
  }
  return(
      <div>
          <h1>Hi, I'm a React app</h1>
          <p>Good Morning</p>
          <button
          ref={toggleBtnRef}
          className = {btnClass.join(' ')}
          onClick={props.displayPersons}>
              Switch name
          </button>
          <AuthContext.Consumer>
            {context => <button onClick={context.login}>Log in</button>}
          </AuthContext.Consumer>
          
    </div>
  );
};

export default cockpit;