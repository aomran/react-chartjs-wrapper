# React Chart.js Wrapper

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

This is a simple wrapper for [ChartJS](http://www.chartjs.org/) as a React.js component.

### Installation

```
$ npm install react-chartjs-wrapper --save
```

### Usage

```
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

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/aomran/react-chartjs-wrapper

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/react-chartjs-wrapper

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
