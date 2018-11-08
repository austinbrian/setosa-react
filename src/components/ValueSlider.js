import React, { Component} from 'react';
// import Slider from 'react-rangeslider';
import Slider, { createSliderWithTooltip } from 'rc-slider'

class ValueSlider extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      measurement: 4.1
    }
  }

  handleOnChange = (value) => {
    this.setState({
      measurement: value
    })
  }

  render() {
    let { measurement } = this.state
    return (
      <Slider
        value={measurement}
        min={0}
        max={6}
        step={0.1}
        orientation="horizontal"
        onChange={this.handleOnChange}
      />
    )
  }
}


export default ValueSlider;
