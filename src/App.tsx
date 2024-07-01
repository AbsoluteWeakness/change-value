import React from 'react';
import logo from './logo.svg';
import './App.css';
import Converter from './components/valueConverter/Converter';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Converter/>
    </div>
  );
}

export default App;
