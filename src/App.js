import React, { Component } from 'react';
import './App.css';
import BarGraph from './components/BarGraph';
import { data } from './data/testdata.js';
import InputField from './components/InputField';

const flowerData = {
    sepal: { length:.2, width:1 },
    petal:{ length:.1, width:1 },

}
class App extends Component {
  constructor() {
    super();
    this.state = { flowerData, modelUsed: 'rf' };
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
      this.state = {flowerData}

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
  render() {
    return (
      <div className="App">
          <h1>Setosa React</h1>
          {/* <BarGraph data={ data }/> */}
          <div>
              <InputField fieldName='sepal len'
                  onChange = {(e) => {this.onDataChange(e)}} />
              <InputField fieldName='sepal width' onChange = {this.onDataChange} />
              <InputField fieldName='petal len' onChange = {this.onDataChange} />
              <InputField fieldName='petal width' onChange = {this.onDataChange} />

              {/* <input placeholder="sepal length"/>
              <input placeholder="sepal width"/>
              <input placeholder="petal length"/>
              <input placeholder="petal width"/> */}
              <button onClick={this.getResponse}>HIT ME</button>
          </div>
      </div>
    );
  }
}

export default App;
