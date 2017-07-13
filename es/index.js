function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

var ChartJS = function (_Component) {
  _inherits(ChartJS, _Component);

  function ChartJS() {
    _classCallCheck(this, ChartJS);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ChartJS.prototype.componentDidMount = function componentDidMount() {
    var chart = new Chart(this.canvas, {
      type: this.props.type,
      data: this.props.data,
      options: this.props.options
    });
    this.chart_instance = chart;
  };

  ChartJS.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var dataChanged = this.props.data !== nextProps.data;
    var optionsChanged = this.props.options !== nextProps.options;
    if (dataChanged || optionsChanged) {
      this.updateChart(nextProps);
    }
  };

  ChartJS.prototype.componentWillUnmount = function componentWillUnmount() {
    this.chart_instance.destroy();
  };

  ChartJS.prototype.updateChart = function updateChart(nextProps) {
    var chart = this.chart_instance;
    chart.config.data = nextProps.data;
    chart.config.options = nextProps.options;
    chart.update();
  };

  ChartJS.prototype.render = function render() {
    var _this2 = this;

    return React.createElement('canvas', {
      width: this.props.width,
      height: this.props.height,
      ref: function ref(canvas) {
        return _this2.canvas = canvas;
      }
    });
  };

  return ChartJS;
}(Component);

ChartJS.propTypes = process.env.NODE_ENV !== "production" ? {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
} : {};
ChartJS.defaultProps = {
  width: 150,
  height: 300,
  options: {}
};

export default ChartJS;