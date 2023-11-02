// material-ui
import { Typography, Grid, Tabs, Tab, Box } from '@mui/material';
//import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// project import
import MainCard from 'components/MainCard';
import { useState } from 'react';
import LeaveModal from 'components/Modal/LeaveModal';

// material-ui

import BasicTab from 'components/tab/BasicTab';

//import OrderTable from './dashboard/OrdersTable';
import AttendanceTable from 'components/Table/AttendanceTable';
import AppLeaveTotalTable from 'components/Table/AppLeaveTotalTable';
import VacationDonutChart from 'components/chart/VacationDonutChart';
import UnappLeaveTotalTable from 'components/Table/UnappLeaveTotalTable';
import { FormControl, NativeSelect } from '../../node_modules/@mui/material/index';
import AttendChart from 'components/chart/AttendChart';

const UserAttendanceTotalPage = () => {
  //결재대기 내역 이번달로 설정
  const [month1, setMonth1] = useState(new Date().getMonth() + 1);
  //결재완료 내역 이번달로 설정
  const [month2, setMonth2] = useState(new Date().getMonth() + 1);
  const now = new Date(); // 현재 날짜와 시간
  const currentDay = now.getDay(); // 현재 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  
  // 현재 주의 일요일 날짜를 계산
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - currentDay);
  
  // 현재 주의 월요일부터 토요일까지의 날짜를 계산하고 포맷팅
  const daysOfWeek = [];
  const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' };
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const formattedDate = date.toLocaleDateString('ko-KR', dateOptions);
    daysOfWeek.push(formattedDate);
  }
  


 
  // 휴가 신청 내역 확인 모달창
  const [modalOpen, setModalOpen] = useState(false);
  // 조회할 데이터 선택
  const [modalData, setModalData] = useState({});
  const handleOpen = (data) => {
    setModalData(data);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const month1Change = (event) => {
    setMonth1(event.target.value);
  };

  const month2Change = (event) => {
    setMonth2(event.target.value);
  };

  const [month3, setMonth3] = useState(new Date().getMonth() + 1); //출퇴근현황 현재달

  const month3Change = (event) => {
    setMonth3(event.target.value);
  };

  return (
    <>
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
          {/* row 3 - 휴가현황 그리드 */}
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <MainCard>
              <Typography variant="h5">휴가현황</Typography>
              <VacationDonutChart />
            </MainCard>
          </Grid>
          {/* row 2 */}
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <MainCard>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5">{month1}월 결재대기내역</Typography>

                <FormControl sx={{ marginLeft: 3 }}>
                  {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    월
                  </InputLabel> */}
                  <NativeSelect
                    defaultValue={month1}
                    onChange={month1Change}
                    inputProps={{
                      name: 'month',
                      id: 'uncontrolled-native'
                    }}
                  >
                    <option value={12}>12월</option>
                    <option value={11}>11월</option>
                    <option value={10}>10월</option>
                    <option value={9}>9월</option>
                    <option value={8}>8월</option>
                    <option value={7}>7월</option>
                    <option value={6}>6월</option>
                    <option value={5}>5월</option>
                    <option value={4}>4월</option>
                    <option value={3}>3월</option>
                    <option value={2}>2월</option>
                    <option value={1}>1월</option>
                  </NativeSelect>
                </FormControl>
              </div>

              <UnappLeaveTotalTable handleOpen={handleOpen} month={month1} />
            </MainCard>
          </Grid>

          {/* row 2 - 결재완료 그리드 */}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MainCard>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5">{month2}월 결재 진행/완료내역</Typography>

                <FormControl sx={{ marginLeft: 3 }}>
                  
                  <NativeSelect
                    defaultValue={month2}
                    onChange={month2Change}
                    inputProps={{
                      name: 'month',
                      id: 'uncontrolled-native'
                    }}
                  >
                    <option value={12}>12월</option>
                    <option value={11}>11월</option>
                    <option value={10}>10월</option>
                    <option value={9}>9월</option>
                    <option value={8}>8월</option>
                    <option value={7}>7월</option>
                    <option value={6}>6월</option>
                    <option value={5}>5월</option>
                    <option value={4}>4월</option>
                    <option value={3}>3월</option>
                    <option value={2}>2월</option>
                    <option value={1}>1월</option>
                  </NativeSelect>
                </FormControl>
              </div>
              <AppLeaveTotalTable handleOpen={handleOpen} month={month2}/>

              
              <LeaveModal open={modalOpen} handleClose={handleClose} data={modalData}/>
            </MainCard>
          </Grid>
        </Grid>
      </BasicTab>

      {/* tab 2 */}
      <BasicTab value={value} index={1}>
        <Grid container rowSpacing={1} columnSpacing={1}>
          {/* row 2 */}
          <Grid item xs={12}>
            <MainCard>
              <Typography align="left" variant="h5">
                금주 근무 시간
              </Typography>
              <AttendChart
                chart={{
                  labels: daysOfWeek,
                  series: [
                    {
                      name: '정상근무',
                      type: 'column',
                      fill: 'solid',
                      data: [8, 8, 8, 8, 4, 8, 8]
                    },
                    {
                      name: '초과근무',
                      type: 'column',
                      fill: 'solid',
                      data: [0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                      name: '휴가',
                      type: 'column',
                      fill: 'solid',
                      data: [0, 0, 0, 0, 4, 0, 0]
                    }
                  ]
                }}
              />
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5">{month3}월 출/퇴근 현황</Typography>

                <FormControl sx={{ marginLeft: 3 }}>
                  <NativeSelect
                    defaultValue={month3}
                    onChange={month3Change}
                    inputProps={{
                      name: 'month',
                      id: 'uncontrolled-native'
                    }}
                  >
                    <option value={12}>12월</option>
                    <option value={11}>11월</option>
                    <option value={10}>10월</option>
                    <option value={9}>9월</option>
                    <option value={8}>8월</option>
                    <option value={7}>7월</option>
                    <option value={6}>6월</option>
                    <option value={5}>5월</option>
                    <option value={4}>4월</option>
                    <option value={3}>3월</option>
                    <option value={2}>2월</option>
                    <option value={1}>1월</option>
                  </NativeSelect>
                </FormControl>
              </div>
              <AttendanceTable month={month3}/>
            </MainCard>
          </Grid>

          {/* row 3 - 근태현황 그리드 */}
          {/* <Grid item xs={4}>
            <MainCard title="근태현황">
              <VacationDonutChart />
            </MainCard>
          </Grid> */}
        </Grid>
      </BasicTab>
      </>
  );
};

export default UserAttendanceTotalPage;
