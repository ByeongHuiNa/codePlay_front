import { useEffect, useState } from 'react';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import {
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography
} from '../../node_modules/@mui/material/index';
import BasicContainer from 'components/container/BasicContainer';
import ApprovalTab from 'components/tab/ApprovalTab';
import styled from 'styled-components';
import UserAttendTable from 'components/Table/UserAttendTable';
import { SearchOutlined } from '../../node_modules/@mui/icons-material/index';
import BasicChip from 'components/Chip/BasicChip';

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

  // Card 커스텀
  const MyCard = styled(Card)`
    height: 60px;
    display: flex;
    justify-content: center; // 수평 중앙 정렬
    align-items: center; // 수직 중앙 정렬
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    border: 1px solid #e6ebf1;
    border-radius: 15px;
    width: 70%;
    padding-left: 40px;
  `;

  // 데이터 생성
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
              <Typography variant="h4">근태 현황 수정</Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={3} md={3} lg={3}>
              <Box
                clone
                mt={2.5}
                mb={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <BasicChip label="사원선택" color="gray" />
                <TextField
                  id="searchUser"
                  type="search"
                  size="medium"
                  sx={{
                    width: '190px',
                    marginLeft: '5px'
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
            </Grid>
            <Grid item xs={5} md={5} lg={5}>
              {Object.keys(selectUserData).length !== 0 && (
                <Box mt={1}>
                  <MyCard>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={2} md={2} lg={2}>
                        <Avatar alt="프로필" src="" sx={{ width: 40, height: 40 }} />
                      </Grid>
                      <Grid item xs={2} md={2} lg={2}>
                        <Typography align="center" variant="text" component="span">
                          이름
                        </Typography>
                      </Grid>
                      <Grid item xs={3} md={3} lg={3}>
                        <Typography align="center" variant="text" component="span">
                          부서/직책
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={5} lg={5}>
                        <Typography align="center" variant="text" component="span">
                          010-1234-5678
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* <Grid item xs={3} md={3} lg={3}>
                          <Typography variant="h3">{selectUserData.name}</Typography>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3}>
                          <Typography variant="h3">{selectUserData.name}</Typography>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3}>
                          <Typography variant="h3">{selectUserData.name}</Typography>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3}>
                          <Typography variant="h3">{selectUserData.name}</Typography>
                        </Grid> */}
                  </MyCard>
                </Box>
              )}
            </Grid>
            <Grid item xs={4} md={4} lg={4}></Grid>
          </Grid>
          <Box mt={3} ml={1}>
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
          </Box>
        </BasicContainer>
      </Box>
    </ComponentSkeleton>
  );
};

export default ModifyAttendance;
