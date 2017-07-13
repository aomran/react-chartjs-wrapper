import React, { Component } from 'react';
import { render } from 'react-dom';
import ChartJS from '../../src';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getData([10,20,30]),
      type: 'pie'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      data: this.getData([100,20,30]),
    });
  }

  getData(data) {
    return {
      datasets: [{
        data: data,
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
      }],
      labels: ['Red', 'Yellow', 'Blue']
    };
  }

  render() {
    return <div>
      <h1>Chart.js Demo</h1>
      <button onClick={this.handleClick}>Click Me!</button>
      <ChartJS type={this.state.type} data={this.state.data} />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
