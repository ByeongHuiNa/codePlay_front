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
//import OrderTable from './dashboard/OrdersTable';
import AttendanceTable from 'components/Table/AttendanceTable';
import IncompleteTable from 'components/Table/IncompleteTable';
import { Button, FormControl, InputLabel, MenuItem, Modal } from '../../node_modules/@mui/material/index';
import Select from '@mui/material/Select';

// chart options
const barChartOptions = {
  chart: {
    type: 'pie',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    pie: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
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
//모달창 옵션
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const UserAttendanceTotalPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const newCategories = ['새로운 항목 1', '새로운 항목 2'];
  const series = [12, 3]; // 예시 데이터
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

  return (
    <ComponentSkeleton>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="휴가" />
          <Tab label="출/퇴근" />
        </Tabs>
      </Box>

      {/* tab 1 */}
      {/* row 1 */}
      <BasicTab value={value} index={0}>
        <Grid container rowSpacing={4} columnSpacing={2.75}>
          {/* row 2 */}
          <Grid item xs={12} sm={6} md={5} lg={7}>
            <MainCard>
                <Typography variant="h5">결재대기내역</Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">월</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="month" onChange={handleChange2}>
                    <MenuItem value={10}>10월</MenuItem>
                    <MenuItem value={9}>9월</MenuItem>
                    <MenuItem value={8}>8월</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <IncompleteTable />
            </MainCard>
          </Grid>

          {/* row 2 - 결재완료 그리드 */}
          <Grid item xs={12} sm={6} md={5} lg={7}>
            <MainCard>
            <Typography variant="h5">결재대기내역</Typography>
              <Box sx={{ minWidth: 40 }}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">월</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="month" onChange={handleChange2}>
                    <MenuItem value={10}>10월</MenuItem>
                    <MenuItem value={9}>9월</MenuItem>
                    <MenuItem value={8}>8월</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <IncompleteTable />
              <Button onClick={handleOpen}>Open modal</Button>
              <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h3" component="h3" sx={{ textAlign: 'center' }}>
                    휴가신청서
                  </Typography>
                  <hr></hr>
                  <div>
                    <Grid container rowSpacing={4} columnSpacing={2.75} sx={{ border: '1px solid', marginTop: 5 }}>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          제목
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          20231012 반차
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          작성일자
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          2023.10.10
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          기안자
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          나병희
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          수신참조
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5"></Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          참조문서
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5"></Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          시행자
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          휴가구분
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          시작일자-종료일자
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          2023.10.10-2023.10.10
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          시작시간-종료시각
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          09:00~14:00
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          소요시간
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          0.5일
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          휴가차감
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          0.5개
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          휴가사유
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          연차소진
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                        <Button variant="outlined" size="large" onClick={handleClose}>
                          확인
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Box>
              </Modal>
            </MainCard>
          </Grid>

          {/* row 3 - 휴가현황 그리드 */}
          <Grid item xs={12} sm={7} md={5} lg={4}>
            <MainCard title="휴가현황">
              <ReactApexChart options={options} series={series} type="donut" height={365} />
              <Grid container rowSpacing={4} columnSpacing={2.75}>
                <Grid item xs={4}>
                  <MainCard title="전체휴가">
                    <Typography variant="h3">15</Typography>
                  </MainCard>
                </Grid>
                <Grid item xs={4}>
                  <MainCard title="사용휴가">
                    <Typography variant="h3">4</Typography>
                  </MainCard>
                </Grid>
                <Grid item xs={4}>
                  <MainCard title="잔여휴가">
                    <Typography variant="h3">11</Typography>
                  </MainCard>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </BasicTab>

      {/* tab 2 */}
      <BasicTab value={value} index={1}>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Typography variant="h5">출/퇴근현황조회페이지</Typography>
        </Grid>
        <Grid container rowSpacing={4} columnSpacing={2.75}>
          {/* row 2 */}
          <Grid item xs={8}>
            <MainCard title="출/퇴근 현황">
              <Box sx={{ minWidth: 40 }}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">월</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="month" onChange={handleChange2}>
                    <MenuItem value={10}>10월</MenuItem>
                    <MenuItem value={9}>9월</MenuItem>
                    <MenuItem value={8}>8월</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Grid container rowSpacing={4} columnSpacing={2.75}>
                <Grid item xs={3}>
                  <MainCard title="전체">
                    <Typography variant="h4">7건</Typography>
                  </MainCard>
                </Grid>
                <Grid item xs={3}>
                  <MainCard title="정상">
                    <Typography variant="h4">7건</Typography>
                  </MainCard>
                </Grid>
                <Grid item xs={3}>
                  <MainCard title="근태이상">
                    <Typography variant="h4">0건</Typography>
                  </MainCard>
                </Grid>
                <Grid item xs={3}>
                  <MainCard title="휴가">
                    <Typography variant="h4">0건</Typography>
                  </MainCard>
                </Grid>
              </Grid>

              <AttendanceTable />
            </MainCard>
          </Grid>

          {/* row 3 - 근태현황 그리드 */}
          <Grid item xs={4}>
            <MainCard title="근태현황">
              <ReactApexChart options={options} series={series} type="pie" height={365} />
            </MainCard>
          </Grid>
        </Grid>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default UserAttendanceTotalPage;
