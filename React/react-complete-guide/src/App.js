import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

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
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
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
    return (
      <div className="App">
        <h1>Hi, I'm a React app</h1>
        <button 
        style={style} 
        onClick={this.displayPersons}>Switch Name</button>
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