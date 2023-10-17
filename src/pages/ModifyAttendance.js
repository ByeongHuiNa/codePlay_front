import { useEffect, useState } from 'react';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import { Box, Chip, Grid, IconButton, InputAdornment, Tab, Tabs, TextField, Typography } from '../../node_modules/@mui/material/index';
import BasicContainer from 'components/container/BasicContainer';
import ApprovalTab from 'components/tab/ApprovalTab';
import { SearchOutlined } from '../../node_modules/@mui/icons-material/index';
import styled from 'styled-components';
import UserAttendTable from 'components/Table/UserAttendTable';

const ModifyAttendance = () => {
  const [value, setValue] = useState(0); // Tab 부분

  // 선택한 사용자 데이터 값
  const [selectUserData, setSelectUserData] = useState({});

  // 선택한 휴가 데이터 값
  const [selectLeaveData, setSelectLeaveData] = useState({});

  // 선택한 출/퇴근 데이터 값
  const [selectAttendData, setSelectAttendData] = useState({});

  useEffect(() => {}, [selectUserData, selectLeaveData, selectAttendData]);

  const handleTab = (event, newValue) => {
    setValue(newValue);
    setSelectLeaveData({});
    setSelectAttendData({});
  };

  // Tab 커스텀
  const MyTab = styled(Tab)`
    padding: 3px;
    height: 37px;
    min-height: 37px;
    width: 60px;
    min-width: 60px;
    color: ${(props) => {
      props.index == value ? '#1890ff' : 'black';
    }};
  `;

  const MyTabs = styled(Tabs)`
    padding: 0px;
    height: 37px;
    min-height: 37px;
  `;

  // Chip 커스텀
  const MyChip = styled(Chip)`
    background-color: gray;
    color: white;
    width: 100px;
    margin-right: 10px;
  `;

  function createAttendData(date, startTime, endTime, status) {
    return { date, startTime, endTime, status };
  }

  const attendDatas = [
    createAttendData('2023/10/10', '08:57:10', '18:05:12', 0),
    createAttendData('2023/10/11', '08:57:10', '18:05:12', 0),
    createAttendData('2023/10/16', '08:59:26', '18:21:06', 1),
    createAttendData('2023/10/12', '08:59:26', '18:21:06', 1),
    createAttendData('2023/10/17', '08:50:13', '18:12:58', 2),
    createAttendData('2023/10/13', '08:50:13', '18:12:58', 2),
    createAttendData('2023/10/18', '08:06:35', '18:07:26', 3),
    createAttendData('2023/10/14', '08:06:35', '18:07:26', 3),
    createAttendData('2023/10/19', '08:32:57', '18:01:13', 4),
    createAttendData('2023/10/15', '08:32:57', '18:01:13', 4)
  ];

  function createUserData(name, dept, position, email) {
    return { name, dept, position, email };
  }

  const userData = createUserData('이유나', '개발 1팀', '과장', 'endless@naver.com');

  return (
    <ComponentSkeleton>
      <Box clone mx={1}>
        <BasicContainer>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h3">근태 현황 수정</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Box clone mt={2}>
              <MyChip label="사원선택" />
              <TextField
                label="사원선택"
                id="searchUser"
                type="search"
                size="small"
                sx={{
                  width: '170px'
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton id="searchApp">
                        <SearchOutlined />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                onClick={() => {
                  setSelectUserData(userData);
                }}
              />
            </Box>
            <Box>
                
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={6} md={6} lg={6}>
                <Box sx={{ borderBottom: 1, border: '0px' }}>
                  <MyTabs value={value} onChange={handleTab} aria-label="basic tabs example">
                    <MyTab label="출/퇴근" index="0" />
                    <MyTab label="휴가" index="1" />
                  </MyTabs>
                </Box>
                <ApprovalTab value={value} index={0}>
                  <UserAttendTable datas={attendDatas} setSelectAttendData={setSelectAttendData} />
                </ApprovalTab>
                <ApprovalTab value={value} index={1}></ApprovalTab>
              </Grid>
            </Grid>
          </Grid>
        </BasicContainer>
      </Box>
    </ComponentSkeleton>
  );
};

export default ModifyAttendance;
