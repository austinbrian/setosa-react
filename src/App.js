import React, { Component } from 'react';
import './App.css';
import BarGraph from './components/BarGraph';
import { data } from './data/testdata.js';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Setosa React</h1>
          <BarGraph data={ data }/>
      </div>
    );
  }
}

export default App;
