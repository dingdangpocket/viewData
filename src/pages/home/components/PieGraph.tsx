import React, { useEffect, useRef, useState } from 'react';
import Styles from '../home.module.less';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

export default function PieGraph() {
  const chartRef = useRef<HTMLInputElement>(null);
  const [charts, setCharts] = useState<any>();
  const data1 = [200, 3234, 545, 67, 899, 600, 380];
  const data2 = [820, 932, 901, 934, 1290, 1330, 20];
  useEffect(() => {
    const chart = echarts.init(
      chartRef.current as unknown as HTMLCanvasElement,
    );
    setCharts(chart);
    console.log('chart', chart);
    let option = {
      title: {
        text: '标题',
        subtext: '副标题',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: (e: any) => {
          return `${e.data.name}消费${e.data.value}元`;
        },
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['天猫', '京东'],
      },
      series: [
        {
          name: '消费',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '天猫' },
            { value: 735, name: '京东' },
            { value: 580, name: '抖音' },
            { value: 484, name: '淘宝' },
            { value: 300, name: '亚马逊' },
          ],
          roseType: 'radius',
          //比例切分;
          selectedMode: 'single',
          //单个选择;
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          //hover样式;
        },
      ],
    };
    chart.setOption(option);
    chart.on('legendselectchanged', (e) => {
      console.log('图例更改', e);
    });
    chart.off('click');
    window.onresize = () => {
      chart.resize();
    };
  });
  const dispatch = () => {
    charts.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex:0,
    });
    charts.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex:0,
      });
  };
  //自定义事件;
  return (
    <>
      <div onClick={() => dispatch()}>dispatch事件</div>
      <div ref={chartRef} className={Styles.main}>
        SmoothChart
      </div>
    </>
  );
}
