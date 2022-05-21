import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import LineChartCompare from './components/LineChartCompare';
import SmoothChart from './components/SmoothChart';
export type Item = {};
export default function home(props: any) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    void (async () => {
      const res = await axios({
        method: 'GET',
        url: 'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/life-expectancy-table.json',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('key', JSON.stringify(res.data));
      setData([...res.data]);
    })();
  }, []);

  const computedRes = useMemo(() => {
    if (data.length === 0) return;
    data[0] = ['收入', '预期寿命', '人口', '国家', '年份'];
    return data;
  }, [data]);
  //lineChartCpmputed...
  return (
    <>
      <LineChartCompare data={computedRes}></LineChartCompare>
      <SmoothChart data={[820, 932, 901, 934, 1290, 1330, 20]}></SmoothChart>
    </>
  );
}
