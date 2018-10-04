import React, { Component } from 'react';
import { AddCard, DisplayCards } from './components';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          Credit Card System
        </header>

        <AddCard/>
        <DisplayCards/>
      </div>
    );
  }
}

export default App;
