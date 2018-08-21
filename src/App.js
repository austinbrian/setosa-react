import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import BarGraph from './components/BarGraph';
import { data } from './data/testdata.js';
import InputField from './components/InputField';
// import ValueSlider from './components/ValueSlider';
import Slider from 'rc-slider';

const flowerData = {
    sepal: { length:.2, width:1 },
    petal:{ length:.1, width:1 },
}

const speciesData = [
    { name: 'setosa', pct:0.6 },
    { name: 'versicolor', pct:0.3 },
    { name: 'virginica', pct:0.1 }
]

class App extends Component {
  constructor() {
    super();
    this.state = {
        flowerData,
        modelUsed: 'rf',
        speciesData,
        measurement:4
    };
  }

  componentDidMount() {
      this.setState({ flowerData, modelUsed: 'rf' })
      console.log(this.state)
  }

  onDataChange = () => {
      this.setState({
          flowerData:this.state.flowerData
      })}

  getResponse = () => {
      this.setState = {flowerData}

      fetch('http://localhost:5000/api', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              flowerData,
              // sepal:{
              //     length: this.state.flowerData.sepal.length,
              //     width: this.state.flowerData.sepal.width
              // },
              // petal:{
              //     length: this.state.flowerData.petal.length,
              //     width: this.state.flowerData.petal.width
              // },
              modelUsed:this.state.modelUsed
          }),
      })
      .then(console.log(this.props.state))
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson)
      return responseJson.data;
  })
  .catch((error) => { console.error(error);
    });
  }

  render()  {
    return (
      <div className="App">
          <h1>Setosa React</h1>
          <BarGraph data={ speciesData }/>
          <br />
          <div style={ {width: 600, margin: 50}}>
              <p>Slider should be below here...</p>
              <Slider step={0.1} min={0} max={6} onChange={function log(value) {console.log(value)}}/>
          </div>
          {/* <div margin='20px'>
              <InputField fieldName='sepal len'
                  onChange = {(e) => {this.onDataChange(e)}} />
              <InputField fieldName='sepal width' onChange = {this.onDataChange} />
              <InputField fieldName='petal len' onChange = {this.onDataChange} />
              <InputField fieldName='petal width' onChange = {this.onDataChange} />
              <button onClick={this.getResponse}>HIT ME</button>
          </div> */}
      </div>
    );
  }
}

export default App;
