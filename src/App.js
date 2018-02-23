import React, { Component } from 'react';
// import logo from './logo.svg';
import { NavLink } from 'react-router-dom'
import './App.less';
import RouterComponents from './router'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcom</h1>
        </header>
        <RouterComponents></RouterComponents>
        <ul style={styles.nav}>
          <NavLink to="/">home</NavLink>
          <NavLink to="/create">create</NavLink>
          <NavLink to="/main">main</NavLink>
        </ul>
      </div>
    );
  }
}

const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  bottom: 0,
  height: "40px",
  width: "100%",
  display: "flex"
};
