import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent'

class App extends Component {
  state = {
    len: 0,
    text:''
  };
  getLength = (event)=>{
    this.setState({
      len: event.target.value.length,
      text: event.target.value
    });
  };

  deleteChar = (index)=>{
    console.log(index);
    let textArr = [...this.state.text.split('')];
    textArr.splice(index,1);
    textArr = textArr.join('');
    this.setState({
      len: textArr.length,
      text:textArr
    })
  }

  render() {
    const textArray = this.state.text.split('').map((char, index)=>{
      return (
        <CharComponent
        char={char}
        click={()=>this.deleteChar(index)}/>
      )
    });
    return (
      <div className="App">
        <input type="text" onChange={this.getLength} value={this.state.text}/>
        <p>The length of the text above is {this.state.len} characters</p>
        <ValidationComponent
        len={this.state.len}/>
        <p>These are the characters:</p>
        {textArray}
      </div>
    );
  }
}

export default App;
/* <ol>
<li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
<li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
<li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
<li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
<li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
<li>When you click a CharComponent, it should be removed from the entered text.</li>
</ol>
<p>Hint: Keep in mind that JavaScript strings are basically arrays!</p> */