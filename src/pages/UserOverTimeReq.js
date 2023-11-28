/* eslint-disable no-unused-vars */
// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField
} from '../../node_modules/@mui/material/index';
import React, { useEffect, useState } from 'react';
import BasicDatePicker from 'components/DatePicker/BasicDatePicker';
import BasicChip from 'components/Chip/BasicChip';
import axios from '../../node_modules/axios/index';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import OverTimeTable from 'components/Table/OverTimeTable';
import '../assets/css/user-overtime-req.css';

const UserOverTimeReq = () => {
  //token 값을 decode해주는 코드
  const token = jwtDecode(localStorage.getItem('token').slice(7));

  // 탭(0.초과근무신청, 1.신청목록) ================================
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 탭 0. 초과근무신청 =========================================

  const [overTimeKind, setOverTimeKind] = useState('weekend');
  const [startDatePicker, setStartDatePicker] = React.useState(false);
  const [endDatePicker, setEndDatePicker] = React.useState(false);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const handleStartDateFieldOnClick = () => {
    setStartDatePicker((pre) => !pre);
    if (endDatePicker) setEndDatePicker(false);
  };

  const handleStartDateFieldOnAccept = (e) => {
    setStart(new Date(e));
    setStartDatePicker((pre) => !pre);
  };

  const handleEndDateFieldOnClick = () => {
    setEndDatePicker((pre) => !pre);
    if (startDatePicker) setStartDatePicker(false);
  };

  const handleEndDateFieldOnAccept = (e) => {
    setEnd(new Date(e));
    setEndDatePicker((pre) => !pre);
  };

  // 출/퇴근 수정 폼
  const [reason, setReason] = useState(''); // 근무 사유
  const [overTimeContent, setOverTimeContent] = useState(''); // 근무 내용

  // 출퇴근 수정 완료 버튼 함수
  function submitOverTime() {
    //validate
    if (reason.length === 0 || overTimeContent.length === 0) {
      alert('모든칸은 필수 입력사항입니다.');
    } else {
      const temp = {
        overtimeVo: {
          overtime_type: overTimeKind == 'weekend' ? 0 : 1,
          overtime_time: dayjs(end).diff(dayjs(start), 'hours') + ':00:00',
          overtime_content: overTimeContent,
          overtime_reason: reason,
          overtimeapp_user_no: approver
        },
        attendanceVo: {
          user_no: token.user_no,
          attend_date: start.toISOString().substring(0, 10),
          //정책 퇴근시간 + 1시간으로 수정해야됨.
          attend_start: overTimeKind == 'weekend' ? end.toTimeString().substring(0, 8) : '19:00:00',
          attend_end: end.toTimeString().substring(0, 8),
          attend_status: '초과근무'
        }
      };
      console.log(temp);
      axios.post(`/over-time`, temp).then((res) => {
        console.log(res);
        setValue(1);
      });
    }
  }

  // 탭 1. 출/퇴근 수정 목록 조회 ====================================
  // const [selectAttendEditData, setSelectAttendEditData] = useState({}); //목록에서 선택한 수정 데이터 : 모달창에서 상세 조회

  // 날짜별 데이터 검색 =========================================
  var d = new Date();
  d.setMonth(d.getMonth() - 3);
  const [searchStartDate, setSearchStartDate] = useState(d.toISOString().slice(0, 10)); // 검색 시작 날짜
  var c = new Date();
  c.setDate(c.getDate() + 1);
  const [searchEndDate, setSearchEndDate] = useState(c.toISOString().slice(0, 10)); // 검색 종료 날짜

  // 출퇴근 수정 내역 검색 함수
  const searchAttendEditButton = () => {
    const startDate = new Date(searchStartDate).setHours(0, 0, 0, 0);
    const endDate = new Date(searchEndDate).setHours(23, 59, 59, 0);
    if (startDate > endDate) {
      alert('종료일이 시작일보다 작을 수 없습니다.');
    } else if (!searchStartDate || !searchEndDate) {
      alert('검색일을 선택해주세요.');
    } else {
      setFilteredAttendEditData((prevState) => {
        const newFiltered = [...prevState];
        newFiltered[0] = 1;
        newFiltered[1] = overTimeDatas.filter((attendEdit) => {
          const attendEditDate = new Date(attendEdit.attend_date);
          return attendEditDate >= startDate && attendEditDate <= endDate;
        });
        return newFiltered;
      });
    }
  };

  // 검색 초기화
  const searchInitial = () => {
    setFilteredAttendEditData([0, []]);
    var d = new Date();
    d.setMonth(d.getMonth() - 3);
    setSearchStartDate(d);
    var c = new Date();
    c.setDate(c.getDate() + 1);
    setSearchEndDate(c);
  };

  // 같은 부서의 근태담당자 사용자 데이터
  const [allUsers, setAllUsers] = useState([]);

  // 로그인 한 사용자의 초과근무 신청 기록 가져오기
  const [overTimeDatas, setOverTimeDatas] = useState([]);

  useEffect(() => {
    // 로그인 한 사용자 부서의 근태 담당자 내역 -> 결재자 검색창 autocomplete
    axios.get(`/dept-manager?dept_no=${token.dept_no}`).then((res) => {
      console.log(res.data);
      setAllUsers(res.data);
    });
    // 로그인 한 사용자의 전체 초과근무 신청 내역 조회
    console.log(searchStartDate);
    axios.get(`/over-time?user_no=${token.user_no}&start_date=${searchStartDate}&end_date=${searchEndDate}`).then((res) => {
      setOverTimeDatas(res.data);
    });
  }, [value]);

  // 자동완성
  // 결재자 창에서 검색한 이름
  const [searchName, setSearchName] = useState('');
  // 선택한 결재자 데이터
  const [approver, setApprover] = useState(5);

  // 사원선택의 자동완성 창에서 검색어 변경(검색) 될 때마다 searchName 설정
  const handleSelectUser = (event, newValue) => {
    setSearchName(newValue);
  };

  let content;
  if (overTimeKind === 'weekend') {
    content = (
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" alignItems="center">
            <BasicChip label="시작 일시" color="#46a5f3" />
            <DateTimeField
              sx={{ width: '25rem', mr: '17rem' }}
              value={dayjs(`${start}`)}
              onClick={handleStartDateFieldOnClick}
              format={'YYYY / MM / DD hh:mm A'}
            />
            <BasicChip label="종료 일시" color="#46a5f3" />
            <DateTimeField
              sx={{ width: '25rem' }}
              value={dayjs(`${end}`)}
              onClick={handleEndDateFieldOnClick}
              format={'YYYY / MM / DD hh:mm A'}
            />
          </Stack>
          {startDatePicker && (
            <StaticDateTimePicker
              sx={{ mt: 1, width: '25rem', border: 1, borderRadius: 2, position: 'absolute', left: '28rem', zIndex: 900 }}
              value={dayjs(`${start}`)}
              onAccept={handleStartDateFieldOnAccept}
              onClose={() => setStartDatePicker(false)}
            />
          )}
          {endDatePicker && (
            <StaticDateTimePicker
              sx={{ mt: 1, width: '25rem', border: 1, borderRadius: 2, position: 'absolute', left: '77.4rem', zIndex: 900 }}
              value={dayjs(`${end}`)}
              onAccept={handleEndDateFieldOnAccept}
              onClose={() => setEndDatePicker(false)}
            />
          )}
        </LocalizationProvider>
      </>
    );
  } else if (overTimeKind === 'extension') {
    content = (
      <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" alignItems="center">
            <BasicChip label="종료 일시" color="#46a5f3" />
            <DateTimeField sx={{ width: '25rem' }} value={dayjs(`${end}`)} onClick={handleEndDateFieldOnClick} />
          </Stack>
          {endDatePicker && (
            <StaticDateTimePicker
              sx={{ mt: 1, width: '25rem', border: 1, borderRadius: 2 }}
              value={dayjs(`${end}`)}
              onAccept={handleEndDateFieldOnAccept}
              onClose={() => setEndDatePicker(false)}
            />
          )}
        </LocalizationProvider>
      </>
    );
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="초과근무 신청" />
          <Tab label="초과근무 신청 목록" />
        </Tabs>
      </Box>
      <div
        role="tabpanel"
        hidden={value !== 0}
        id={`simple-tabpanel-${0}`}
        aria-labelledby={`simple-tab-${0}`}
        value={value}
        style={{ height: '45rem' }}
      >
        <Box sx={{ ml: 2, mr: 2, height: '100%' }}>
          <MainCard sx={{ pt: 3, pr: 3, pl: 3, height: '100%' }} content={false}>
            <Grid container direction="column" justifyContent="center" spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h4" mb={2} mt={1}>
                  초과근무 신청
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <BasicChip label="근무 종류" color="#46a5f3" />
                <FormControl sx={{ ml: 1 }}>
                  <RadioGroup
                    row
                    value={overTimeKind}
                    onChange={(e) => {
                      setOverTimeKind(e.target.value);
                    }}
                  >
                    <FormControlLabel value="weekend" control={<Radio size="small" />} label="주말근무" />
                    <FormControlLabel value="extension" control={<Radio size="small" />} label="연장근무" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {content}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Stack direction="row">
                  <BasicChip label="결재자" color="#46a5f3" />
                  {Object.keys(allUsers).length > 0 && (
                    <TextField select size="normal" sx={{ width: '25rem' }} value={approver} onChange={(e) => setApprover(e.target.value)}>
                      {allUsers.map((user) => {
                        return (
                          <MenuItem key={user.user_no} value={user.user_no}>
                            {user.user_name + ' ' + user.user_position}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  )}
                </Stack>
              </Grid>
              {/* TODO: 파일 증빙 업로드될때 사용 */}
              {/* <Box mt={2.5}>
                  <BasicChip label="증빙 업로드" color="#46a5f3" />
                  <Button component="label" variant="contained" size="medium" endIcon={<UploadOutlined />}>
                    파일 선택
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box> */}
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Stack direction="row">
                  <BasicChip label="업무내용" color="#46a5f3" />
                  <TextField
                    value={overTimeContent}
                    sx={{ width: '74rem' }}
                    onChange={(e) => {
                      setOverTimeContent(e.target.value);
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} >
                <Stack direction="row">
                  <BasicChip label="근무사유" color="#46a5f3" />
                  <TextField
                    value={reason}
                    multiline
                    rows={3}
                    sx={{ width: '74rem' }}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} >
                <Stack direction="row" justifyContent="flex-end">
                  <Button variant="contained" onClick={submitOverTime} sx={{ width: '6rem', mr: '3rem' }}>
                    신청
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Box>
      </div>
      <div
        role="tabpanel"
        hidden={value !== 1}
        id={`simple-tabpanel-${1}`}
        aria-labelledby={`simple-tab-${1}`}
        value={value}
        style={{ height: '45rem' }}
      >
        <Box sx={{ ml: 2, mr: 2, height: '100%' }}>
          <MainCard sx={{ pt: 3, pr: 3, pl: 3, height: '100%' }} content={false}>
            <Stack direction="row" alignItems="center">
              <Typography variant="h4">초과근무 신청 목록</Typography>
              <Stack direction="row" alignItems="center" spacing={2} ml={'28rem'}>
                <Typography variant="h5" mr={'2rem'} sx={{ color: '#46a5f3' }}>
                  신청 날짜 선택
                </Typography>
                <BasicDatePicker
                  width="10rem"
                  setDate={(e) => setSearchStartDate(e.target.value.toISOString().slice(0, 10))}
                  val={searchStartDate}
                />
                <Typography variant="h4">~</Typography>
                <BasicDatePicker
                  width="10rem"
                  setDate={(e) => setSearchEndDate(e.target.value.toISOString().slice(0, 10))}
                  val={searchEndDate}
                />
                <Button variant="contained" onClick={searchAttendEditButton}>
                  조회
                </Button>
                <Button variant="contained" color="secondary" onClick={searchInitial}>
                  초기화
                </Button>
              </Stack>
            </Stack>
            <OverTimeTable datas={overTimeDatas} />
          </MainCard>
        </Box>
      </div>
    </>
  );
};

export default UserOverTimeReq;
