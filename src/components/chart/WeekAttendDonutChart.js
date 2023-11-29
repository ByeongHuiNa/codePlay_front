import * as React from 'react';
import { Grid } from '../../../node_modules/@mui/material/index';
import ReactApexChart from 'react-apexcharts';
import { useAttendTotalOverState, useAttendTotalState } from 'store/module';

export default function WeekAttendDonutChart() {
  const { total } = useAttendTotalState(); //주간정규근무시간합

  const { overTotal } = useAttendTotalOverState(); //주간정규근무시간합

  // attend_total에서 시간을 추출

  console.log('정규토탈: ' + total.attend_total);
  console.log('초과토탈: ' + overTotal.attend_total);

  const totalHours1 = parseInt(total.attend_total.split(':')[0]);
  console.log('attend_total 타입: ' + totalHours1);
  const totalMinutes1 = parseInt(total.attend_total.split(':')[1]);
  console.log('attend_total 분11: ' + totalMinutes1);
  // 시간과 분을 합하여 8.0분 형식으로 변환
  const formattedTotal1 = parseInt(`${totalHours1}`);
  console.log('attend_total 시 분: ' + typeof formattedTotal1);

  const totalHours2 = parseInt(overTotal.attend_total.split(':')[0]);
  console.log('attend_total 시: ' + totalHours2);
  const totalMinutes2 = parseInt(overTotal.attend_total.split(':')[1]);
  console.log('attend_total 분22: ' + totalMinutes2);
  // 시간과 분을 합하여 8.0분 형식으로 변환
  const formattedTotal2 = parseInt(`${totalHours2}`);
  console.log('attend_total 시 분: ' + formattedTotal2);
  console.log('분합: ' + parseInt(totalMinutes1 + totalMinutes2));

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
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return formattedTotal1 + formattedTotal2 + '시간' + parseInt(totalMinutes1 + totalMinutes2) + '분';
            }
          }
        }
      }
    },

    labels: ['초과근무시간', '정규근무시간'],
    colors: ['#FF5733','#3498DB'],
    legend: {
      show: true
    }
  };

  return (
    <>
      {
        <Grid>
          <ReactApexChart
            options={radialBarChartOptions}
            series={[(formattedTotal2 / 12).toFixed(1) * 100, (formattedTotal1 / 40).toFixed(2) * 100]}
            add={formattedTotal1}
            type="radialBar"
            height={400}
          />
        </Grid>
      }
    </>
  );
}
