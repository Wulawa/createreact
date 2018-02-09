import React, { Component } from 'react';
import logo from './logo.svg';
import './App.less';

class App extends Component {

  render() {
    debugger;
    console.log(this)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
