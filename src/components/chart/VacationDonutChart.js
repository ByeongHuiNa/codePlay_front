import * as React from 'react';
import { Grid, Typography } from '../../../node_modules/@mui/material/index';
import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import MainCard from 'components/MainCard';

// chart options
const barChartOptions = {
  chart: {
    type: 'donut',

    toolbar: {
      show: false,
      name
    }
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true
        }
      }
    }
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    categories: ['잔여휴가', '사용휴가'],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
};

export default function VacationDonutChart() {
  const newCategories = ['새로운 항목 1', '새로운 항목 2'];
  const series = [12, 3]; // 예시 데이터
  const [options, setOptions] = useState(barChartOptions);
  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          categories: newCategories,
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
        <Grid container rowSpacing={4} columnSpacing={1} sx={{mt:0.5}}>
          <Grid item xs={4}>
            <MainCard>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                전체 휴가
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                15
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={4}>
            <MainCard>
            <Typography variant="h5" style={{ textAlign: 'center' }}>
                사용 휴가
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                3
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={4}>
            <MainCard>
            <Typography variant="h5" style={{ textAlign: 'center' }}>
                잔여 휴가
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                12
              </Typography>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
