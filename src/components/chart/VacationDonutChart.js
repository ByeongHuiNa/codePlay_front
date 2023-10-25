import * as React from 'react';
import { Grid, Typography } from '../../../node_modules/@mui/material/index';
import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import MainCard from 'components/MainCard';
import { useLeaveState } from 'store/module';
import axios from '../../../node_modules/axios/index';

// chart options
const barChartOptions = {
  chart: {
    type: 'donut',

    toolbar: {
      show: false,
      
    }
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true,
            label: '전체 휴가',
            fontSize: '12px',
            color: 'black'
          }
        }
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  labels: ['사용연차', '잔여연차'],
  
  // xaxis: {
  //   categories: ['잔여휴가', '사용휴가'],
  //   axisBorder: {
  //     show: false
  //   },
  //   axisTicks: {
  //     show: false
  //   }
  // },
  // yaxis: {
  //   show: false
  // },
  // grid: {
  //   show: false
  // }
};

export default function VacationDonutChart() {
  //const newCategories = ['새로운 항목 1', '새로운 항목 2'];

  const [options, setOptions] = useState(barChartOptions);
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const { leave, setLeave } = useLeaveState(); //휴가불러오기 
  const [series, setSeries] = useState([0, 0]); //잔여휴가

  useEffect(() => {
    async function get() {
      const endPoints = ['http://localhost:8000/user_leave'];
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      setLeave(result[0].data[0]);
      setSeries([result[0].data[0].leave_remain, result[0].data[0].leave_use]);
    }
    get();
  }, []);
 

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary]
          }
        }
      },
      tooltip: {
        theme: 'light'
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary]);

  return (
    <>
      <Grid>
        <ReactApexChart options={options} series={series} type="donut" height={190} />
        <Grid container rowSpacing={4} columnSpacing={1} sx={{ mt: 0.5 }}>
          <Grid item xs={4}>
            <MainCard>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                전체 휴가
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {leave.leave_total}
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={4}>
            <MainCard>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                사용 휴가
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {leave.leave_use}
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={4}>
            <MainCard>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                잔여 휴가
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {leave.leave_remain}
              </Typography>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
