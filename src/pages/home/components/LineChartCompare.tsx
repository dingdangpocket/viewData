import React, { ReactNode, useEffect, useRef } from 'react';
import Styles from '../home.module.less';
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  VisualMapComponent,
  MarkLineComponent,
  DataZoomComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  VisualMapComponent,
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  MarkLineComponent,
  DataZoomComponent,
]);
export type Props = {
  data: any[] | undefined;
};
export default function LineChartCompare(props: Props) {
  const chartRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (props.data) {
      const chart = echarts.init(
        chartRef.current as unknown as HTMLCanvasElement,
      );
      console.log('chart', chart);
      let option = {
        textStyle: { color: 'white' },
        backgroundColor: 'black',
        gradientColor: ['#f6efa6'],
        title: {
          triggerEvent: true,
          show: true,
          text: '数据走势',
          subtext: '辰木互动',
          left: 'center',
          //   link: 'http://www.baidu.com',
          //   target: 'blank',
          textStyle: {
            color: 'white',
            fontSize: 30,
            // textBorderColor: 'rgba(142, 47, 47, 1)',
            // textBorderWidth: 4,
          },
          subtextStyle: {
            color: 'white',
            fontSize: 10,
            // textBorderColor: 'rgba(142, 47, 47, 1)',
            // textBorderWidth: 4,
          },
          rich: {
            a: {
              color: 'red',
              lineHeight: 10,
            },
            x: {
              fontSize: 18,
              fontFamily: 'Microsoft YaHei',
              borderColor: '#449933',
              borderRadius: 4,
            },
          },
        },
        // legend: 'plain',
        legend: {
          show: true,
        },
        xAxis: {
          type: 'category',
          name: '年份',
          offset: 5,
          nameTextStyle: { fontSize: 20 },
          nameGap: 30,
          boundaryGap: true,
          triggerEvent: true,
          axisTick: {
            show: true,
            inside: true,
            length: 7,
          },
          axisLabel: {
            color: 'red',
          },
        },
        //X轴配置;
        yAxis: {
          name: '收入',
          nameTextStyle: { fontSize: 20 },
          // min:10000,
          // max:30000,
        },
        tooltip: {
          trigger: 'axis',
          //axis轴上;
          //item数据内部;
          backgroundColor: '#2a293d',
          textStyle: { color: 'white' },
        },
        dataset: [
          {
            id: 'dataset_raw',
            source: props.data,
          },
          {
            id: 'dataset_since_1950_of_australia',
            fromDatasetId: 'dataset_raw',
            transform: {
              type: 'filter',
              config: {
                and: [
                  { dimension: '年份', gte: 1800 },
                  { dimension: '国家', '=': 'Australia' },
                ],
              },
            },
          },
          {
            id: 'dataset_since_1950_of_germany',
            fromDatasetId: 'dataset_raw',
            transform: {
              type: 'filter',
              config: {
                and: [
                  { dimension: '年份', gte: 1800 },
                  { dimension: '国家', '=': 'Germany' },
                ],
              },
            },
          },
          {
            id: 'dataset_since_1950_of_france',
            fromDatasetId: 'dataset_raw',
            transform: {
              type: 'filter',
              config: {
                and: [
                  { dimension: '年份', gte: 1800 },
                  { dimension: '国家', '=': 'France' },
                ],
              },
            },
          },
        ],
        dataZoom: [
          {
            startValue: '1800',
          },
          {
            type: 'inside',
          },
        ],
        series: [
          {
            type: 'line',
            datasetId: 'dataset_since_1950_of_australia',
            showSymbol: false,
            encode: {
              x: '年份',
              y: '收入',
              itemName: 'Year',
              tooltip: ['国家', '收入', '人口'],
            },
          },
          {
            type: 'line',
            datasetId: 'dataset_since_1950_of_germany',
            showSymbol: false,
            encode: {
              x: '年份',
              y: '收入',
              itemName: 'Year',
              tooltip: ['国家', '收入', '人口'],
            },
          },
          {
            type: 'line',
            datasetId: 'dataset_since_1950_of_france',
            showSymbol: false,
            encode: {
              x: '年份',
              y: '收入',
              itemName: 'Year',
              tooltip: ['国家', '收入', '人口'],
            },
          },
        ],
      };
      chart.setOption(option);
      chart.on('click', (e) => {
        console.log('click', e);
      });
      window.onresize = () => {
        chart.resize();
      };
    }
  });
  return <div ref={chartRef} className={Styles.main}></div>;
}
