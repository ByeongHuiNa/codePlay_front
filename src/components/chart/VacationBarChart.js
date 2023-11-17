import * as React from 'react';
import { Grid } from '../../../node_modules/@mui/material/index';
import ReactApexChart from 'react-apexcharts';

export default function VacationBarChart() {
  // chart options
  const VacationBarCharttOptions = {
    series: [
      {
        name: '사용휴가',
        data: [12, 15, 16, 17, 18]
      },
      {
        name: '잔여휴가',
        data: [12, 15, 16, 17, 18]
      }
    ],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: '개발1팀 휴가보유 현황 차트'
    },
    xaxis: {
      categories: ['이철우', '이철우', '이철우', '이철우', '이철우', '이철우', '이철우'],
      labels: {
        formatter: function (val) {
          return val + '일';
        }
      }
    },
    yaxis: {
      title: {
        text: undefined
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '일';
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  };

  return (
    <>
      {
        <Grid>
          <ReactApexChart options={VacationBarCharttOptions} series={VacationBarCharttOptions.series} type="bar" height={480} />
        </Grid>
      }
    </>
  );
}
