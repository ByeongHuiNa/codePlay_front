import * as React from 'react';
import { Grid } from '../../../node_modules/@mui/material/index';
import ReactApexChart from 'react-apexcharts';
import { useAttendTotalState } from 'store/module';

export default function WeekAttendDonutChart() {
  const { total } = useAttendTotalState(); //주간근무시간

  // attend_total에서 시간을 추출
  const totalHours = parseInt(total.attend_total.split(':')[0]);
  console.log('attend_total: ' + total.attendDate);
  const totalMinutes = parseInt(total.attend_total.split(':')[1]);

  // 시간과 분을 합하여 8.0분 형식으로 변환
  const formattedTotal = `${totalHours}.${totalMinutes/60*100}`;
  // chart options
  const radialBarChartOptions = {
    chart: {
      type: 'radialBar',

      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px'
          },
          value: {
            fontSize: '16px'
          },
          total: {
            show: true,
            label: '총 근무시간',
            formatter: function () {
              console.log('토탈: ' + formattedTotal);
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return formattedTotal+"시간";
            }
          }
        },
        '연장근무시간' : {
          endAngle: 180
        },
        '근무시간' : {
          endAngle : 90
        }
      }
    },
    
    labels: ['연장근무시간', '근무시간'],
    colors: ['#FF5733', '#3498DB']
  };
  

  return (
    <>
      <Grid>
        <ReactApexChart options={radialBarChartOptions} series={[10, formattedTotal/40*100]} add={formattedTotal} type="radialBar" height={300} />
      </Grid>
    </>
  );
}
