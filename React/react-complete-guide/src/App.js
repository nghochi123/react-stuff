import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props=>props.alt ? 'red' : 'green'};
  color:white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover{
    background-color: ${props=>props.alt ? 'salmon' : 'lightgreen'};
    color:black;
  }

`;

class App extends Component {
  state = {
    persons: [
			{ id: 'tadsfadfa', name: 'Max', age: 28},
			{ id: 'tawetasdf', name: 'Manu', age: 29},
			{ id: 'aklfjfadf', name: 'Stephanie', age: 26}
    ],
    showPersons: false
  };
  switchNameHandler = () =>{
    console.log('Button was clicked');
  }
  nameChangedHandler = (event, id) => {
    const pi = this.state.persons.findIndex(p=>{
      return p.id === id;
    });

    const person = {
      ...this.state.persons[pi]
    };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[pi] = person;
    this.setState({
      persons: persons
    });
  }
  displayPersons = () =>{
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    })
  }

  deletePersonHandler = (index) =>{
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({persons: persons});
  }

  render() {
    let persons = null;
    if(this.state.showPersons){
      persons = (<div>
          {this.state.persons.map((persons, index)=>{
            return <Person
              click={()=>this.deletePersonHandler(index)}
              name={persons.name}
              age={persons.age}
              changed={(event)=>this.nameChangedHandler(event, persons.id)}
              key = {persons.id}/>
          })}
        </div>)
    }
    const classes = [];
    if(this.state.persons.length <3){
      classes.push('red');
    }
    if(this.state.persons.length <2){
      classes.push('bold');
    }
    
    console.log(this.state.persons.length);
    return (
      <div className="App">
        <h1>Hi, I'm a React app</h1>
        <p className={classes.join(' ')}>Good Morning</p>
        <StyledButton
        alt = {this.state.showPersons}
        onClick={this.displayPersons}>Switch name
        </StyledButton>
        {persons}
      </div>
      
    );
  };
}

export default App;
{/* <Person 
name={this.state.persons[0].name} 
age={this.state.persons[0].age}/>
<Person 
name={this.state.persons[1].name} 
age={this.state.persons[1].age}
click={this.switchNameHandler}
changed={this.nameChangedHandler}/>
<Person 
name={this.state.persons[2].name} 
age={this.state.persons[2].age}/> */}