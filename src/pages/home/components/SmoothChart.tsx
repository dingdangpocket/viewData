import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  GridComponent,
  ToolboxComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
} from 'echarts/components';
import { LineChart, BarChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Styles from '../home.module.less';
echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  ToolboxComponent,
  BarChart,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
]);
export type Props = {
  data?: number[] | undefined;
};
export default function SmoothChart(props: Props) {
  
  const chartRef = useRef<HTMLInputElement>(null);
  const data1 = [200, 3234, 545, 67, 899, 600, 380];
  const data2 = [820, 932, 901, 934, 1290, 1330, 20];

  useEffect(() => {
    const chart = echarts.init(
      chartRef.current as unknown as HTMLCanvasElement,
    );
    // echarts 全局对象
    // chart 当前实例
    console.log('chart', chart);
    let option = {
      textStyle: { color: 'white' },
      backgroundColor: 'black',
      gradientColor: ['red'],
      grid: {
        show: true,
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          //inside
        },
        {
          type: 'slider',
          yAxisIndex: 0,
        },
      ],
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
        boundaryGap: false,
        //x轴数据;
      },
      //x轴
      yAxis: {
        type: 'value',
        // scale:true,
        //自动从series匹配;
      },
      //y轴
      tooltip: {
        trigger: 'axis',
        // formatter: '{b} 点击数量 {c}',
        // formatter:(e:any)=>{
        //   return JSON.stringify(e[0].data)
        // }
      },
      //图表提示
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {},
          dataView: {},
          dataZoom: {},
          magicType: {
            type: ['bar', 'line'],
          },
        },
      },
      //通用工具
      series: [
        {
          name: '成都',
          type: 'line',
          data: data1,
          // stack: 'key',
          //堆叠数据;
          smooth: true,
          lineStyle: {
            color: 'red',
          },
          // areaStyle: {
          //   color: 'red',
          // },
          markPoint: {
            data: [
              {
                type: 'max',
              },
              {
                type: 'min',
              },
            ],
          },
          markLine: {
            data: [
              {
                type: 'average',
              },
            ],
          },
          markArea: {
            data: [[{ xAxis: '周一' }, { xAxis: '周三' }]],
          },
        },
        {
          name: '北京',
          type: 'line',
          data: data2,
          // stack: 'key',
          //堆叠数据;
          smooth: true,
          markPoint: {
            data: [
              {
                type: 'max',
              },
              {
                type: 'min',
              },
            ],
          },
          markLine: {
            data: [
              {
                type: 'average',
              },
            ],
          },
        },
      ],
      //值
      legend: {
        data: ['成都', '北京'],
        //匹配series中的name进行展示筛选;
      },
      //筛选值
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
