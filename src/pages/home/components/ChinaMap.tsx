import axios from 'axios';
import * as echarts from 'echarts/core';
import { useEffect, useRef, useState } from 'react';
import { GeoComponent } from 'echarts/components';
import Styles from '../home.module.less';
import chinaMap from '../../china.json';
echarts.use([GeoComponent]);
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
      },
    };
    chart.setOption(option);
    window.onresize = () => {
      chart.resize();
    };
  });
  return <div ref={chartRef} className={Styles.main}></div>;
}
