# React Chart.js Wrapper

[![Build Status](https://travis-ci.org/aomran/react-chartjs-wrapper.svg?branch=master)](https://travis-ci.org/aomran/react-chartjs-wrapper)
[![npm version](https://badge.fury.io/js/react-chartjs-wrapper.svg)](https://badge.fury.io/js/react-chartjs-wrapper)
[![Coverage Status](https://coveralls.io/repos/github/aomran/react-chartjs-wrapper/badge.svg)](https://coveralls.io/github/aomran/react-chartjs-wrapper)

This is a simple wrapper for [ChartJS](http://www.chartjs.org/) as a React.js component.

### Installation

```
$ npm install react-chartjs-wrapper --save
```
$ npm install react-chartjs-wrapper --save
``````
$ npm install react-chartjs-wrapper --save
``````
$ npm install react-chartjs-wrapper --save
``````
```
$ npm install react-chartjs-wrapper --save
```
```
$ npm install react-chartjs-wrapper --save
```
```
$ npm install react-chartjs-wrapper --save
```
$ npm install react-chartjs-wrapper --save
```
```
$ npm install react-chartjs-wrapper --save
```
```
$ npm install re
$ npm install react-chartjs-wrapper --save
```
```
$ npm install react-chartjs-wrapper --save
```
```
$ npm install re

### Usage

```javascript
import React from 'react';
import ChartJS from 'react-chartjs-wrapper';

class ParentComponent extends React.Component {
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
```
