import expect from 'expect'
import React from 'react'
import { mount } from 'enzyme';

import ChartJS from 'src/'

describe('Component Mounting', () => {
  it('render canvas with height and width', () => {
    const component = mount(
      <ChartJS width={200} height={200} options={{responsive: false}}/>
    );
    const canvas = component.find('canvas').get(0);
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(200);
  });

  it('sets chart type', () => {
    const component = mount(<ChartJS type="line" />).instance();
    expect(component.chart_instance.config.type).toBe('line');
  });

  it('sets chart data', () => {
    const data = chartDataFactory([10, 20, 30])
    const component = mount(<ChartJS type="line" data={data} />).instance();

    expect(component.chart_instance.config.data).toBe(data);
  });
})

describe('Component Unmounting', () => {
  it('should remove chart canvas', () => {
    const wrapper = mount(<ChartJS />)
    const component = wrapper.instance();
    expect(component.chart_instance.canvas).toNotBe(null);

    wrapper.unmount();
    expect(component.chart_instance.canvas).toBe(null);
  });
})

describe('Component Re-rendering', () => {
  it('changes chart data', () => {
    let data = chartDataFactory([10, 20, 30]);
    const wrapper = mount(<ChartJS type="line" data={data} />);
    const component = wrapper.instance();

    expect(component.chart_instance.config.data).toBe(data);

    let newData = chartDataFactory([10,20,60]);
    wrapper.setProps({ data: newData, type: 'line' });

    expect(component.chart_instance.config.data).toBe(newData);
  });
})

function chartDataFactory(data) {
  return {
    datasets: [{
      data: data,
      backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
      hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
    }],
    labels: ['Red', 'Yellow', 'Blue']
  };
}
