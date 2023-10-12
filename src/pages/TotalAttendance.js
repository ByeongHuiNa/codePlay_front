// material-ui
import { Typography, Grid, Tabs, Tab, Box } from '@mui/material';
//import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';


import ReactApexChart from 'react-apexcharts';
import BasicTab from 'components/tab/BasicTab';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import OrderTable from './dashboard/OrdersTable';


// ==============================|| SAMPLE PAGE ||============================== //
// chart options
const barChartOptions = {
  chart: {
    type: 'pie',
    height: 365,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    pie: {
      columnWidth: '45%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['잔여휴가', '사용휴가'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
};



const TotalAttendancePage = () => {
  const newCategories = ['새로운 항목 1', '새로운 항목 2'];
  const series = [15, 3]; // 예시 데이터
  const [options, setOptions] = useState(barChartOptions);
  const theme = useTheme();
  

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;


  // const [series] = useState([
  //   {
  //     data: [80, 95, 70, 42, 65, 55, 78]
  //   }
  // ]);

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

  return(
    <ComponentSkeleton>
     
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
       <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="휴가" />
                <Tab label="출/퇴근" />
      </Tabs>
      </Box>
      
      
    {/* row 1 */}
    <BasicTab value={value} index={0}>
    <Grid item xs={12} sx={{ mb: 5 }}>
      <Typography variant="h5">근태현황조회페이지</Typography>
    </Grid>
    <Grid container rowSpacing={4} columnSpacing={2.75}>
      {/* row 2 */}
      <Grid item xs={12} sm={6} md={5} lg={7}>
        <MainCard title="결재진행중">
          <Typography variant="body2">
            2023.10.23 연차
          </Typography>
        </MainCard>
      </Grid>
    
      {/* row 2 - 결재완료 그리드 */}
      <Grid item xs={12} sm={6} md={5} lg={7}>
        <MainCard title="결재완료">
          <Typography variant="body2">
          2023.10.23 연차
          </Typography>
        </MainCard>
      </Grid>
  
      {/* row 3 - 휴가현황 그리드 */}
        <Grid item xs={12} sm={7} md={5} lg={4}>
          <MainCard title="휴가현황" sx={{ marginTop: -20 }}>
            <ReactApexChart options={options} series={series} type="pie" height={365} />
          </MainCard>
        </Grid>
      </Grid>
    </BasicTab>

    <BasicTab value={value} index={1}>

    <Grid item xs={12} sx={{ mb: 5 }}>
      <Typography variant="h5">근태현황조회페이지</Typography>
    </Grid>
    <Grid container rowSpacing={4} columnSpacing={2.75}>
      {/* row 2 */}
      <Grid item xs={8} >
        <MainCard title="출/퇴근 현황">
          <OrderTable/>
        </MainCard>
      </Grid>
    
      
  
      {/* row 3 - 근태현황 그리드 */}
        <Grid item xs={4}>
          <MainCard title="근태현황" >
            <ReactApexChart options={options} series={series} type="pie" height={365} />
          </MainCard>
        </Grid>
      </Grid>


    </BasicTab>
    
  </ComponentSkeleton>
  
  
  );
  

  
};

export default TotalAttendancePage;
