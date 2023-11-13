/* eslint-disable no-unused-vars */
// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import BasicContainer from 'components/container/BasicContainer';
import MainCard from 'components/MainCard';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField
} from '../../node_modules/@mui/material/index';
import BasicTab from 'components/tab/BasicTab';
import React, { useEffect, useState } from 'react';
import UpdateAttendTable from 'components/Table/UpdateAttendTable';
import BasicDatePicker from 'components/DatePicker/BasicDatePicker';
import BasicChip from 'components/Chip/BasicChip';
import axios from '../../node_modules/axios/index';
import AppAuto from 'components/AutoComplete/AppAuto';
import ModalS from 'components/Modal/ModalS';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { LocalizationProvider, StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import { over } from 'lodash';
// import styled from 'styled-components';

// // 파일 업로드
// const VisuallyHiddenInput = styled.input`
//   clip: rect(0 0 0 0);
//   clippath: inset(50%);
//   height: 1;
//   overflow: hidden;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   whitespace: nowrap;
//   width: 1;
// `;

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
    if (reason.length === 0 || overTimeContent.length === 0 || Object.keys(approver).length === 0) {
      alert('모든칸은 필수 입력사항입니다.');
    } else {
      axios
        .post(`/over-time`, {
          overtimeVo: {
            overtime_type: overTimeKind,
            // overtime_time :
            overtime_content: overTimeContent,
            overTime_reason: reason,
            overtime_user_no: token.user_no
          },
          attendanceVo: {
            user_no: token.user_no,
            attend_date: end.toISOString().substring(0, 10),
            //정책 퇴근시간 + 1시간으로 수정해야됨.
            attend_start: '19:00:00',
            attend_end: end.toTimeString().substring(0, 8),
            attend_status: '초과근무'
          }
        })
        .then((res) => {
          console.log(res);
          // setValue(1);
        });
    }
  }

  // 탭 1. 출/퇴근 수정 목록 조회 ====================================
  const [selectAttendEditData, setSelectAttendEditData] = useState({}); //목록에서 선택한 수정 데이터 : 모달창에서 상세 조회

  // 날짜별 데이터 검색 =========================================
  const [searchStartDate, setSearchStartDate] = useState(new Date().toISOString().slice(0, 10)); // 검색 시작 날짜
  const [searchEndDate, setSearchEndDate] = useState(new Date().toISOString().slice(0, 10)); // 검색 종료 날짜
  const [filteredAttendData, setFilteredAttendData] = useState([0, []]); // 검색 결과 : 출퇴근 내역
  const [filteredAttendEditData, setFilteredAttendEditData] = useState([0, []]); // 검색 결과 : 출퇴근 수정 내역

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
    setFilteredAttendData([0, []]);
    setFilteredAttendEditData([0, []]);
    setSearchStartDate(new Date());
    setSearchEndDate(new Date());
  };

  // 같은 부서의 근태담당자 사용자 데이터
  const [allUsers, setAllUsers] = useState([]);

  // 로그인 한 사용자의 초과근무 신청 기록 가져오기
  const [overTimeDatas, setOverTimeDatas] = useState([]);

  useEffect(() => {
    // 로그인 한 사용자 부서의 근태 담당자 내역 -> 결재자 검색창 autocomplete
    axios.get(`/dept-manager?dept_no=${token.dept_no}`).then((res) => {
      setAllUsers(res.data);
    });
    // 로그인 한 사용자의 전체 출퇴근 수정 내역 조회
    axios.get(`/attend-edit?user_no=${token.user_no}`).then((res) => {
      setOverTimeDatas(res.data);
    });
  }, [value]);

  // 자동완성
  // 결재자 창에서 검색한 이름
  const [searchName, setSearchName] = useState('');
  // 선택한 결재자 데이터
  const [approver, setApprover] = useState({});

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
            <BasicChip label="시작 일시" color="gray" />
            <DateTimeField sx={{ mr: 3 }} value={dayjs(`${start}`)} onClick={handleStartDateFieldOnClick} />
            <BasicChip label="종료 일시" color="gray" />
            <DateTimeField value={dayjs(`${end}`)} onClick={handleEndDateFieldOnClick} />
          </Stack>
          {startDatePicker && (
            <StaticDateTimePicker
              sx={{ mt: 1, width: '20%', border: 1, borderRadius: 2 }}
              value={dayjs(`${start}`)}
              onAccept={handleStartDateFieldOnAccept}
              onClose={() => setStartDatePicker(false)}
            />
          )}
          {endDatePicker && (
            <StaticDateTimePicker
              sx={{ mt: 1, width: '20%', border: 1, borderRadius: 2, position: 'relative', left: '25%' }}
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
            <BasicChip label="종료 일시" color="gray" />
            <DateTimeField value={dayjs(`${end}`)} onClick={handleEndDateFieldOnClick} />
          </Stack>
          {endDatePicker && (
            <StaticDateTimePicker
              sx={{ mt: 1, width: '20%', border: 1, borderRadius: 2 }}
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="초과근무 신청" />
          <Tab label="초과근무 신청 목록" />
        </Tabs>
      </Box>
      <div role="tabpanel" hidden={value !== 0} id={`simple-tabpanel-${0}`} aria-labelledby={`simple-tab-${0}`} value={value}>
        <Box pb={2}>
          <MainCard sx={{ mt: 1, pt: 2, pr: 2, pl: 2, borderRadius: 0 }} content={false}>
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h4">초과근무 신청</Typography>
                <Box mt={2}>
                  <BasicChip label="근무 종류" color="gray" />
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
                  <Box mt={2}>{content}</Box>
                </Box>
                <Box mt={2.5} sx={{ display: 'flex' }}>
                  <BasicChip label="결재자" color="gray" />
                  <AppAuto
                    label="결재자"
                    datas={allUsers}
                    handleSelectUser={handleSelectUser}
                    searchName={searchName}
                    setSearchName={setSearchName}
                    setApprover={setApprover}
                  />
                </Box>
                {/* TODO: 파일 증빙 업로드될때 사용 */}
                {/* <Box mt={2.5}>
                  <BasicChip label="증빙 업로드" color="gray" />
                  <Button component="label" variant="contained" size="medium" endIcon={<UploadOutlined />}>
                    파일 선택
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box> */}
                <Box mt={2.5} mr={1}>
                  <BasicChip label="업무내용" color="gray" />
                  <TextField
                    value={overTimeContent}
                    sx={{ width: '90%' }}
                    onChange={(e) => {
                      setOverTimeContent(e.target.value);
                    }}
                  />
                </Box>
                <Box mt={2.5} mr={1}>
                  <BasicChip label="근무사유" color="gray" />
                  <TextField
                    value={reason}
                    multiline
                    rows={3}
                    sx={{ width: '90%' }}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </Box>
                <Stack direction="row" justifyContent="flex-end" mt={2.5} mr={4} mb={2.5}>
                  <Button variant="contained" onClick={submitOverTime}>
                    신청
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Box>
      </div>
      <div role="tabpanel" hidden={value !== 1} id={`simple-tabpanel-${1}`} aria-labelledby={`simple-tab-${1}`} value={value}>
        <Box mx={1} my={1} pb={2}>
          <BasicContainer sx={{ height: '760px' }}>
            <Grid container>
              <Grid item xs={6} md={6} lg={4.5}>
                <Typography variant="h4">출/퇴근 수정 요청 목록</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={7.5}>
                <Grid container direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Grid item sx={{ display: 'flex', mt: 1 }}>
                    <Box mr={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h5" sx={{ color: 'gray' }}>
                        수정 날짜 선택
                      </Typography>
                    </Box>
                    <Box mr={1}>
                      <BasicDatePicker setDate={setSearchStartDate} val={searchStartDate} />
                    </Box>
                    <Box mr={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h4">~</Typography>
                    </Box>
                    <Box mr={1}>
                      <BasicDatePicker setDate={setSearchEndDate} val={searchEndDate} />
                    </Box>
                    <Box mr={0.5} mt={0.3}>
                      <Button variant="contained" color="secondary" onClick={searchAttendEditButton}>
                        조회
                      </Button>
                    </Box>
                    <Box mt={0.3}>
                      <Button variant="contained" color="secondary" onClick={searchInitial}>
                        초기화
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <UpdateAttendTable datas={filteredAttendEditData[0] === 0 ? overTimeDatas : filteredAttendEditData[1]} />
            </MainCard>
          </BasicContainer>
        </Box>
      </div>
    </>
  );
};

export default UserOverTimeReq;
