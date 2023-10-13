// material-ui
import { Typography, Grid, Tabs, Tab, Box } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// project import
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';


import ReactApexChart from 'react-apexcharts';
import BasicTab from 'components/tab/BasicTab';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
//import OrderTable from './dashboard/OrdersTable';
import AttendanceTable from 'components/table/AttendanceTable';
import IncompleteTable from 'components/table/IncompleteTable';
import { FormControl, InputLabel, MenuItem } from '../../node_modules/@mui/material/index';
import Select from '@mui/material/Select';



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

  const [age, setAge] = useState(0);

  const handleChange2 = (event) => {
    setAge(event.target.value);
  };

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
      <Typography variant="h5">휴가현황조회페이지</Typography>
    </Grid>
    <Grid container rowSpacing={4} columnSpacing={2.75}>
      {/* row 2 */}
      <Grid item xs={12} sm={6} md={5} lg={7}>
        <MainCard title="결재진행중">
          <Box sx={{ minWidth: 40 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">월</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="month"
                onChange={handleChange2}
              >
                <MenuItem value={10}>10월</MenuItem>
                <MenuItem value={9}>9월</MenuItem>
                <MenuItem value={8}>8월</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <IncompleteTable/>
        </MainCard>
      </Grid>
    
      {/* row 2 - 결재완료 그리드 */}
      <Grid item xs={12} sm={6} md={5} lg={7}>
        <MainCard title="결재완료">
        <Box sx={{ minWidth: 40 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">월</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="month"
                onChange={handleChange2}
              >
                <MenuItem value={10}>10월</MenuItem>
                <MenuItem value={9}>9월</MenuItem>
                <MenuItem value={8}>8월</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <IncompleteTable/>
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
      <Typography variant="h5">출/퇴근현황조회페이지</Typography>
    </Grid>
    <Grid container rowSpacing={4} columnSpacing={2.75}>
      {/* row 2 */}
      <Grid item xs={8} >
        <MainCard title="출/퇴근 현황">
        <Box sx={{ minWidth: 40 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">월</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="month"
                onChange={handleChange2}
              >
                <MenuItem value={10}>10월</MenuItem>
                <MenuItem value={9}>9월</MenuItem>
                <MenuItem value={8}>8월</MenuItem>
              </Select>
            </FormControl>
          </Box>
        <Grid container rowSpacing={4} columnSpacing={2.75}>
          <Grid item xs={3}>
            <AnalyticEcommerce title="전체" count="7"  />
          </Grid>
          <Grid item xs={3}>
            <AnalyticEcommerce title="정상" count="7"  />
          </Grid>
          <Grid item xs={3}>
            <AnalyticEcommerce title="근태이상" count="0"  />
          </Grid>
          <Grid item xs={3}>
            <AnalyticEcommerce title="휴가" count="0"  />
          </Grid>
          </Grid>
          
          
          
          
          <AttendanceTable/>
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
