import React, { Component } from 'react';
import { render } from 'react-dom';

import ChartJS from '../../src';

class Demo extends Component {
  constructor(props) {
    super(props);
    let data = {
      datasets: [{
        data: [10, 20, 30],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
      }],
      labels: ['Red', 'Yellow', 'Blue']
    };
    this.state = {
      data: data,
      type: 'pie'
    };
  }

  render() {
    return <div>
      <h1>Chart.js Demo</h1>
      <ChartJS type={this.state.type} data={this.state.data} />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
