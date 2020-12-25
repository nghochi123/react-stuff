import React from 'react';
import './Person.css';
import styled from 'styled-components';
import Aux from '../../../hoc/Auxiliary';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

const StyledDiv = styled.div`
    width:60%;
    margin: 16px auto; 
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;

    @media (min-width: 767px) {
        width: '450px';
        color: blue;
    }
};
`



const person = (props) =>{
    return (
        <Aux>
            <StyledDiv>
                <AuthContext.Consumer>
                    {(context) => context.authenticated ? <p>Authenticated!</p> : <p>Please Log In!</p>}
                </AuthContext.Consumer>
                <p onClick={props.click}>Hi! My name is {props.name} and my age is {props.age}!</p>
                <p>{props.children}</p>
                <input type="text" onChange={props.changed} value={props.name}/>
            </StyledDiv>
        </Aux>
    )
};

person.propTypes = {
    clicked: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number
}

export default person;