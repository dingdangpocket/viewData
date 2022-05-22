import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent, ToolboxComponent } from 'echarts/components';
import { LineChart ,BarChart} from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Styles from '../home.module.less';
echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  ToolboxComponent,
  BarChart
]);
export type Props = {
  data: number[] | undefined;
};
export default function SmoothChart(props: Props) {
  const chartRef = useRef<HTMLInputElement>(null);
  const data2=[232,3234,545,67,899,23,100]
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
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
      },
      //xz轴
      yAxis: {
        type: 'value',
      },
      //y轴
      tooltip: {
        trigger: 'axis',
        formatter: '{b} 点击数量 {c}',
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
          name:"成都",
          data: props.data,
          type: 'line',
          smooth: true,
        },
        {
          name:'北京',
          data: data2,
          type: 'line',
          smooth: true,
        },
      ],
      //值
      legend:{
        data:["成都","北京"]
        //匹配series中的name进行展示筛选;
      }
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
