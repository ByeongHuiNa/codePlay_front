// material-ui
import { Typography, Grid, Tabs, Tab, Box } from '@mui/material';
//import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// project import
import MainCard from 'components/MainCard';
import { useState } from 'react';
import LeaveModal from 'components/Modal/LeaveModal';

// material-ui

import BasicTab from 'components/tab/BasicTab';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
//import OrderTable from './dashboard/OrdersTable';
import AttendanceTable from 'components/Table/AttendanceTable';
import AppLeaveTotalTable from 'components/Table/AppLeaveTotalTable';
import VacationDonutChart from 'components/chart/VacationDonutChart';
import UnappLeaveTotalTable from 'components/Table/UnappLeaveTotalTable';
import { Button, FormControl, InputLabel, MenuItem, NativeSelect } from '../../node_modules/@mui/material/index';
import Select from '@mui/material/Select';


const UserAttendanceTotalPage = () => {
  //결재대기 내역 이번달로 설정
  const [month1, setMonth1] = useState(new Date().getMonth() + 1);
  //결재완료 내역 이번달로 설정
  const [month2, setMonth2] = useState(new Date().getMonth() + 1);

  //const [open, setOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
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
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    월
                  </InputLabel>
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
                  </NativeSelect>
                </FormControl>
              </div>

              <UnappLeaveTotalTable />
            </MainCard>
          </Grid>

          {/* row 2 - 결재완료 그리드 */}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MainCard>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5">{month2}월 결재완료내역</Typography>

                <FormControl sx={{ marginLeft: 3 }}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    월
                  </InputLabel>
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
                  </NativeSelect>
                </FormControl>
              </div>
              <AppLeaveTotalTable />

              <Button onClick={handleOpen}>Open modal</Button>
              {modalOpen && <LeaveModal open={handleOpen} handleClose={handleClose} />}
              
            </MainCard>
          </Grid>
        </Grid>
      </BasicTab>

      {/* tab 2 */}
      <BasicTab value={value} index={1}>
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
              <VacationDonutChart />
            </MainCard>
          </Grid>
        </Grid>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default UserAttendanceTotalPage;
