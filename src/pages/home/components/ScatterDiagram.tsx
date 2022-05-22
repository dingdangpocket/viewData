import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { ScatterChart,EffectScatterChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Styles from '../home.module.less';

echarts.use([GridComponent, ScatterChart, CanvasRenderer, UniversalTransition,EffectScatterChart]);

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
    [197, 100],
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
          type:"effectScatter",
          //showEffectOn:'emphasis',
          //hover触发涟漪;
          rippleEffect:{
              scale:3
          },
          name: '成都',
          data: data,
          symbolSize: (arg: any) => {
            console.log(arg);
            let height = arg[0];
            let weight = arg[1];
            let zoom = height / weight;
            return JSON.stringify(zoom * 5);
          },
          //散点大小
          itemStyle: {
            color: (arg: any) => {
              if (arg.data[0] < 170) {
                return 'red';
              } else {
                return 'green';
              }
            },
          },
          //散点样式
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
