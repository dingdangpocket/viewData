import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { ScatterChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Styles from '../home.module.less';

echarts.use([GridComponent, ScatterChart, CanvasRenderer, UniversalTransition]);

export default function ScatterDiagram() {
  const chartRef = useRef<HTMLInputElement>(null);
  const data = [
    [167, 55],
    [178, 60],
    [157, 44],
    [180, 70],
    [177, 65],
    [180, 70],
    [177, 65],
    [150, 40],
    [187, 85],
    [172, 60],
    [167, 55],
    [190, 80],
    [177, 70],
    [180, 69],
    [177, 65],
    [180, 70],
    [177, 65],
  ];
  useEffect(() => {
    const chart = echarts.init(
      chartRef.current as unknown as HTMLCanvasElement,
    );
    console.log('chart', chart);
    let option = {
      textStyle: { color: 'white' },
      backgroundColor: 'black',
      gradientColor: ['red'],
      xAxis: {
        type: 'value',
        scale: true,
      },
      //x轴
      yAxis: {
        type: 'value',
        scale: true,
      },
      //y轴
      series: [
        {
          name: '成都',
          type: 'scatter',
          data: data,
        },
      ],
    };
    chart.setOption(option);
    window.onresize = () => {
      chart.resize();
    };
  });
  return (
    <div ref={chartRef} className={Styles.main}>
      SmoothChart
    </div>
  );
}
