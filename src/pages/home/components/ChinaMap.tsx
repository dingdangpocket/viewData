import axios from 'axios';
import * as echarts from 'echarts/core';
import { useEffect, useRef, useState } from 'react';
import { GeoComponent } from 'echarts/components';
import { MapChart } from 'echarts/charts';
import Styles from '../home.module.less';
import chinaMap from '../../china.json';
echarts.use([GeoComponent, MapChart]);
export default function ChinaMap() {
  const chartRef = useRef<HTMLInputElement>(null);
  const [charts, setCharts] = useState<any>();
  useEffect(() => {
    const chart = echarts.init(
      chartRef.current as unknown as HTMLCanvasElement,
    );
    echarts.registerMap('china', chinaMap as any);
    let option = {
      geo: {
        map: 'china',
        zoom: 1.2,
        itemStyle: {
          areaColor: '#e8e8e8',
        },
        label: { show: true },
        emphasis: {
          itemStyle: {
            areaColor: '#47a781',
          },
        },
      },
      tooltip: {
        show: true,
      },
      series: {
        type: 'map',
        geoIndex: 0,
        data: [
          { name: '山东', value: 0 },
          { name: '四川', value: 10 },
          { name: '山西', value: 100 },
        ],
      },
      visualMap: {
        type: 'piecewise',
        pieces: [
          { min: 0, max: 0, label: '0', color: '#64c977' },
          { min: 1, max: 9, label: '1-9', color: '#bdce52' },
          { min: 10, max: 100, label: '10-100', color: '#b76d6d' },
          { min: 100, max: 1000, label: '100-1000', color: '#e61111' },
        ],
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 2,
        inverse: false,
      },
    };
    chart.setOption(option);
    window.onresize = () => {
      chart.resize();
    };
  });
  return <div ref={chartRef} className={Styles.main}></div>;
}
