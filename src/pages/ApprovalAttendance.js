// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import BasicContainer from 'components/container/BasicContainer';
import MainCard from 'components/MainCard';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField
} from '../../node_modules/@mui/material/index';
import BasicTab from 'components/tab/BasicTab';
import React, { useEffect, useState } from 'react';
import ApprovalTab from 'components/tab/ApprovalTab';
import styled from 'styled-components';
import AdminAppLeaveTable from 'components/Table/AdminAppLeaveTable';
import AdminAppAttendTable from 'components/Table/AdminAppAttendTable';
import BasicChip from 'components/Chip/BasicChip';

const ApprovalAttendance = () => {
  const [value1, setValue1] = useState(0); // 전체 Tab
  const [value2, setValue2] = useState(0); // 휴가 부분 Tab
  const [value3, setValue3] = useState(0); // 출/퇴근 부분 Tab

  // 선택한 휴가 데이터 값
  const [selectLeaveData, setSelectLeaveData] = useState({});
  // 휴가 결재 : 승인, 반려
  const [appLeaveStatus, setAppLeaveStatus] = useState('leaveApp');

  // 선택한 출/퇴근 데이터 값
  const [selectAttendData, setSelectAttendData] = useState({});
  // 출/퇴근 정정 결재 : 승인, 반려
  const [appAttendStatus, setAppAttendStatus] = useState('attendApp');
  // 출/퇴근 승인 시 기본값, 직접입력
  const [appDefault, setAppDefault] = useState('default');

  useEffect(() => {
    setAppLeaveStatus('');
    setAppAttendStatus('');
  }, [selectLeaveData, selectAttendData]);

  const handleChange1 = (event, newValue) => {
    // 전체 Tab
    setValue1(newValue);
    setValue2(0);
    setValue3(0);
    setSelectLeaveData({});
    setSelectAttendData({});
  };

  // 휴가 부분 Tab
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    setSelectLeaveData({});
  };

  // 휴가 부분 승인, 반려 라디오 버튼
  const handleLeaveRadioChange = (event) => {
    setAppLeaveStatus(event.target.value);
  };

  // 출/퇴근 부분 Tab
  const handleChange3 = (event, newValue) => {
    setValue3(newValue);
    setSelectAttendData({});
  };

  // 출/퇴근 부분 승인, 반려 라디오 버튼
  const handleAttendRadioChange = (event) => {
    setAppAttendStatus(event.target.value);
  };

  // 출/퇴근 승인 : 기본값, 직접입력 라디오 버튼
  const handleDefaultRadioChange = (event) => {
    setAppDefault(event.target.value);
  };

  // 휴가 부분 Tab 커스텀
  const MyTab = styled(Tab)`
    padding: 3px;
    height: 37px;
    min-height: 37px;
    width: 60px;
    min-width: 60px;
    color: ${(props) => (value1 === 0 ? (props.index == value2 ? '#1890ff' : 'black') : props.index == value3 ? '#1890ff' : 'black')};
  `;

  const MyTabs = styled(Tabs)`
    padding: 0px;
    height: 37px;
    min-height: 37px;
  `;

  // Card 커스텀
  const MyCardS = styled(Card)`
    height: 70px;
    display: flex;
    justify-content: center; // 수평 중앙 정렬
    align-items: center; // 수직 중앙 정렬
    box-shadow: none;
    border: 1px solid #e6ebf1;
    border-radius: 15px;
  `;

  const MyCardM = styled(Card)`
    height: 100%;
    display: flex;
    justify-content: center; // 수평 중앙 정렬
    align-items: center; // 수직 중앙 정렬
    box-shadow: none;
    border: 1px solid #e6ebf1;
    border-radius: 15px;
    background-color: #e6f3ff;
    cursor: pointer;
    box-shadow: ${() =>
      value1 === 0
        ? value2 === 0
          ? '0px 2px 6px rgba(0, 0, 0, 0.2)'
          : '0px 0px 0px 0px'
        : value3 === 0
        ? '0px 2px 6px rgba(0, 0, 0, 0.2)'
        : '0px 0px 0px 0px'};
  `;

  const MyCardAll = styled(Card)`
    height: 100%;
    display: flex;
    justify-content: center; // 수평 중앙 정렬
    align-items: center; // 수직 중앙 정렬
    box-shadow: none;
    border: 1px solid #e6ebf1;
    border-radius: 15px;
    background-color: #e6f3ff;
    cursor: pointer;
    box-shadow: ${() =>
      value1 === 0
        ? value2 === 2
          ? '0px 2px 6px rgba(0, 0, 0, 0.2)'
          : '0px 0px 0px 0px'
        : value3 === 2
        ? '0px 2px 6px rgba(0, 0, 0, 0.2)'
        : '0px 0px 0px 0px'};
  `;

  const MyCardL = styled(Card)`
    display: flex;
    flex-direction: column;
    box-shadow: none;
    border: 1px solid #e6ebf1;
    border-radius: 15px;
    background-color: #e6f3ff;
    cursor: pointer;
    box-shadow: ${() =>
      value1 === 0
        ? value2 === 1
          ? '0px 2px 6px rgba(0, 0, 0, 0.2)'
          : '0px 0px 0px 0px'
        : value3 === 1
        ? '0px 2px 6px rgba(0, 0, 0, 0.2)'
        : '0px 0px 0px 0px'};
  `;

  const AppChip = styled(Chip)`
    background-color: #1890ff;
    color: white;
    width: 80px;
    margin-right: 10px;
  `;

  // 휴가 관련 데이터 생성
  // halfKind : 반차 종류 -> 0 : 오전, 1 : 오후
  // status : 결재 상태 -> 0 : 승인, 1 : 반려, 2 : 대기
  function createLeaveData(leaveTitle, leaveUser, leaveKind, halfKind, leaveStart, leaveEnd, leaveReason, status) {
    return { leaveTitle, leaveUser, leaveKind, leaveStart, halfKind, leaveEnd, leaveReason, status };
  }

  const leaveDatas = [
    createLeaveData('이유나/연차/3일', '이유나', '연차', null, '2023/10/09', '2023/10/11', '개인사정', 0),
    createLeaveData('이유나/연차/2일', '이유나', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 2),
    createLeaveData('이유나/연차/2일', '이유나', '연차', null, '2023/10/09', '2023/10/10', '개인사정 (가족여행)', 2),
    createLeaveData('이유나/반차/0.5일', '이유나', '반차', 0, '2023/10/09', '2023/10/09', '개인사정 (사이판으로 해외 여행)', 0),
    createLeaveData('이유나/공차/2일', '이유나', '공가', null, '2023/10/08', '2023/10/09', '코로나 확진', 0),
    createLeaveData('이유나/반차/0.5일', '이유나', '반차', 1, '2023/10/09', '2023/10/09', '개인사정', 1),
    createLeaveData('이클립스/연차/2일', '이클립스', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 2),
    createLeaveData('이유나/연차/2일', '이유나', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 1),
    createLeaveData('라떼/연차/2일', '라떼', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 0),
    createLeaveData('이유나/연차/2일', '이유나', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 0),
    createLeaveData('비타민/연차/2일', '비타민', '반차', 1, '2023/10/09', '2023/10/10', '개인사정', 2),
    createLeaveData('이유나/연차/2일', '이유나', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 2)
  ];

  // 출/퇴근 수정 관련 데이터 생성
  // status : 결재 상태 -> 0 : 승인, 1 : 반려, 2 : 대기
  function createAttendData(attendTitle, attendUser, attendDate, attendKind, attendReason, status) {
    return { attendTitle, attendUser, attendDate, attendKind, attendReason, status };
  }

  const attendDatas = [
    createAttendData('이유나/231009/출근', '이유나', '2023/10/09', '출근', '출근을 늦게 기록', 2),
    createAttendData('김유나/231010/출근', '김유나', '2023/10/10', '출근', '출근을 늦게 기록', 0),
    createAttendData('박유나/231011/퇴근', '박유나', '2023/10/11', '퇴근', '퇴근을 일찍 기록', 1),
    createAttendData('전유나/231012/출근', '전유나', '2023/10/12', '출근', '출근을 늦게 기록', 0),
    createAttendData('임유나/231013/퇴근', '임유나', '2023/10/13', '퇴근', '퇴근을 일찍 기록', 1),
    createAttendData('정유나/231014/퇴근', '정유나', '2023/10/14', '퇴근', '퇴근을 일찍 기록', 0),
    createAttendData('최유나/231015/출근', '최유나', '2023/10/15', '출근', '출근을 늦게 기록', 0),
    createAttendData('배유나/231016/출근', '배유나', '2023/10/16', '출근', '출근을 늦게 기록', 2),
    createAttendData('강유나/231016/퇴근', '강유나', '2023/10/16', '퇴근', '퇴근을 일찍 기록', 2),
    createAttendData('서유나/231017/퇴근', '서유나', '2023/10/17', '퇴근', '퇴근을 일찍 기록', 0),
    createAttendData('권유나/231019/퇴근', '권유나', '2023/10/19', '퇴근', '퇴근을 일찍 기록', 1)
  ];

  // 휴가 결재 승인 : leaveApp
  // 휴가 결재 반려 : leaveUnapp
  // 휴가 결재 대기 : leaveWaitapp
  let leaveApp = 0;
  let leaveUnapp = 0;
  let leaveWaitapp = 0;
  leaveDatas.map((data) => {
    if (data.status == 0) {
      leaveApp++;
    } else if (data.status == 1) {
      leaveUnapp++;
    } else if (data.status == 2) {
      leaveWaitapp++;
    }
  });

  // 출/퇴근 결재 승인 : attendApp
  // 출/퇴근 결재 반려 : attendUnapp
  // 출/퇴근 결재 대기 : attendWaitapp
  let attendApp = 0;
  let attendUnapp = 0;
  let attendWaitapp = 0;
  attendDatas.map((data) => {
    if (data.status == 0) {
      attendApp++;
    } else if (data.status == 1) {
      attendUnapp++;
    } else if (data.status == 2) {
      attendWaitapp++;
    }
  });

  return (
    <ComponentSkeleton>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value1} onChange={handleChange1} aria-label="basic tabs example">
          <Tab label="휴가결재" />
          <Tab label="출/퇴근수정결재" />
        </Tabs>
      </Box>
      <BasicTab value={value1} index={0}>
        <Box clone mx={1}>
          <BasicContainer>
            <Grid container spacing={2}>
              <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5}>
                <MyCardAll
                  onClick={() => {
                    setValue2(2);
                    setSelectLeaveData({});
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">전체 결재</Typography>
                    <Typography variant="text">{leaveWaitapp + leaveUnapp + leaveApp}건</Typography>
                  </CardContent>
                </MyCardAll>
              </Grid>
              <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5}>
                <MyCardM
                  onClick={() => {
                    setValue2(0);
                    setSelectLeaveData({});
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">결재 대기</Typography>
                    <Typography variant="text">{leaveWaitapp}건</Typography>
                  </CardContent>
                </MyCardM>
              </Grid>
              <Grid item xs={7} sm={7} md={7} lg={7}>
                <MyCardL
                  onClick={() => {
                    setValue2(1);
                    setSelectLeaveData({});
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Box>
                          <Typography variant="h4">결재 완료 </Typography>
                          <Typography variant="text">총 {leaveApp + leaveUnapp}건</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <MyCardS>
                          <CardContent>
                            <Typography variant="h5">결재 승인 </Typography>
                            <Typography variant="text">{leaveApp}건</Typography>
                          </CardContent>
                        </MyCardS>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <MyCardS>
                          <CardContent>
                            <Typography variant="h5">결재 반려</Typography>
                            <Typography variant="text">{leaveUnapp}건</Typography>
                          </CardContent>
                        </MyCardS>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MyCardL>
              </Grid>
            </Grid>
          </BasicContainer>
        </Box>
        <Box clone mx={1} my={1}>
          <BasicContainer>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={6} md={6} lg={6}>
                  <Box sx={{ borderBottom: 1, border: '0px' }}>
                    <MyTabs value={value2} onChange={handleChange2} aria-label="basic tabs example">
                      <MyTab label="대기" index="0" />
                      <MyTab label="완료" index="1" />
                      <MyTab label="전체" index="2" />
                    </MyTabs>
                  </Box>
                  <ApprovalTab value={value2} index={0}>
                    <Box pt={3} pb={3}>
                      <AdminAppLeaveTable appLeaveStatus={0} datas={leaveDatas} setSelectLeaveData={setSelectLeaveData} />
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value2} index={1}>
                    <Box pt={3} pb={3}>
                      <AdminAppLeaveTable appLeaveStatus={1} datas={leaveDatas} setSelectLeaveData={setSelectLeaveData} />
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value2} index={2}>
                    <Box pt={3} pb={3}>
                      <AdminAppLeaveTable appLeaveStatus={2} datas={leaveDatas} setSelectLeaveData={setSelectLeaveData} />
                    </Box>
                  </ApprovalTab>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Box
                    sx={{
                      marginTop: '36px',
                      marginLeft: '5px',
                      border: '1px solid #e6ebf1',
                      height: '540px',
                      borderBottomLeftRadius: '8px',
                      borderBottomRightRadius: '8px',
                      p: 3
                    }}
                  >
                    {Object.keys(selectLeaveData).length !== 0 && (
                      <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={11} sm={11} md={11} lg={11}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="h5">휴가 상세 조회</Typography>
                            </Grid>
                          </Grid>
                          <Box clone mt={2}>
                            <BasicChip label="제목" color="gray" />
                            <TextField
                              size="small"
                              defaultValue={selectLeaveData.leaveTitle}
                              key={selectLeaveData.leaveTitle}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '40%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="사용자" color="gray" />
                            <TextField
                              size="small"
                              defaultValue={selectLeaveData.leaveUser}
                              key={selectLeaveData.leaveUser}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '20%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="휴가 종류" color="gray" />
                            <TextField
                              size="small"
                              defaultValue={selectLeaveData.leaveKind}
                              key={selectLeaveData.leaveKind}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '20%' }}
                            />
                          </Box>
                          {(selectLeaveData.leaveKind == '연차' || selectLeaveData.leaveKind == '공가') && (
                            <Box clone mt={2}>
                              <BasicChip label="연차 기간" color="gray" />
                              <TextField
                                size="small"
                                defaultValue={`${selectLeaveData.leaveStart} ~ ${selectLeaveData.leaveEnd}`}
                                key={selectLeaveData.leaveStart}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '40%' }}
                              />
                            </Box>
                          )}
                          {selectLeaveData.leaveKind == '반차' && (
                            <Box clone mt={2}>
                              <BasicChip label="반차 시간" color="gray" />
                              <TextField
                                size="small"
                                defaultValue={`${selectLeaveData.leaveStart} ${selectLeaveData.halfKind == 0 ? '오전' : '오후'}`}
                                key={selectLeaveData.leaveKind}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '40%' }}
                              />
                            </Box>
                          )}
                          <Box clone mt={2}>
                            <BasicChip label="휴가 사유" color="gray" />
                            <TextField
                              multiline
                              rows={3}
                              defaultValue={selectLeaveData.leaveReason}
                              key={selectLeaveData.leaveReason}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '70%' }}
                            />
                          </Box>
                          {(selectLeaveData.status == 0 || selectLeaveData.status == 1) && (
                            <Box clone mt={2}>
                              <BasicChip label="결재 상태" color="gray" />
                              <TextField
                                size="small"
                                defaultValue={selectLeaveData.status == 0 ? '승인' : '반려'}
                                key={selectLeaveData.status}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '20%' }}
                              />
                            </Box>
                          )}
                          {selectLeaveData.status == 2 && (
                            <MainCard
                              sx={{ mt: 2, p: 1, pt: 1.5, width: '91%', justifyContent: 'center', alignItems: 'center' }}
                              content={false}
                            >
                              <FormControl sx={{ ml: 1 }}>
                                <RadioGroup
                                  row
                                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                                  value={appLeaveStatus}
                                  onChange={handleLeaveRadioChange}
                                >
                                  <FormControlLabel value="leaveApp" control={<Radio size="small" />} label="승인" />
                                  <FormControlLabel value="leaveUnapp" control={<Radio size="small" />} label="반려" />
                                </RadioGroup>
                              </FormControl>
                              {appLeaveStatus == 'leaveUnapp' && <TextField label="반려 사유" size="small" sx={{ width: '66%' }} />}
                            </MainCard>
                          )}
                          {selectLeaveData.status == 2 && (
                            <Stack direction="row" justifyContent="flex-end" mt={1} mr={6}>
                              <Button variant="contained">결재완료</Button>
                            </Stack>
                          )}
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </BasicContainer>
        </Box>
      </BasicTab>
      <BasicTab value={value1} index={1}>
        <Box clone mx={1}>
          <BasicContainer>
            <Grid container spacing={2}>
              <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5}>
                <MyCardAll
                  onClick={() => {
                    setValue3(2);
                    setSelectAttendData({});
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">전체 결재</Typography>
                    <Typography variant="text">{attendWaitapp + attendUnapp + attendApp}건</Typography>
                  </CardContent>
                </MyCardAll>
              </Grid>
              <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5}>
                <MyCardM
                  onClick={() => {
                    setValue3(0);
                    setSelectAttendData({});
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">결재 대기</Typography>
                    <Typography variant="text">{attendWaitapp}건</Typography>
                  </CardContent>
                </MyCardM>
              </Grid>
              <Grid item xs={7} sm={7} md={7} lg={7}>
                <MyCardL
                  onClick={() => {
                    setValue3(1);
                    setSelectAttendData({});
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Box>
                          <Typography variant="h4">결재 완료 </Typography>
                          <Typography variant="text">총 {attendApp + attendUnapp}건</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <MyCardS>
                          <CardContent>
                            <Typography variant="h5">결재 승인 </Typography>
                            <Typography variant="text">{attendApp}건</Typography>
                          </CardContent>
                        </MyCardS>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <MyCardS>
                          <CardContent>
                            <Typography variant="h5">결재 반려</Typography>
                            <Typography variant="text">{attendUnapp}건</Typography>
                          </CardContent>
                        </MyCardS>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MyCardL>
              </Grid>
            </Grid>
          </BasicContainer>
        </Box>
        <Box clone mx={1} my={1}>
          <BasicContainer>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={6} md={6} lg={6}>
                  <Box sx={{ borderBottom: 1, border: '0px' }}>
                    <MyTabs value={value3} onChange={handleChange3} aria-label="basic tabs example">
                      <MyTab label="대기" index="0" />
                      <MyTab label="완료" index="1" />
                      <MyTab label="전체" index="2" />
                    </MyTabs>
                  </Box>
                  <ApprovalTab value={value3} index={0}>
                    <Box pt={3} pb={3}>
                      <AdminAppAttendTable appAttendStatus={0} datas={attendDatas} setSelectAttendData={setSelectAttendData} />
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value3} index={1}>
                    <Box pt={3} pb={3}>
                      <AdminAppAttendTable appAttendStatus={1} datas={attendDatas} setSelectAttendData={setSelectAttendData} />
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value3} index={2}>
                    <Box pt={3} pb={3}>
                      <AdminAppAttendTable appAttendStatus={2} datas={attendDatas} setSelectAttendData={setSelectAttendData} />
                    </Box>
                  </ApprovalTab>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Box
                    sx={{
                      marginTop: '36px',
                      marginLeft: '5px',
                      border: '1px solid #e6ebf1',
                      height: '540px',
                      borderBottomLeftRadius: '8px',
                      borderBottomRightRadius: '8px',
                      p: 3
                    }}
                  >
                    {Object.keys(selectAttendData).length !== 0 && (
                      <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={11} sm={11} md={11} lg={11}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="h5">출/퇴근 수정 상세 조회</Typography>
                            </Grid>
                          </Grid>
                          <Box clone mt={2}>
                            <BasicChip label="제목" color="gray" />
                            <TextField
                              size="small"
                              defaultValue={selectAttendData.attendTitle}
                              key={selectLeaveData.attendTitle}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '40%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="수정 날짜" color="gray" />
                            <TextField
                              size="small"
                              defaultValue={selectAttendData.attendDate}
                              key={selectAttendData.attendDate}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '40%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="사용자" color="gray" />
                            <TextField
                              size="small"
                              defaultValue={selectAttendData.attendUser}
                              key={selectAttendData.attendUser}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '20%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="수정 사항" color="gray" />
                            <TextField
                              size="small"
                              defaultValue={selectAttendData.attendKind}
                              key={selectAttendData.attendKind}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '20%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="수정 사유" color="gray" />
                            <TextField
                              multiline
                              rows={3}
                              defaultValue={selectAttendData.attendReason}
                              key={selectAttendData.attendReason}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '70%' }}
                            />
                          </Box>

                          {(selectAttendData.status === 0 || selectAttendData.status === 1) && (
                            <Box clone mt={2}>
                              <BasicChip label="결재 상태" color="gray" />
                              <TextField
                                size="small"
                                defaultValue={selectAttendData.status == 0 ? '승인' : '반려'}
                                key={selectAttendData.status}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '20%' }}
                              />
                            </Box>
                          )}
                          {selectAttendData.status == 2 && (
                            <MainCard
                              sx={{ mt: 2, p: 1, pt: 1.5, width: '91%', justifyContent: 'center', alignItems: 'center' }}
                              content={false}
                            >
                              <AppChip label="결재" />
                              <FormControl sx={{ ml: 1 }}>
                                <RadioGroup
                                  row
                                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                                  value={appAttendStatus}
                                  onChange={handleAttendRadioChange}
                                >
                                  <FormControlLabel value="attendApp" control={<Radio size="small" />} label="승인" />
                                  <FormControlLabel value="attendUnapp" control={<Radio size="small" />} label="반려" />
                                </RadioGroup>
                              </FormControl>
                              {appAttendStatus == 'attendApp' && (
                                <Box mt={0.5}>
                                  <AppChip label={`${selectAttendData.attendKind}시간`} />
                                  <FormControl sx={{ ml: 1 }}>
                                    <RadioGroup
                                      row
                                      sx={{ justifyContent: 'center', alignItems: 'center' }}
                                      value={appDefault}
                                      onChange={handleDefaultRadioChange}
                                    >
                                      <FormControlLabel value="default" control={<Radio size="small" />} label="기본값" />
                                      <FormControlLabel value="other" control={<Radio size="small" />} label="직접입력" />
                                    </RadioGroup>
                                  </FormControl>
                                  {appDefault == 'other' && <TextField size="small" sx={{ width: '30%' }} />}
                                  {appDefault == 'default' && (
                                    <TextField
                                      size="small"
                                      defaultValue={selectAttendData.attendKind == '출근' ? '09 : 00' : '18 : 00'}
                                      inputProps={{ readOnly: true }}
                                      sx={{ width: '30%' }}
                                    />
                                  )}
                                </Box>
                              )}
                              {appAttendStatus == 'attendUnapp' && <TextField label="반려 사유" size="small" sx={{ width: '100%' }} />}
                              <Stack direction="row" justifyContent="flex-end" mt={1}>
                                <Button variant="contained">결재완료</Button>
                              </Stack>
                            </MainCard>
                          )}
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </BasicContainer>
        </Box>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default ApprovalAttendance;
