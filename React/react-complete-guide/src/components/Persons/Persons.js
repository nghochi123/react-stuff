import React from 'react'
import Person from './Person/Person'


const persons = (props) => props.persons.map((persons, index)=>{
  return (
    <Person
    click={()=>props.clicked(index)}
    name={persons.name}
    age={persons.age}
    changed={(event)=>props.changed(event, persons.id)}
    key = {persons.id}/>)
})

export default persons;