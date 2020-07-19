import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FirstComponent from './components/learning-examples/FirstComponent.jsx'
import Counter from './components/counters/Counter.jsx'
import TodoApp from './components/todo/TodoApp'

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
class App extends Component{
  render(){
    return(
      <div className="App">
         {/* <Counter/> */}
         <TodoApp/>
      </div>
    );
  }
}



export default App;
