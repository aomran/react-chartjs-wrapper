import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

class ChartJS extends Component {
  componentDidMount() {
    const chart = new Chart(this.canvas, {
      type: this.props.type,
      data: this.props.data,
      options: this.props.options,
    });
    this.chart_instance = chart;
  }

  componentWillReceiveProps(nextProps) {
    const dataChanged = this.props.data !== nextProps.data;
    const optionsChanged = this.props.options !== nextProps.options;
    if (dataChanged || optionsChanged) {
      this.updateChart(nextProps);
    }
  }

  componentWillUnmount() {
    this.chart_instance.destroy();
  }

  updateChart(nextProps) {
    const chart = this.chart_instance;
    chart.config.data = nextProps.data;
    chart.config.options = nextProps.options;
    chart.update();
  }

  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        ref={canvas => this.canvas = canvas}
      />
    );
  }
}

ChartJS.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};
ChartJS.defaultProps = {
  width: 150,
  height: 300,
  options: {},
};

export default ChartJS;
