import PropTypes from 'prop-types';

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
import { CarryOutFilled, ProfileFilled } from '@ant-design/icons';
import ApprovalTab from 'components/tab/ApprovalTab';
import styled from 'styled-components';
import AdminAppLeaveTable from 'components/Table/AdminAppLeaveTable';

// ===============================|| Shadow-Box ||=============================== //

function ShadowBox({ shadow, label, color, bgcolor }) {
  return (
    <MainCard border={false} sx={{ bgcolor: bgcolor || 'inherit', boxShadow: shadow }}>
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Typography variant="subtitle1" color={color}>
          {label}
        </Typography>
      </Stack>
    </MainCard>
  );
}

ShadowBox.propTypes = {
  shadow: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  bgcolor: PropTypes.string
};

// ============================|| COMPONENT - SHADOW ||============================ //

const ApprovalAttendance = () => {
  const [value1, setValue1] = useState(0); // 전체 Tab
  const [value2, setValue2] = useState(0); // 휴가 부분 Tab
  // const [value3, setValue3] = useState(0); // 출/퇴근 부분 Tab

  // 선택한 데이터 값
  const [selectData, setSelectData] = useState({});

  // 결재 : 승인, 반려
  const [appStatus, setAppStatus] = useState('app');

  useEffect(() => {
    setAppStatus('');
  }, [selectData]);

  const handleChange1 = (event, newValue) => {
    // 전체 Tab
    setValue1(newValue);
    setValue2(0);
    setSelectData({});
  };

  const handleChange2 = (event, newValue) => {
    // 휴가 부분 Tab
    setValue2(newValue);
    setSelectData({});
  };

  const handleRadioChange = (event) => {
    setAppStatus(event.target.value);
  };

  // const handleChange3 = (event, newValue) => { // 출/퇴근 부분 Tab
  //     setValue3(newValue);
  // };

  // 휴가 부분 Tab 커스텀
  const MyTab = styled(Tab)`
    padding: 3px;
    height: 37px;
    min-height: 37px;
    width: 60px;
    min-width: 60px;
    color: ${(props) => (props.index == value2 ? '#1890ff' : 'black')} !important;
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
    box-shadow: ${() => (value2 === 0 ? '0px 2px 6px rgba(0, 0, 0, 0.2)' : '0px 0px 0px 0px')};
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
    box-shadow: ${() => (value2 === 2 ? '0px 2px 6px rgba(0, 0, 0, 0.2)' : '0px 0px 0px 0px')};
  `;

  const MyCardL = styled(Card)`
    display: flex;
    flex-direction: column;
    box-shadow: none;
    border: 1px solid #e6ebf1;
    border-radius: 15px;
    background-color: #e6f3ff;
    cursor: pointer;
    box-shadow: ${() => (value2 === 1 ? '0px 2px 6px rgba(0, 0, 0, 0.2)' : '0px 0px 0px 0px')};
  `;

  // Chip 커스텀
  const MyChip = styled(Chip)`
    background-color: gray;
    color: white;
    width: 100px;
    margin-right: 10px;
  `;

  // 휴가 관련 데이터 생성
  // halfKind : 반차 종류 -> 0 : 오전, 1 : 오후
  // status : 결재 상태 -> 0 : 승인, 1 : 반려, 2 : 대기
  function createData(leaveTitle, leaveUser, leaveKind, halfKind, leaveStart, leaveEnd, leaveReason, status) {
    return { leaveTitle, leaveUser, leaveKind, leaveStart, halfKind, leaveEnd, leaveReason, status };
  }

  const datas = [
    createData('이유나/연차/3일', '이유나', '연차', null, '2023/10/09', '2023/10/11', '개인사정', 0),
    createData('이유나/연차/2일', '이유나', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 2),
    createData('이유나/연차/2일', '이유나', '연차', null, '2023/10/09', '2023/10/10', '개인사정 (가족여행)', 2),
    createData('이유나/반차/0.5일', '이유나', '반차', 0, '2023/10/09', '2023/10/09', '개인사정 (사이판으로 해외 여행)', 0),
    createData('이유나/공차/2일', '이유나', '공가', null, '2023/10/08', '2023/10/09', '코로나 확진', 0),
    createData('이유나/반차/0.5일', '이유나', '반차', 1, '2023/10/09', '2023/10/09', '개인사정', 1),
    createData('이클립스/연차/2일', '이클립스', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 2),
    createData('이유나/연차/2일', '이유나', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 1),
    createData('라떼/연차/2일', '라떼', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 0),
    createData('이유나/연차/2일', '이유나', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 0),
    createData('비타민/연차/2일', '비타민', '반차', 1, '2023/10/09', '2023/10/10', '개인사정', 2),
    createData('이유나/연차/2일', '이유나', '연차', null, '2023/10/09', '2023/10/10', '개인사정', 2)
  ];

  // 결재 승인 : app
  // 결재 반려 : unapp
  // 결재 대기 : waitapp
  let app = 0;
  let unapp = 0;
  let waitapp = 0;
  datas.map((data) => {
    if (data.status == 0) {
      app++;
    } else if (data.status == 1) {
      unapp++;
    } else if (data.status == 2) {
      waitapp++;
    }
  });

  return (
    <ComponentSkeleton>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value1} onChange={handleChange1} aria-label="basic tabs example">
          <Tab label="휴가결재" icon={<CarryOutFilled />} />
          <Tab label="출/퇴근수정결재" icon={<ProfileFilled />} />
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
                    setSelectData({});
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">전체 결재</Typography>
                    <Typography variant="text">{waitapp + unapp + app}건</Typography>
                  </CardContent>
                </MyCardAll>
              </Grid>
              <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5}>
                <MyCardM
                  onClick={() => {
                    setValue2(0);
                    setSelectData({});
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">결재 대기</Typography>
                    <Typography variant="text">{waitapp}건</Typography>
                  </CardContent>
                </MyCardM>
              </Grid>
              <Grid item xs={7} sm={7} md={7} lg={7}>
                <MyCardL
                  onClick={() => {
                    setValue2(1);
                    setSelectData({});
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
                          <Typography variant="text">총 {app + unapp}건</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <MyCardS>
                          <CardContent>
                            <Typography variant="h5">결재 승인 </Typography>
                            <Typography variant="text">{app}건</Typography>
                          </CardContent>
                        </MyCardS>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <MyCardS>
                          <CardContent>
                            <Typography variant="h5">결재 반려</Typography>
                            <Typography variant="text">{unapp}건</Typography>
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
                    <AdminAppLeaveTable appStatus={0} datas={datas} setSelectData={setSelectData} />
                  </ApprovalTab>
                  <ApprovalTab value={value2} index={1}>
                    <AdminAppLeaveTable appStatus={1} datas={datas} setSelectData={setSelectData} />
                  </ApprovalTab>
                  <ApprovalTab value={value2} index={2}>
                    <AdminAppLeaveTable appStatus={2} datas={datas} setSelectData={setSelectData} />
                  </ApprovalTab>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Box
                    sx={{
                      marginTop: '36px',
                      marginLeft: '5px',
                      border: '1px solid #e6ebf1',
                      height: '500px',
                      borderBottomLeftRadius: '8px',
                      borderBottomRightRadius: '8px',
                      p: 3
                    }}
                  >
                    {Object.keys(selectData).length !== 0 && (
                      <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={11} sm={11} md={11} lg={11}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="h5">휴가 상세 조회</Typography>
                            </Grid>
                          </Grid>
                          <Box clone mt={2}>
                            <MyChip label="제목" />
                            <TextField
                              size="small"
                              defaultValue={selectData.leaveTitle}
                              key={selectData.leaveTitle}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '40%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <MyChip label="사용자" />
                            <TextField
                              size="small"
                              defaultValue={selectData.leaveUser}
                              key={selectData.leaveUser}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '20%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <MyChip label="휴가 종류" />
                            <TextField
                              size="small"
                              defaultValue={selectData.leaveKind}
                              key={selectData.leaveKind}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '20%' }}
                            />
                          </Box>
                          {(selectData.leaveKind == '연차' || selectData.leaveKind == '공가') && (
                            <Box clone mt={2}>
                              <MyChip label="연차 기간" />
                              <TextField
                                size="small"
                                defaultValue={`${selectData.leaveStart} ~ ${selectData.leaveEnd}`}
                                key={selectData.leaveStart}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '40%' }}
                              />
                            </Box>
                          )}
                          {selectData.leaveKind == '반차' && (
                            <Box clone mt={2}>
                              <MyChip label="반차 시간" />
                              <TextField
                                size="small"
                                defaultValue={`${selectData.leaveStart} ${selectData.halfKind == 0 ? '오전' : '오후'}`}
                                key={selectData.leaveKind}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '40%' }}
                              />
                            </Box>
                          )}
                          <Box clone mt={2}>
                            <MyChip label="휴가 사유" />
                            <TextField
                              multiline
                              rows={3}
                              defaultValue={selectData.leaveReason}
                              key={selectData.leaveReason}
                              inputProps={{ readOnly: true }}
                              sx={{ width: '70%' }}
                            />
                          </Box>
                          {(selectData.status == 0 || selectData.status == 1) && (
                            <Box clone mt={2}>
                              <MyChip label="결재 상태" />
                              <TextField
                                size="small"
                                defaultValue={selectData.status == 0 ? '승인' : '반려'}
                                key={selectData.status}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '20%' }}
                              />
                            </Box>
                          )}
                          {selectData.status == 2 && (
                            <MainCard
                              sx={{ mt: 2, p: 1, pt: 1.5, width: '91%', justifyContent: 'center', alignItems: 'center' }}
                              content={false}
                            >
                              <FormControl sx={{ ml: 1 }}>
                                <RadioGroup
                                  row
                                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                                  value={appStatus}
                                  onChange={handleRadioChange}
                                >
                                  <FormControlLabel value="app" control={<Radio size="small" />} label="승인" />
                                  <FormControlLabel value="unapp" control={<Radio size="small" />} label="반려" />
                                </RadioGroup>
                              </FormControl>
                              {appStatus == 'unapp' && <TextField label="반려 사유" size="small" sx={{ width: '66%' }} />}
                            </MainCard>
                          )}
                          <Stack direction="row" justifyContent="flex-end" mt={1} mr={6}>
                            <Button variant="contained">결재완료</Button>
                          </Stack>
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
        <Box clone mx={1} my={1} pb={2}>
          <BasicContainer>
            <Grid container>
              <Grid item xs={6} md={6} lg={6}>
                <Typography variant="h5">출/퇴근 정정 요청 목록</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}></Grid>
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}></MainCard>
          </BasicContainer>
        </Box>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default ApprovalAttendance;
