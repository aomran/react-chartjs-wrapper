import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ChartJS from '../src/';

function chartDataFactory(data = [10, 20, 30]) {
  return {
    datasets: [{
      data,
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
    }],
    labels: ['Red', 'Yellow', 'Blue'],
  };
}

describe('Component Mounting', () => {
  it('render canvas with height and width', () => {
    const data = chartDataFactory();
    const component = mount(
      <ChartJS type="pie" data={data} width={200} height={200} options={{ responsive: false }} />,
    );
    const canvas = component.find('canvas').get(0);
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(200);
  });

  it('sets chart type', () => {
    const data = chartDataFactory();
    const component = mount(<ChartJS type="line" data={data} />).instance();
    expect(component.chart_instance.config.type).toBe('line');
  });

  it('sets chart data', () => {
    const data = chartDataFactory();
    const component = mount(<ChartJS type="line" data={data} />).instance();

    expect(component.chart_instance.config.data).toBe(data);
  });
});

describe('Component Unmounting', () => {
  it('should remove chart canvas', () => {
    const data = chartDataFactory();
    const wrapper = mount(<ChartJS type="line" data={data} />);
    const component = wrapper.instance();
    expect(component.chart_instance.canvas).toNotBe(null);

    wrapper.unmount();
    expect(component.chart_instance.canvas).toBe(null);
  });
});

describe('Component Re-rendering', () => {
  beforeEach(() => {
    sinon.spy(ChartJS.prototype, 'updateChart');
  });

  afterEach(() => {
    ChartJS.prototype.updateChart.restore();
  });

  it('updates chart with new data', () => {
    const data = chartDataFactory();
    const wrapper = mount(<ChartJS type="line" data={data} />);
    const component = wrapper.instance();

    expect(component.chart_instance.config.data).toBe(data);

    const newData = chartDataFactory([10, 20, 60]);
    wrapper.setProps({ data: newData, type: 'line' });

    expect(ChartJS.prototype.updateChart.calledOnce).toEqual(true);
    expect(component.chart_instance.config.data).toBe(newData);
  });

  it('does not update chart if data doesnt change', () => {
    const data = chartDataFactory();
    const wrapper = mount(<ChartJS type="line" data={data} />);

    wrapper.setProps({ data, type: 'line' });

    expect(ChartJS.prototype.updateChart.calledOnce).toEqual(false);
  });
});
