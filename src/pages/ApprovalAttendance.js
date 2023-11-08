// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import BasicContainer from 'components/container/BasicContainer';
import {
  Box,
  Button,
  Card,
  CardContent,
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
import axios from '../../node_modules/axios/index';
import { useFormatter } from 'store/module';
import UserAttendInfoTable from 'components/Table/UserAttendInfoTable';

const ApprovalAttendance = () => {
  // 선택한 사용자
  const user = {
    user_no: 4,
    user_position: '과장',
    dept: {
      dept_no: 1,
      dept_name: '개발1팀'
    }
  };

  const { dateFormat } = useFormatter();

  const [value1, setValue1] = useState(0); // 전체 Tab
  const handleChange1 = (event, newValue) => {
    // 전체 Tab
    setValue1(newValue);
    setValue2(0);
    setValue3(0);
    setSelectLeaveData({});
    setSelectAttendData({});
    setReason('');
  };

  const [value2, setValue2] = useState(0); // 휴가 부분 Tab
  // 휴가 부분 Tab
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    setSelectLeaveData({});
    setReason('');
  };

  const [value3, setValue3] = useState(0); // 출/퇴근 부분 Tab
  // 출/퇴근 부분 Tab
  const handleChange3 = (event, newValue) => {
    setValue3(newValue);
    setSelectAttendData({});
  };

  useEffect(() => {
    // 로그인 한 근태담당자의 휴가 전체 결재 내역
    axios.get(`/manager-leave-approval?user_no=${user.user_no}`).then((res) => {
      setLeaveAppDatas(res.data);
    });
    // 로그인 한 근태담당의 출퇴근 전체 결재 내역
    axios.get(`/manager-attend-approval?user_no=${user.user_no}`).then((res) => {
      setAttendAppDatas(res.data);
    });
  }, []);

  // Tab 0. 휴가 부분 =================================================
  const [leaveAppDatas, setLeaveAppDatas] = useState([]); // 전체 휴가 결재 데이터
  const [selectLeaveData, setSelectLeaveData] = useState({}); // 선택한 휴가 데이터 값
  const [appLeaveStatus, setAppLeaveStatus] = useState('leaveApp'); // 휴가 결재 : 승인, 반려
  const [reason, setReason] = useState('');

  // 휴가 부분 승인, 반려 라디오 버튼
  const handleLeaveRadioChange = (event) => {
    setAppLeaveStatus(event.target.value);
  };

  // 휴가 결재 완료 버튼
  function submitLeaveApproval() {
    axios
      .patch('/manager-leave-approval', {
        user_no: selectLeaveData.user_no,
        leaveapp_no: selectLeaveData.leaveapp_no,
        leaveapp_total: selectLeaveData.leaveapp_total,
        leaveapp_type: selectLeaveData.leaveapp_type,
        leaveappln_no: selectLeaveData.leaveappln_no,
        leaveappln_order: selectLeaveData.leaveappln_order,
        leaveappln_status: appLeaveStatus == 'leaveApp' ? 0 : 1,
        leaveappln_reason: reason,
        leaveapp_cancel_no: selectLeaveData.leaveapp_cancel_no
      })
      .then((res) => {
        console.log('결재완료 : ' + res.data);
        alert('결재완료');
        setSelectLeaveData({});
        setValue2(2);
      });
  }

  // Tab 1. 출퇴근 부분 ================================================
  const [attendAppDatas, setAttendAppDatas] = useState([]); // 전체 출퇴근 결재 데이터
  const [selectAttendData, setSelectAttendData] = useState({}); // 선택한 출/퇴근 데이터 값
  const [appAttendStatus, setAppAttendStatus] = useState('attendApp'); // 출/퇴근 정정 결재 : 승인, 반려

  // 출/퇴근 부분 승인, 반려 라디오 버튼
  const handleAttendRadioChange = (event) => {
    setAppAttendStatus(event.target.value);
  };

  useEffect(() => {
    setAppLeaveStatus('');
    setAppAttendStatus('');
  }, [selectLeaveData, selectAttendData]);

  // 휴가 결재 완료 버튼
  function submitAttendApproval() {
    alert('결재완료');
  }

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
    height: 60px;
    display: flex;
    justify-content: center; // 수평 중앙 정렬
    align-items: center; // 수직 중앙 정렬
    box-shadow: none;
    border-radius: 15px;
  `;

  const MyCardM = styled(Card)`
    height: 98%;
    display: flex;
    justify-content: center; // 수평 중앙 정렬
    align-items: center; // 수직 중앙 정렬
    box-shadow: none;
    border-radius: 15px;
    background-color: ${() => (value1 === 0 ? (value2 === 1 ? '#6cbfef' : '#b9e5ff') : value3 === 1 ? '#6cbfef' : '#b9e5ff')};
    cursor: pointer;
    transition: box-shadow 0.1s ease;
    &:hover {
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3); // 마우스 호버 시 그림자를 주는 효과를 추가합니다.
    }
    box-shadow: ${() =>
      value1 === 0
        ? value2 === 1
          ? '0px 3px 6px rgba(0, 0, 0, 0.3)'
          : '0px 0px 0px 0px'
        : value3 === 1
        ? '0px 3px 6px rgba(0, 0, 0, 0.3)'
        : '0px 0px 0px 0px'};
  `;

  const MyCardAll = styled(Card)`
    height: 98%;
    display: flex;
    justify-content: center; // 수평 중앙 정렬
    align-items: center; // 수직 중앙 정렬
    box-shadow: none;
    border-radius: 15px;
    background-color: ${() => (value1 === 0 ? (value2 === 0 ? '#6cbfef' : '#b9e5ff') : value3 === 0 ? '#6cbfef' : '#b9e5ff')};
    cursor: pointer;
    transition: box-shadow 0.1s ease;
    &:hover {
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3); // 마우스 호버 시 그림자를 주는 효과를 추가합니다.
    }
    box-shadow: ${() =>
      value1 === 0
        ? value2 === 0
          ? '0px 3px 6px rgba(0, 0, 0, 0.3)'
          : '0px 0px 0px 0px'
        : value3 === 0
        ? '0px 3px 6px rgba(0, 0, 0, 0.3)'
        : '0px 0px 0px 0px'};
  `;

  const MyCardL = styled(Card)`
    display: flex;
    flex-direction: column;
    box-shadow: none;
    border-radius: 15px;
    background-color: ${() => (value1 === 0 ? (value2 === 2 ? '#6cbfef' : '#b9e5ff') : value3 === 2 ? '#6cbfef' : '#b9e5ff')};
    cursor: pointer;
    transition: box-shadow 0.1s ease;
    &:hover {
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3); // 마우스 호버 시 그림자를 주는 효과를 추가합니다.
    }
    box-shadow: ${() =>
      value1 === 0
        ? value2 === 2
          ? '0px 3px 6px rgba(0, 0, 0, 0.3)'
          : '0px 0px 0px 0px'
        : value3 === 2
        ? '0px 3px 6px rgba(0, 0, 0, 0.3)'
        : '0px 0px 0px 0px'};
  `;

  // 휴가 결재 승인 : leaveApp
  // 휴가 결재 반려 : leaveUnapp
  // 휴가 결재 대기 : leaveWaitapp
  let leaveApp = 0;
  let leaveUnapp = 0;
  let leaveWaitapp = 0;
  leaveAppDatas.map((data) => {
    if (data.leaveappln_status == 0) {
      leaveApp++;
    } else if (data.leaveappln_status == 1) {
      leaveUnapp++;
    } else if (data.leaveappln_status == 2) {
      leaveWaitapp++;
    }
  });

  // 출/퇴근 결재 승인 : attendApp
  // 출/퇴근 결재 반려 : attendUnapp
  // 출/퇴근 결재 대기 : attendWaitapp
  let attendApp = 0;
  let attendUnapp = 0;
  let attendWaitapp = 0;
  attendAppDatas.map((data) => {
    if (data.attendapp_status == 0) {
      attendApp++;
    } else if (data.attendapp_status == 1) {
      attendUnapp++;
    } else if (data.attendapp_status == 2) {
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
                    setValue2(0);
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
                    setValue2(1);
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
                    setValue2(2);
                    setSelectLeaveData({});
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', padding: '18px' }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box ml={2}>
                            <Typography variant="h4">결재 완료 </Typography>
                            <Typography variant="text">총 {leaveApp + leaveUnapp}건</Typography>
                          </Box>
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
                <Grid item xs={5} md={5} lg={5}>
                  <Box sx={{ borderBottom: 1, border: '0px' }}>
                    <MyTabs value={value2} onChange={handleChange2} aria-label="basic tabs example">
                      <MyTab label="전체" index="0" />
                      <MyTab label="대기" index="1" />
                      <MyTab label="완료" index="2" />
                    </MyTabs>
                  </Box>
                  <ApprovalTab value={value2} index={0}>
                    <Box pb={3}>
                      <AdminAppLeaveTable datas={leaveAppDatas} setSelectLeaveData={setSelectLeaveData} />
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value2} index={1}>
                    <Box pb={3}>
                      <AdminAppLeaveTable
                        datas={leaveAppDatas.filter((data) => data.leaveappln_status === 2)}
                        setSelectLeaveData={setSelectLeaveData}
                      />
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value2} index={2}>
                    <Box pb={3}>
                      <AdminAppLeaveTable
                        datas={leaveAppDatas.filter((data) => data.leaveappln_status === 0 || data.leaveappln_status === 1)}
                        setSelectLeaveData={setSelectLeaveData}
                      />
                    </Box>
                  </ApprovalTab>
                </Grid>
                <Grid item xs={7} md={7} lg={7}>
                  <Box
                    sx={{
                      marginTop: '36px',
                      marginLeft: '5px',
                      border: '1px solid #e6ebf1',
                      height: '740px',
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
                            {selectLeaveData.leaveapp_status === 0 && selectLeaveData.leaveapp_type !== 4 && (
                              <Grid item>
                                <Button variant="contained" size="medium">
                                  휴가취소
                                </Button>
                              </Grid>
                            )}
                          </Grid>
                          <Box clone mt={2}>
                            <BasicChip label="제목" color="#7c7d80" />
                            <TextField
                              size="small"
                              defaultValue={selectLeaveData.leaveapp_title}
                              key={selectLeaveData.leaveapp_title}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '40%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="신청자" color="#7c7d80" />
                            <TextField
                              size="small"
                              defaultValue={selectLeaveData.user_name}
                              key={selectLeaveData.user_name}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '20%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="휴가 종류" color="#7c7d80" />
                            <TextField
                              size="small"
                              defaultValue={
                                selectLeaveData.leaveapp_type === 0
                                  ? '연차'
                                  : selectLeaveData.leaveapp_type === 1
                                  ? '오전 반차'
                                  : selectLeaveData.leaveapp_type === 2
                                  ? '오후 반차'
                                  : selectLeaveData.leaveapp_type === 3
                                  ? '공가'
                                  : '휴가 취소'
                              }
                              key={selectLeaveData.leaveapp_type}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '20%' }}
                            />
                          </Box>
                          {(selectLeaveData.leaveapp_type == 0 || selectLeaveData.leaveapp_type == 3) && (
                            <Box clone mt={2}>
                              <BasicChip label="휴가 기간" color="#7c7d80" />
                              <TextField
                                size="small"
                                defaultValue={`${dateFormat(new Date(selectLeaveData.leaveapp_start))} ~ ${dateFormat(
                                  new Date(selectLeaveData.leaveapp_end)
                                )}`}
                                key={selectLeaveData.leaveapp_start}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '45%' }}
                              />
                            </Box>
                          )}
                          {(selectLeaveData.leaveapp_type === 1 || selectLeaveData.leaveapp_type === 2) && (
                            <Box clone mt={2}>
                              <BasicChip label="반차 시간" color="#7c7d80" />
                              <TextField
                                size="small"
                                defaultValue={`${dateFormat(new Date(selectLeaveData.leaveapp_start))} ${
                                  selectLeaveData.leaveapp_type == 1 ? '오전' : '오후'
                                }`}
                                key={selectLeaveData.leaveapp_type}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '35%' }}
                              />
                            </Box>
                          )}
                          <Box clone mt={2}>
                            <BasicChip label="휴가 사유" color="#7c7d80" />
                            <TextField
                              multiline
                              rows={3}
                              defaultValue={selectLeaveData.leaveapp_content}
                              key={selectLeaveData.leaveapp_content}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '80%' }}
                            />
                          </Box>
                          {(selectLeaveData.leaveappln_status == 0 || selectLeaveData.leaveappln_status == 1) && (
                            <>
                              <Box clone mt={2}>
                                <BasicChip label="나의 결재 차수" color="#7c7d80" />
                                <TextField
                                  size="small"
                                  defaultValue={`${selectLeaveData.leaveappln_order}차`}
                                  key={`order-${selectLeaveData.leaveappln_order}`}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: '20%', mr: 2 }}
                                />
                                <BasicChip label="나의 결재 상태" color="#7c7d80" />
                                <TextField
                                  size="small"
                                  defaultValue={selectLeaveData.leaveappln_status == 0 ? '승인' : '반려'}
                                  key={`status-${selectLeaveData.leaveappln_status}`}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: '20%' }}
                                />
                              </Box>
                              <Box clone mt={2}>
                                <BasicChip label="최종 결재 상태" color="#1890ff" />
                                <TextField
                                  size="small"
                                  defaultValue={`${
                                    selectLeaveData.leaveapp_status === 0
                                      ? '최종 승인'
                                      : selectLeaveData.leaveapp_status === 1
                                      ? '최종 반려'
                                      : selectLeaveData.leaveapp_status === 2
                                      ? '결재 진행중'
                                      : selectLeaveData.leaveapp_status === 3
                                      ? '결재 대기'
                                      : '취소 처리된 휴가'
                                  }`}
                                  key={selectLeaveData.leaveapp_status}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: '40%', mr: 2 }}
                                />
                              </Box>
                            </>
                          )}
                          {selectLeaveData.leaveappln_status === 2 && (
                            <>
                              <Box clone mt={2}>
                                <BasicChip label={`${selectLeaveData.leaveappln_order}차 결재`} color="#1890ff" />
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
                                {appLeaveStatus == 'leaveUnapp' && (
                                  <Box clone mt={2}>
                                    <BasicChip label="반려 사유" color="#1890ff" />
                                    <TextField
                                      label="반려 사유"
                                      size="small"
                                      sx={{ width: '80%' }}
                                      multiline
                                      rows={2}
                                      onChange={(e) => {
                                        setReason(e.target.value);
                                      }}
                                    />
                                  </Box>
                                )}
                              </Box>
                              <Stack direction="row" justifyContent="flex-end" mt={2} mr={1}>
                                <Button variant="contained" onClick={submitLeaveApproval}>
                                  결재완료
                                </Button>
                              </Stack>
                            </>
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
                    setValue3(0);
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
                    setValue3(1);
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
                    setValue3(2);
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
                <Grid item xs={5} md={5} lg={5}>
                  <Box sx={{ borderBottom: 1, border: '0px' }}>
                    <MyTabs value={value3} onChange={handleChange3} aria-label="basic tabs example">
                      <MyTab label="전체" index="0" />
                      <MyTab label="대기" index="1" />
                      <MyTab label="완료" index="2" />
                    </MyTabs>
                  </Box>
                  <ApprovalTab value={value3} index={0}>
                    <Box pb={3}>
                      <AdminAppAttendTable datas={attendAppDatas} setSelectAttendData={setSelectAttendData} />
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value3} index={1}>
                    <Box pb={3}>
                      <AdminAppAttendTable
                        datas={attendAppDatas.filter((data) => data.attendapp_status === 2)}
                        setSelectAttendData={setSelectAttendData}
                      />
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value3} index={2}>
                    <Box pb={3}>
                      <AdminAppAttendTable
                        datas={attendAppDatas.filter((data) => data.attendapp_status === 0 || data.attendapp_status === 1)}
                        setSelectAttendData={setSelectAttendData}
                      />
                    </Box>
                  </ApprovalTab>
                </Grid>
                <Grid item xs={7} md={7} lg={7}>
                  <Box
                    sx={{
                      marginTop: '36px',
                      marginLeft: '5px',
                      border: '1px solid #e6ebf1',
                      height: '740px',
                      py: 3
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
                            <BasicChip label="제목" color="#7c7d80" />
                            <TextField
                              size="small"
                              defaultValue={selectAttendData.attendedit_title}
                              key={selectLeaveData.attendedit_title}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '50%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="수정 날짜" color="#7c7d80" />
                            <TextField
                              size="small"
                              defaultValue={dateFormat(new Date(selectAttendData.attend_date))}
                              key={selectAttendData.attendDate}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '40%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <Grid container direction="row">
                              <Grid item xs={2.2} sm={2.2} md={2.2} lg={2.2}>
                                <BasicChip label="수정 전 시간" color="#7c7d80" />
                              </Grid>
                              <Grid item xs={9.8} sm={9.8} md={9.8} lg={9.8}>
                                <UserAttendInfoTable data={selectAttendData} />
                              </Grid>
                            </Grid>
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="사용자" color="#7c7d80" />
                            <TextField
                              size="small"
                              defaultValue={selectAttendData.user_name}
                              key={selectAttendData.user_name}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '20%' }}
                            />
                          </Box>
                          {selectAttendData.attendedit_kind !== 2 && (
                            <Box clone mt={2}>
                              <BasicChip label="수정 사항" color="#7c7d80" />
                              <TextField
                                size="small"
                                defaultValue={selectAttendData.attendedit_kind === 0 ? '출근' : '퇴근'}
                                key={`status-${selectAttendData.attendedit_kind}`}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '25%', mr: 2 }}
                              />
                              <BasicChip label="수정 시간" color="#7c7d80" />
                              <TextField
                                size="small"
                                defaultValue={
                                  selectAttendData.attendedit_kind === 0
                                    ? selectAttendData.attendedit_start_time
                                    : selectAttendData.attendedit_end_time
                                }
                                key={`time-${selectAttendData.attendedit_kind}`}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '25%' }}
                              />
                            </Box>
                          )}
                          {selectAttendData.attendedit_kind === 2 && (
                            <>
                              <Box clone mt={2}>
                                <BasicChip label="수정 사항" color="#7c7d80" />
                                <TextField size="small" defaultValue="출근" inputProps={{ readOnly: true }} sx={{ width: '25%', mr: 2 }} />
                                <BasicChip label="수정 시간" color="#7c7d80" />
                                <TextField
                                  size="small"
                                  defaultValue={selectAttendData.attendedit_start_time}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: '25%' }}
                                />
                              </Box>
                              <Box clone mt={2}>
                                <BasicChip label="수정 사항" color="#7c7d80" />
                                <TextField size="small" defaultValue="퇴근" inputProps={{ readOnly: true }} sx={{ width: '25%', mr: 2 }} />
                                <BasicChip label="수정 시간" color="#7c7d80" />
                                <TextField
                                  size="small"
                                  defaultValue={selectAttendData.attendedit_end_time}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: '25%' }}
                                />
                              </Box>
                            </>
                          )}
                          <Box clone mt={2}>
                            <BasicChip label="수정 사유" color="#7c7d80" />
                            <TextField
                              multiline
                              rows={3}
                              defaultValue={selectAttendData.attendedit_reason}
                              key={selectAttendData.attendedit_reason}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '70%' }}
                            />
                          </Box>
                          {(selectAttendData.attendapp_status === 0 || selectAttendData.attendapp_status === 1) && (
                            <Box clone mt={2}>
                              <BasicChip label="결재 상태" color="#7c7d80" />
                              <TextField
                                size="small"
                                defaultValue={selectAttendData.attendapp_status == 0 ? '승인' : '반려'}
                                key={selectAttendData.attendapp_status}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '20%' }}
                              />
                            </Box>
                          )}
                          {selectAttendData.attendapp_status == 2 && (
                            <Box clone mt={2}>
                              <BasicChip label="결재" color="#1890ff" />
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
                              {appAttendStatus == 'attendUnapp' && (
                                <Box clone mt={2}>
                                  <BasicChip label="반려 사유" color="#1890ff" />
                                  <TextField
                                    label="반려 사유"
                                    size="small"
                                    sx={{ width: '80%' }}
                                    multiline
                                    rows={2}
                                    onChange={(e) => {
                                      setReason(e.target.value);
                                    }}
                                  />
                                </Box>
                              )}
                              <Stack direction="row" justifyContent="flex-end" mt={2} mr={1}>
                                <Button variant="contained" onClick={submitAttendApproval}>
                                  결재완료
                                </Button>
                              </Stack>
                            </Box>
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
