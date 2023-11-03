// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import BasicContainer from 'components/container/BasicContainer';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField
} from '../../node_modules/@mui/material/index';
import BasicTab from 'components/tab/BasicTab';
import React, { useEffect, useState } from 'react';
import LeaveDonutChart from 'components/chart/LeaveDonutChart';
import AppLeaveTable from 'components/Table/AppLeaveTable';
import UnappLeaveTable from 'components/Table/UnappLeaveTable';
import { SearchOutlined, UploadOutlined } from '../../node_modules/@mui/icons-material/index';
import styled from 'styled-components';
import BasicDatePicker from 'components/DatePicker/BasicDatePicker';
import { useLeaveTab } from 'store/module';
import LeaveModal from 'components/Modal/LeaveModal';
import AppAuto from 'components/AutoComplete/AppAuto';
import axios from '../../node_modules/axios/index';
import ModalM from 'components/Modal/ModalM';
import CancelLeaveTable from 'components/Table/CancelLeaveTable';
import UserLeaveInfoTable from 'components/Table/UserLeaveInfoTable';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

const UserLeave = () => {
  const { index, setIndex } = useLeaveTab();
  const [selectedValue, setSelectedValue] = useState('annual');
  const [selectedHalfValue, setHalfValue] = useState('am');

  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };

  useEffect(() => {
    setIndex(0);
  }, []);

  // 결재 대기 중인 휴가 취소 (바로 취소 가능)
  const leaveCancel = (leaveapp_no) => {
    axios.delete(`/user-leave-request-await?leaveapp_no=${leaveapp_no}`).then((res) => {
      alert(res.data + ' 선택한 휴가 취소 완료');
      setIndex(0);
    });
  };

  // 결재 완료 된 휴가 취소 신청 (결재 받은 뒤 취소 처리)
  const requestLeaveCancel = (data) => {
    setSelectLeaveCancel(data);
    setIndex(2);
  };

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

  // 자동완성
  // 결재자 창에서 검색한 이름
  const [searchName, setSearchName] = useState('');
  // 휴가 신청 객체
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [start, setStart] = useState(new Date().toISOString().slice(0, 10));
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));
  const [firstApprover, setFirstApprover] = useState({});
  const [secondApprover, setSecondApprover] = useState({});

  // 사원선택의 자동완성 창에서 검색어 변경(검색) 될 때마다 searchName 설정
  const handleSelectUser = (event, newValue) => {
    setSearchName(newValue);
  };

  // 로그인 한 사용자
  const user = {
    user_no: 1,
    user_name: '이유나',
    user_position: '팀장',
    dept: {
      dept_no: 1,
      dept_name: '개발1팀'
    }
  };

  // 같은 부서의 근태담당자 (우선 지금은 팀장) 사용자 데이터
  const [allUsers, setAllUsers] = useState([]);
  // 로그인 한 사용자의 휴가 보유 현황 [사용연차, 잔여연차]
  const [leaveCnt, setLeaveCnt] = useState([0, 0]);
  // 로그인 한 사용자의 휴가신청내역 (결재대기 상태)
  const [leaveRequestAwait, setLeaveRequestAwait] = useState([]);
  // 로그인 한 사용자의 휴가신청내역 (결재완료-승인/반려, 결재진행중 상태)
  const [leaveRequestRecent, setLeaveRequestRecent] = useState([]);

  useEffect(() => {
    // 로그인 한 사용자 부서의 근태 담당자 내역 -> 결재자 검색창 autocomplete
    axios.get(`/dept-manager?dept_no=${user.dept.dept_no}`).then((res) => {
      setAllUsers(res.data);
    });
    // 로그인 한 사용자의 휴가 보유 현황 가져오기
    axios.get(`/user-leave?user_no=${user.user_no}`).then((res) => {
      setLeaveCnt([res.data.leave_use, res.data.leave_remain]);
    });
    // 로그인 한 사용자의 승인,반려,결재진행중 상태인 모든 휴가신청내역 가져오기
    axios.get(`/user-leave-request-recent?user_no=${user.user_no}`).then((res) => {
      setLeaveRequestRecent(res.data);
    });
    // 폼 초기화
    setTitle('');
    setReason('');
    setStart(new Date().toISOString().slice(0, 10));
    setEnd(new Date().toISOString().slice(0, 10));
    setFirstApprover({});
    setSecondApprover({});
    setSelectedValue('annual');
    setHalfValue('am');
    if (index === 0 || index === 1) {
      setSelectLeaveCancel({});
    }
  }, [index]);

  useEffect(() => {
    // 로그인 한 사용자의 결재대기 상태인 모든 휴가신청내역 가져오기
    axios.get(`/user-leave-request-await?user_no=${user.user_no}`).then((res) => {
      setLeaveRequestAwait(res.data);
    });
  }, [leaveRequestAwait]);

  // 휴가 신청 버튼
  function submitLeaveRequest() {
    if (
      Object.keys(firstApprover).length === 0 ||
      Object.keys(secondApprover).length === 0 ||
      Object.keys(start).length === 0 ||
      Object.keys(end).length === 0
    ) {
      alert('날짜 선택하시고 결재자 선택하세요.');
    } else {
      axios
        .post(`/user-leave-request?user_no=${user.user_no}`, {
          leaveapp_title:
            title === ''
              ? `${user.user_name}(${
                  selectedValue === 'annual'
                    ? '연차'
                    : selectedValue === 'public'
                    ? '공가'
                    : selectedHalfValue === 'am'
                    ? '오전반차'
                    : '오후반차'
                })${
                  selectedValue === 'half'
                    ? 0.5
                    : selectedValue === 'public'
                    ? 0
                    : Math.floor((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)) + 1
                }일`
              : title,
          leaveapp_content: reason,
          leaveapp_start: new Date(start),
          leaveapp_end: selectedValue === 'half' ? new Date(start) : new Date(end),
          leaveapp_total:
            selectedValue === 'half'
              ? 0.5
              : selectedValue === 'public'
              ? 0
              : Math.floor((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)) + 1,
          leaveapp_type: selectedValue === 'annual' ? 0 : selectedValue === 'public' ? 3 : selectedHalfValue === 'am' ? 1 : 2,
          firstapp_no: firstApprover.user_no,
          secondapp_no: secondApprover.user_no
        })
        .then((res) => {
          alert('신청완료 ' + res);
          setIndex(0);
        });
    }
  }

  // 휴가 취소 신청할 휴가 선택하는 모달창
  const [openCancel, setOpenCancel] = useState(false); // 탭 0. 출/퇴근 전체 조회 : 최근 이상 근태 내역 전체보기
  const handleOpenCancel = () => setOpenCancel(true); // 모달창 열기
  const handleCloseCancel = () => setOpenCancel(false); // 모달창 닫기
  // 모달창에서 휴가 클릭 시 선택되면서 모달창 닫기
  const handleSelectCancel = (data) => {
    handleCloseCancel();
    setSelectLeaveCancel(data);
  };

  // 휴가 취소 신청할 휴가
  const [selectLeaveCancel, setSelectLeaveCancel] = useState({});

  // 휴가 취소 신청 버튼
  function submitLeaveCancelRequest() {
    if (Object.keys(selectLeaveCancel).length === 0 || Object.keys(firstApprover).length === 0) {
      alert('날짜 선택하시고 결재자 선택하세요.');
    } else {
      axios
        .post(`/user-leave-cancel-request?user_no=${user.user_no}`, {
          leaveapp_title: title === '' ? `${user.user_name}(휴가취소)${selectLeaveCancel.leaveapp_total}일` : title,
          leaveapp_content: reason,
          leaveapp_start: new Date(selectLeaveCancel.leaveapp_start),
          leaveapp_end: new Date(selectLeaveCancel.leaveapp_end),
          leaveapp_total: selectLeaveCancel.leaveapp_total,
          leaveapp_cancel_no: selectLeaveCancel.leaveapp_cancel_no,
          firstapp_no: firstApprover.user_no
        })
        .then((res) => {
          alert('신청완료 ' + res);
          setIndex(0);
        });
    }
  }
  // Chip 커스텀
  const MyChip = styled(Chip)`
    background-color: gray;
    color: white;
    width: 100px;
    margin-right: 10px;
  `;

  // 파일 업로드
  const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    whitespace: nowrap;
    width: 1;
  `;

  let content;
  if (selectedValue === 'annual') {
    content = (
      <>
        <Box clone mt={2}>
          <MyChip label="시작날짜" />
          <BasicDatePicker sx={{ width: '30px' }} setDate={setStart} val={start} />
        </Box>
        <Box clone mt={2}>
          <MyChip label="종료날짜" />
          <BasicDatePicker sx={{ width: '30px' }} setDate={setEnd} val={end} />
        </Box>
      </>
    );
  } else if (selectedValue === 'half') {
    content = (
      <>
        <Box clone mt={2}>
          <MyChip label="날짜" />
          <BasicDatePicker sx={{ width: '30px' }} setDate={setStart} val={start} />
        </Box>
        <Box clone mt={2}>
          <MyChip label="반차 종류" />
          <FormControl sx={{ ml: 1 }}>
            <RadioGroup
              row
              value={selectedHalfValue}
              onChange={(e) => {
                setHalfValue(e.target.value);
              }}
            >
              <FormControlLabel value="am" control={<Radio size="small" />} label="오전" />
              <FormControlLabel value="pm" control={<Radio size="small" />} label="오후" />
            </RadioGroup>
          </FormControl>
        </Box>
      </>
    );
  } else if (selectedValue === 'public') {
    content = (
      <>
        <Box clone mt={2}>
          <MyChip label="시작날짜" />
          <BasicDatePicker sx={{ width: '30px' }} setDate={setStart} val={start} />
        </Box>
        <Box clone mt={2}>
          <MyChip label="종료날짜" />
          <BasicDatePicker sx={{ width: '30px' }} setDate={setEnd} val={end} />
        </Box>
        <Box clone mt={2}>
          <MyChip label="증빙 업로드" />
          <Button component="label" variant="contained" size="medium" endIcon={<UploadOutlined />}>
            파일 선택
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
      </>
    );
  }

  return (
    <ComponentSkeleton>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={index} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="휴가조회" />
          <Tab label="휴가신청" />
          <Tab label="휴가취소신청" />
        </Tabs>
      </Box>
      <BasicTab value={index} index={0}>
        <Grid container spacing={1}>
          <Grid item xs={4} sm={4} md={4} lg={4} sx={{ height: '360px' }}>
            <BasicContainer sx={{ height: 1 }}>
              <LeaveDonutChart series={leaveCnt} />
            </BasicContainer>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} sx={{ overflow: 'auto' }}>
            <BasicContainer>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">결재 대기 내역</Typography>
                </Grid>
              </Grid>
              <UnappLeaveTable leaveCancel={leaveCancel} datas={leaveRequestAwait} handleOpen={handleOpen} />
            </BasicContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <BasicContainer>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">최근 결재 완료 내역</Typography>
                </Grid>
              </Grid>
              <AppLeaveTable requestLeaveCancel={requestLeaveCancel} datas={leaveRequestRecent.slice(0, 7)} handleOpen={handleOpen} />
            </BasicContainer>
          </Grid>
        </Grid>
        <LeaveModal open={modalOpen} handleClose={handleClose} data={modalData} />
      </BasicTab>
      <BasicTab value={index} index={1}>
        <BasicContainer>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h4">휴가 신청</Typography>
                </Grid>
              </Grid>
              <Box clone mt={2}>
                <MyChip label="제목" />
                <TextField
                  label="제목"
                  id="title"
                  size="small"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Box>
              <Box clone mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <EditNoteRoundedIcon fontSize="medium" color="secondary" sx={{ mx: 1 }} />
                <Typography size="small" color="secondary">
                  제목은 입력하지 않을 시 자동 지정됩니다.
                </Typography>
              </Box>
              <Box clone mt={2} sx={{ display: 'flex' }}>
                <MyChip label="1차 결재자" />
                <AppAuto
                  label="1차 결재자"
                  datas={allUsers.filter((data) => data !== secondApprover)}
                  handleSelectUser={handleSelectUser}
                  searchName={searchName}
                  setSearchName={setSearchName}
                  setApprover={setFirstApprover}
                />
              </Box>
              <Box clone mt={2} sx={{ display: 'flex' }}>
                <MyChip label="2차 결재자" />
                <AppAuto
                  label="2차 결재자"
                  datas={allUsers.filter((data) => data !== firstApprover)}
                  handleSelectUser={handleSelectUser}
                  searchName={searchName}
                  setSearchName={setSearchName}
                  setApprover={setSecondApprover}
                />
              </Box>
              <Box clone mt={2}>
                <MyChip label="휴가 종류" />
                <FormControl sx={{ ml: 1 }}>
                  <RadioGroup
                    row
                    value={selectedValue}
                    onChange={(e) => {
                      setSelectedValue(e.target.value);
                    }}
                  >
                    <FormControlLabel value="annual" control={<Radio size="small" />} label="연차" />
                    <FormControlLabel value="half" control={<Radio size="small" />} label="반차" />
                    <FormControlLabel value="public" control={<Radio size="small" />} label="공가" />
                  </RadioGroup>
                </FormControl>
                <Box clone mt={2}>
                  {content}
                </Box>
              </Box>
              <Box clone mt={2}>
                <MyChip label="휴가 사유" />
              </Box>
              <Box clone mt={2}>
                <TextField
                  id="reason"
                  multiline
                  rows={8}
                  sx={{
                    width: '100%'
                  }}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                />
              </Box>
              <Box clone mt={1}>
                <Grid container justifyContent="right" spacing={1}>
                  <Grid item>
                    <Button variant="contained" size="medium" onClick={submitLeaveRequest}>
                      완료
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </BasicContainer>
      </BasicTab>
      <BasicTab value={index} index={2}>
        <BasicContainer>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={11} sm={11} md={11} lg={11}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h4">휴가 취소 신청</Typography>
                </Grid>
              </Grid>
              <Box clone mt={2}>
                <MyChip label="제목" />
                <TextField label="제목" id="title" size="small" onChange={(e) => setTitle(e.target.value)} />
              </Box>
              <Box clone mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <EditNoteRoundedIcon fontSize="medium" color="secondary" sx={{ mx: 1 }} />
                <Typography size="small" color="secondary">
                  제목은 입력하지 않을 시 자동 지정됩니다.
                </Typography>
              </Box>
              <Box clone mt={2} sx={{ display: 'flex' }}>
                <MyChip label="결재자" />
                <AppAuto
                  label="결재자"
                  datas={allUsers}
                  handleSelectUser={handleSelectUser}
                  searchName={searchName}
                  setSearchName={setSearchName}
                  setApprover={setFirstApprover}
                />
              </Box>
              <Box clone mt={2}>
                <MyChip label="휴가 선택" />
                <TextField
                  label="휴가 선택"
                  id="leave"
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
                  onClick={handleOpenCancel}
                />
              </Box>
              <Box clone mt={2}>
                <UserLeaveInfoTable data={selectLeaveCancel} />
                {Object.keys(selectLeaveCancel).length === 0 && (
                  <Box
                    p={1}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center', // 수평 중앙 정렬
                      alignItems: 'center' // 수직 중앙 정렬
                    }}
                  >
                    <ErrorOutlineIcon fontSize="medium" color="secondary" sx={{ mx: 1 }} />
                    <Typography size="small" color="secondary">
                      선택된 휴가 없음
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box clone mt={2}>
                <MyChip label="취소 사유" />
              </Box>
              <Box clone mt={2}>
                <TextField
                  id="title"
                  multiline
                  rows={8}
                  sx={{
                    width: '100%'
                  }}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Box>
              <Box clone mt={1}>
                <Grid container justifyContent="right" spacing={1}>
                  <Grid item>
                    <Button variant="contained" size="medium" onClick={submitLeaveCancelRequest}>
                      완료
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <ModalM open={openCancel} handleClose={handleCloseCancel}>
            <Grid container alignItems="center" direction="row" spacing={1} sx={{ mb: 2 }}>
              <Grid item xs={3.4} md={3.4} lg={3.4}>
                <Typography variant="h5">전체 휴가 신청 내역</Typography>
              </Grid>
              <Grid item xs={8.6} md={8.6} lg={8.6}></Grid>
            </Grid>
            <CancelLeaveTable datas={leaveRequestRecent} handleSelectCancel={handleSelectCancel} />
            <Grid container justifyContent="right" spacing={1} sx={{ mt: 2 }}>
              <Grid item>
                <Button variant="contained" size="medium" onClick={handleCloseCancel}>
                  닫기
                </Button>
              </Grid>
            </Grid>
          </ModalM>
        </BasicContainer>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default UserLeave;
