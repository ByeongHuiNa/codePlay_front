import React, { useEffect, useState } from 'react';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '../../node_modules/@mui/material/index';
import BasicContainer from 'components/container/BasicContainer';
import ApprovalTab from 'components/tab/ApprovalTab';
import styled from 'styled-components';
import UserAllAttendTable from 'components/Table/UserAllAttendTable';
import { SearchOutlined } from '../../node_modules/@mui/icons-material/index';
import BasicChip from 'components/Chip/BasicChip';
import MainCard from 'components/MainCard';
import TimePicker2 from 'components/DatePicker/TimePicker';
import BasicDatePicker from 'components/DatePicker/BasicDatePicker';
import UserAttendInfoTable from 'components/Table/UserAttendInfoTable';
import BasicAuto from 'components/AutoComplete/BasicAuto';
import axios from '../../node_modules/axios/index';
import SelectUserTable from 'components/Table/SelectUserTable';
import AttendUpdateModal from 'components/Modal/AttendUpdateModal';
import UserAllLeaveTable from 'components/Table/UserAllLeaveTable';
import UserLeaveInfoTable from 'components/Table/UserLeaveInfoTable';
import Dot from 'components/@extended/Dot';

const ModifyAttendance = () => {
  // Tab : 0.출/퇴근, 1.휴가
  const [value, setValue] = useState(0); // Tab 부분

  const handleTab = (event, newValue) => {
    setValue(newValue);
    setCheckItems([]);
    setUpdateTime('');
    setSelectDate('');
    setAttendKind('');
    setAttendDefault('');
    setSelectLeaveData({});
    setSelectAttendData({});
    setLeaveKind('');
  };

  // 부서 전체 사용자 데이터
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/user').then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  // 부서 전체 사용자 : 체크박스로 선택 가능
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, user_no) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, user_no]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== user_no));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)을 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      allUsers.forEach((el) => idArray.push(el.user_no));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  // 테이블에서 선택한 사용자 데이터
  const [selectUserData, setSelectUserData] = useState({});

  // 사원선택에서 검색한 이름
  const [searchName, setSearchName] = useState('');

  // 사원선택의 자동완성 창에서 검색어 변경(검색) 될 때마다 searchName 설정
  const handleSelectUser = (event, newValue) => {
    setSearchName(newValue);
  };

  // 선택한 출/퇴근 날짜
  // 달력에서 날짜 클릭하면 해당 날짜의 출/퇴근 내용 불러오기
  const [selectDate, setSelectDate] = useState('');

  // 선택한 출/퇴근 데이터
  const [selectAttendData, setSelectAttendData] = useState({});

  // 출/퇴근 수정 요청 시 라디오 버튼
  // 출/퇴근 수정 요청 시 라디오 출/퇴근 선택
  const [attendKind, setAttendKind] = useState('');
  const handleKindRadioChange = (event) => {
    setAttendKind(event.target.value);
  };
  // 출/퇴근 수정 요청 시 라디오 기본값/직접입력 선택
  const [attendDefault, setAttendDefault] = useState('');
  const handleDefaultRadioChange = (event) => {
    setAttendDefault(event.target.value);
  };

  // 출/퇴근 수정할 시간 선택
  const [updateTime, setUpdateTime] = useState('');

  useEffect(() => {
    if (Object.keys(selectAttendData).length !== 0) {
      setAttendKind('start');
      setAttendDefault('default');
      setUpdateTime('');
      setSelectDate('');
    }
  }, [selectAttendData]);

  useEffect(() => {
    if (checkItems.length < 2) {
      setAttendKind('start');
      setAttendDefault('default');
      setUpdateTime('');
      setSelectDate('');
      setSelectAttendData({});
    }
  }, [checkItems]);

  // 선택한 휴가 데이터 값
  const [selectLeaveData, setSelectLeaveData] = useState({});

  // 휴가 결재상태 수정 시 라디오 버튼
  // 출/퇴근 수정 요청 시 라디오 출/퇴근 선택
  const [leaveKind, setLeaveKind] = useState('');
  const handleLeaveKindRadioChange = (event) => {
    setLeaveKind(event.target.value);
  };

  useEffect(() => {
    if (Object.keys(selectLeaveData).length !== 0) {
      setLeaveKind(selectLeaveData.status === 0 ? 'n' : 'y');
    }
  }, [selectLeaveData]);

  // 모달창 설정
  // 탭 0. 출/퇴근 전체 조회
  const [openAll, setOpenAll] = React.useState(false);
  // 모달창 : 날짜 검색 시작일
  const [searchStartDate, setSearchStartDate] = useState('');
  // 모달창 : 날짜 검색 종료일
  const [searchEndDate, setSearchEndDate] = useState('');
  // 모달창에서 선택한 출/퇴근 데이터 값
  const [searchAttendData, setSearchAttendData] = useState({});
  // 모달창 열기
  const handleOpenAll = () => setOpenAll(true);
  // 모달창 취소 버튼 (데이터 저장 O)
  const handleCloseAllSave = () => {
    setOpenAll(false);
    setSelectAttendData(searchAttendData);
    setSearchStartDate('');
    setSearchEndDate('');
  };
  // 모달창 확인 버튼 (데이터 저장 X)
  const handleCloseAll = () => {
    setOpenAll(false);
    setSearchAttendData({});
    setSearchStartDate('');
    setSearchEndDate('');
  };

  // 탭 1. 휴가 전체 조회
  const [openAllLeave, setOpenAllLeave] = React.useState(false);
  // 모달창 : 날짜 검색 시작일
  const [searchLeaveStartDate, setSearchLeaveStartDate] = useState('');
  // 모달창 : 날짜 검색 종료일
  const [searchLeaveEndDate, setSearchLeaveEndDate] = useState('');
  // 모달창에서 선택한 휴가 데이터 값
  const [searchLeaveData, setSearchLeaveData] = useState({});
  // 모달창 열기
  const handleOpenAllLeave = () => setOpenAllLeave(true);
  // 모달창 취소 버튼 (데이터 저장 O)
  const handleCloseAllLeaveSave = () => {
    setOpenAllLeave(false);
    setSelectLeaveData(searchLeaveData);
    setSearchLeaveData({});
    setSearchLeaveStartDate('');
    setSearchLeaveEndDate('');
  };
  // 모달창 확인 버튼 (데이터 저장 X)
  const handleCloseAllLeave = () => {
    setOpenAllLeave(false);
    setSelectLeaveData({});
    setSearchLeaveData({});
    setSearchLeaveStartDate('');
    setSearchLeaveEndDate('');
  };

  // 사용하지 않은 부분
  console.log(updateTime);
  console.log(selectUserData);
  console.log(searchStartDate);
  console.log(searchEndDate);
  console.log(selectDate);
  console.log(selectLeaveData);
  console.log(searchLeaveStartDate);
  console.log(searchLeaveEndDate);

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

  // 데이터 생성
  // 출/퇴근 관련
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
    createAttendData('2023/10/19', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/15', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/21', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/22', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/23', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/24', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/25', '08:32:57', '18:01:13', 0)
  ];

  // 휴가 관련
  function createLeaveData(leaveStart, leaveEnd, leaveType, leaveCnt, appDate, approver, status) {
    return { leaveStart, leaveEnd, leaveType, leaveCnt, appDate, approver, status };
  }

  const leaveDatas = [
    createLeaveData('2023/10/11', '2023/10/11', '연차', '1', '2023/10/07', '이유나 팀장', 0),
    createLeaveData('2023/10/11', '2023/10/11', '반차(오후)', '0.5', '2023/10/07', '김유나 팀장', 0),
    createLeaveData('2023/10/11', '2023/10/11', '반차(오전)', '0.5', '2023/10/07', '이유나 팀장', 0),
    createLeaveData('2023/10/11', '2023/10/11', '연차', '1', '2023/10/07', '박유나 팀장', 1),
    createLeaveData('2023/10/11', '2023/10/11', '연차', '1', '2023/10/07', '이유나 팀장', 1),
    createLeaveData('2023/10/11', '2023/10/13', '공가', '3', '2023/10/07', '박유나 팀장', 0),
    createLeaveData('2023/10/11', '2023/10/13', '연차', '3', '2023/10/07', '이유나 팀장', 2),
    createLeaveData('2023/10/11', '2023/10/11', '연차', '1', '2023/10/07', '박유나 팀장', 0),
    createLeaveData('2023/10/11', '2023/10/11', '연차', '1', '2023/10/07', '이유나 팀장', 0)
  ];

  return (
    <ComponentSkeleton>
      <Box clone mx={1}>
        <BasicContainer>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4">근태 현황 수정</Typography>
            </Grid>
          </Grid>
          <Box mt={1} ml={1}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={4} md={4} lg={4}>
                <MainCard sx={{ pt: 2, mr: 1, height: '730px' }} content={false}>
                  <Box
                    pr={2}
                    pl={2}
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <BasicChip label="사원선택" color="gray" />
                    {/* 자동완성 부분 */}
                    <BasicAuto
                      label="이름"
                      datas={allUsers}
                      handleSelectUser={handleSelectUser}
                      searchName={searchName}
                      setSearchName={setSearchName}
                    />
                  </Box>
                  <SelectUserTable
                    value={value}
                    datas={allUsers}
                    searchName={searchName}
                    handleAllCheck={handleAllCheck}
                    handleSingleCheck={handleSingleCheck}
                    checkItems={checkItems}
                    setSelectUserData={setSelectUserData}
                  />
                </MainCard>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Box sx={{ borderBottom: 1, border: '0px' }}>
                  <MyTabs value={value} onChange={handleTab} aria-label="basic tabs example">
                    <MyTab label="출/퇴근" index="0" />
                    <MyTab label="휴가" index="1" />
                  </MyTabs>
                </Box>
                <ApprovalTab value={value} index={0} border={'none'}>
                  {checkItems.length > 1 && (
                    <MainCard sx={{ pt: 2, pr: 2, pl: 2, height: '690px' }} content={false}>
                      <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Typography variant="h5">일괄 출/퇴근 수정</Typography>
                          <Box clone mt={2.5}>
                            <BasicChip label="제목" color="gray" />
                            <TextField size="small" />
                          </Box>
                          <Box clone mt={1.5}>
                            <BasicChip label="수정사항" color="gray" />
                            <FormControl sx={{ ml: 1 }}>
                              <RadioGroup
                                row
                                sx={{ justifyContent: 'center', alignItems: 'center' }}
                                value={attendKind}
                                onChange={handleKindRadioChange}
                              >
                                <FormControlLabel value="start" control={<Radio size="small" />} label="출근" />
                                <FormControlLabel value="end" control={<Radio size="small" />} label="퇴근" />
                              </RadioGroup>
                            </FormControl>
                          </Box>
                          <Box clone mt={1.5}>
                            <BasicChip label="수정시간" color="gray" />
                            <FormControl sx={{ ml: 1 }}>
                              <RadioGroup
                                row
                                sx={{ justifyContent: 'center', alignItems: 'center' }}
                                value={attendDefault}
                                onChange={handleDefaultRadioChange}
                              >
                                <FormControlLabel value="default" control={<Radio size="small" />} label="기본값" />
                                <FormControlLabel value="other" control={<Radio size="small" />} label="직접입력" />
                              </RadioGroup>
                            </FormControl>
                            {attendDefault == 'other' && <TimePicker2 label={'수정시간'} setTime={setUpdateTime} />}
                            {attendDefault == 'default' && (
                              <TextField
                                size="small"
                                defaultValue={attendKind === 'start' ? '09 : 00 : 00' : '18 : 00 : 00'}
                                key={attendKind}
                                inputProps={{ readOnly: true }}
                                sx={{ width: '30%' }}
                              />
                            )}
                          </Box>
                          <Box clone mt={1.5} mr={1}>
                            <BasicChip label="수정사유" color="gray" />
                            <TextField multiline rows={5} sx={{ width: '84%' }} />
                          </Box>
                          <Box clone mt={1.5} mr={1}>
                            <BasicChip label="선택된 사원" color="gray" />
                          </Box>
                          <Stack direction="row" justifyContent="flex-end" mt={2} mr={1.5}>
                            <Button variant="contained">결재완료</Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </MainCard>
                  )}
                  {checkItems.length <= 1 && (
                    <>
                      <MainCard sx={{ mb: 1, pt: 2, height: '200px' }} content={false}>
                        <Grid container alignItems="center" direction="row" spacing={1} sx={{ pl: 2 }}>
                          <Grid item xs={1.5} md={1.5} lg={1.5}>
                            <Typography variant="h5">날짜 선택</Typography>
                          </Grid>
                          <Grid item xs={3} md={3} lg={3}>
                            <BasicDatePicker setDate={setSelectDate} />
                          </Grid>
                          <Grid item xs={2} md={2} lg={2}>
                            <Button variant="contained">검색</Button>
                          </Grid>
                          <Grid item xs={4} md={4} lg={4}></Grid>
                          <Grid item xs={1.5} md={1.5} lg={1.5}>
                            <Button variant="contained" onClick={handleOpenAll}>
                              전체 조회
                            </Button>
                          </Grid>
                        </Grid>
                        <Box clone mt={3}>
                          <UserAttendInfoTable data={selectAttendData} />
                          {Object.keys(selectAttendData).length === 0 && (
                            <Box
                              p={1}
                              sx={{
                                display: 'flex',
                                justifyContent: 'center', // 수평 중앙 정렬
                                alignItems: 'center' // 수직 중앙 정렬
                              }}
                            >
                              <Typography variant="h5">선택된 날짜 없음</Typography>
                            </Box>
                          )}
                        </Box>
                      </MainCard>
                      <MainCard sx={{ pt: 2, pr: 2, pl: 2, height: '490px' }} content={false}>
                        <Grid container spacing={1} justifyContent="center">
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="h5">출/퇴근 수정</Typography>
                            <Box clone mt={2.5}>
                              <BasicChip label="제목" color="gray" />
                              <TextField size="small" />
                            </Box>
                            <Box clone mt={1.5}>
                              <BasicChip label="결재자" color="gray" />
                              <TextField
                                label="결재자"
                                id="approver"
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
                              />
                            </Box>
                            <Box clone mt={1.5}>
                              <BasicChip label="수정사항" color="gray" />
                              <FormControl sx={{ ml: 1 }}>
                                <RadioGroup
                                  row
                                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                                  value={attendKind}
                                  onChange={handleKindRadioChange}
                                >
                                  <FormControlLabel value="start" control={<Radio size="small" />} label="출근" />
                                  <FormControlLabel value="end" control={<Radio size="small" />} label="퇴근" />
                                </RadioGroup>
                              </FormControl>
                            </Box>
                            <Box clone mt={1.5}>
                              <BasicChip label="수정시간" color="gray" />
                              <FormControl sx={{ ml: 1 }}>
                                <RadioGroup
                                  row
                                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                                  value={attendDefault}
                                  onChange={handleDefaultRadioChange}
                                >
                                  <FormControlLabel value="default" control={<Radio size="small" />} label="기본값" />
                                  <FormControlLabel value="other" control={<Radio size="small" />} label="직접입력" />
                                </RadioGroup>
                              </FormControl>
                              {attendDefault == 'other' && <TimePicker2 label={'수정시간'} setTime={setUpdateTime} />}
                              {attendDefault == 'default' && (
                                <TextField
                                  size="small"
                                  defaultValue={attendKind === 'start' ? '09 : 00 : 00' : '18 : 00 : 00'}
                                  key={attendKind}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: '30%' }}
                                />
                              )}
                            </Box>
                            <Box clone mt={1.5} mr={1}>
                              <BasicChip label="수정사유" color="gray" />
                              <TextField multiline rows={5} sx={{ width: '84%' }} />
                            </Box>
                            <Stack direction="row" justifyContent="flex-end" mt={2} mr={1.5}>
                              <Button variant="contained">결재완료</Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      </MainCard>
                    </>
                  )}
                  <AttendUpdateModal open={openAll} handleClose={handleCloseAll}>
                    <Grid container alignItems="center" direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Grid item xs={3.5} md={3.5} lg={4}>
                        <Typography variant="h5">전체 근태 내역</Typography>
                      </Grid>
                      <Grid item xs={3.5} md={3.5} lg={3.5}>
                        <BasicDatePicker setDate={setSearchStartDate} />
                      </Grid>
                      <Grid item xs={3.5} md={3.5} lg={3.5}>
                        <BasicDatePicker setDate={setSearchEndDate} />
                      </Grid>
                      <Grid item xs={1.5} md={1.5} lg={1}>
                        <Button variant="contained">검색</Button>
                      </Grid>
                    </Grid>
                    <UserAllAttendTable datas={attendDatas} handleMyCard={setSearchAttendData} height={'470px'} />
                    <Grid container justifyContent="right" spacing={1} sx={{ mt: 2 }}>
                      <Grid item>
                        <Button variant="contained" size="medium" onClick={handleCloseAll}>
                          취소
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" size="medium" onClick={handleCloseAllSave}>
                          확인
                        </Button>
                      </Grid>
                    </Grid>
                  </AttendUpdateModal>
                </ApprovalTab>
                <ApprovalTab value={value} index={1} border={'none'}>
                  <MainCard sx={{ pt: 2, pr: 2, pl: 2, height: '690px' }} content={false}>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="h4">휴가 수정</Typography>
                      </Grid>
                      <Button variant="contained" onClick={handleOpenAllLeave} sx={{ width: 100 }}>
                        휴가선택
                      </Button>
                    </Grid>
                    <Box clone mt={2}>
                      <UserLeaveInfoTable data={selectLeaveData} />
                      {Object.keys(selectLeaveData).length === 0 && (
                        <Box
                          p={1}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center', // 수평 중앙 정렬
                            alignItems: 'center' // 수직 중앙 정렬
                          }}
                        >
                          <Typography variant="h5">선택된 휴가 없음</Typography>
                        </Box>
                      )}
                    </Box>
                    <Box clone mt={2}>
                      <BasicChip label="제목" color="gray" />
                      <TextField
                        defaultValue={selectLeaveData.leaveStart}
                        key={selectLeaveData.leaveStart}
                        label="제목"
                        id="title"
                        size="small"
                        sx={{ width: '30%' }}
                        inputProps={{ readOnly: true }}
                      />
                    </Box>
                    <Box clone mt={2} sx={{ display: 'flex' }}>
                      <BasicChip label="결재자" color="gray" />
                      <TextField
                        defaultValue={selectLeaveData.approver}
                        key={selectLeaveData.approver}
                        label="결재자"
                        id="approver"
                        size="small"
                        sx={{ width: '20%', mr: 2 }}
                        inputProps={{ readOnly: true }}
                      />
                      <BasicChip label="결재상태" color="gray" />
                      {Object.keys(selectLeaveData).length !== 0 && (
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                          <Dot color={selectLeaveData.status === 0 ? 'success' : 'error'} />
                          <Typography>{selectLeaveData.status === 0 ? '결재승인' : '결재반려'}</Typography>
                        </Stack>
                      )}
                    </Box>
                    <Box clone mt={2}>
                      <BasicChip label="결재상태수정" color="gray" />
                      <FormControl sx={{ ml: 1 }}>
                        <RadioGroup
                          row
                          sx={{ justifyContent: 'center', alignItems: 'center' }}
                          value={leaveKind}
                          onChange={handleLeaveKindRadioChange}
                        >
                          <FormControlLabel value="y" control={<Radio size="small" />} label="승인" />
                          <FormControlLabel value="n" control={<Radio size="small" />} label="반려" />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                    <Box clone mt={2}>
                      <BasicChip label="수정사유" color="gray" />
                    </Box>
                    <Box clone mt={2}>
                      <TextField
                        id="title"
                        multiline
                        rows={8}
                        sx={{
                          width: '100%'
                        }}
                      />
                    </Box>
                    <Box clone mt={1}>
                      <Grid container justifyContent="right" spacing={1}>
                        <Grid item>
                          <Button variant="contained" size="medium">
                            완료
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </MainCard>
                  <AttendUpdateModal open={openAllLeave} handleClose={handleCloseAllLeave}>
                    <Grid container alignItems="center" direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Grid item xs={3.5} md={3.5} lg={4}>
                        <Typography variant="h5">전체 휴가 내역</Typography>
                      </Grid>
                      <Grid item xs={3.5} md={3.5} lg={3.5}>
                        <BasicDatePicker setDate={setSearchLeaveStartDate} />
                      </Grid>
                      <Grid item xs={3.5} md={3.5} lg={3.5}>
                        <BasicDatePicker setDate={setSearchLeaveEndDate} />
                      </Grid>
                      <Grid item xs={1.5} md={1.5} lg={1}>
                        <Button variant="contained">검색</Button>
                      </Grid>
                    </Grid>
                    {/* 결재 완료 된 휴가만 수정 가능 */}
                    <UserAllLeaveTable
                      datas={leaveDatas.filter((data) => data.status !== 2)}
                      handleMyCard={setSearchLeaveData}
                      height={'470px'}
                    />
                    <Grid container justifyContent="right" spacing={1} sx={{ mt: 2 }}>
                      <Grid item>
                        <Button variant="contained" size="medium" onClick={handleCloseAllLeave}>
                          취소
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" size="medium" onClick={handleCloseAllLeaveSave}>
                          확인
                        </Button>
                      </Grid>
                    </Grid>
                  </AttendUpdateModal>
                </ApprovalTab>
              </Grid>
            </Grid>
          </Box>
        </BasicContainer>
      </Box>
    </ComponentSkeleton>
  );
};

export default ModifyAttendance;
