import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Styles from '../home.module.less';
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
export type Props = {
  data: number[] | undefined;
};
export default function SmoothChart(props: Props) {
  const chartRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const chart = echarts.init(
      chartRef.current as unknown as HTMLCanvasElement,
    );
    console.log('chart', chart);
    let option = {
      textStyle: { color: 'white' },
      backgroundColor: 'black',
      gradientColor:["red"],
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b} 点击数量 {c}'
      },
      series: [
        {
          data: props.data,
          type: 'line',
          smooth: true,
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
