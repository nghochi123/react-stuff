import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../Cockpit/Cockpit';
import withClass from '../hoc/withClass'
import AuthContext from '../context/auth-context';

class App extends Component {
  state = {
    persons: [
			{ id: 'tadsfadfa', name: 'Max', age: 28},
			{ id: 'tawetasdf', name: 'Manu', age: 29},
			{ id: 'aklfjfadf', name: 'Stephanie', age: 26}
    ],
    showPersons: false,
    authenticated: false
  };
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

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
          <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuth={this.state.authenticated}/>
        </div>)
    }
    return (
      <div className={classes.App}>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
          <Cockpit
          persons={this.state.Persons}
          showPersons={this.state.showPersons}
          displayPersons={this.displayPersons}/>
          {persons}
        </AuthContext.Provider>
      </div>
    );
  };
}


export default withClass(App, classes.App);
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