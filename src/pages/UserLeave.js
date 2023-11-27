// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import BasicContainer from 'components/container/BasicContainer';
import {
  Alert,
  Box,
  Button,
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
import LeaveDonutChart from 'components/chart/LeaveDonutChart';
import AppLeaveTable from 'components/Table/AppLeaveTable';
import UnappLeaveTable from 'components/Table/UnappLeaveTable';
import { SearchOutlined } from '../../node_modules/@mui/icons-material/index';
// UploadOutlined
// import styled from 'styled-components';
import { useLeaveTab } from 'store/module';
import LeaveModal from 'components/Modal/LeaveModal';
import AppAuto from 'components/AutoComplete/AppAuto';
import axios from '../../node_modules/axios/index';
import ModalM from 'components/Modal/ModalM';
import CancelLeaveTable from 'components/Table/CancelLeaveTable';
import UserLeaveInfoTable from 'components/Table/UserLeaveInfoTable';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';
import BasicChip from 'components/Chip/BasicChip';
import LimitDatePicker from 'components/DatePicker/LimitDatePicker';
import FileUpload from 'components/File/FileUpload';
import SuccessModal from 'components/Modal/SuccessModal';
import FailModal from 'components/Modal/FailModal';
import { useLocation } from '../../node_modules/react-router-dom/dist/index';

const UserLeave = () => {
  const { index, setIndex } = useLeaveTab();
  const [selectedValue, setSelectedValue] = useState('annual');
  const [selectedHalfValue, setHalfValue] = useState('am');
  const [initialized, setInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.val === 1) {
      console.log(location.state);
      setIndex(1);
      setSelectedValue(location.state.selectedValue);
      setHalfValue(location.state.selectedHalfValue);
      setStart(location.state.start);
      setEnd(location.state.end);
    } else {
      setIndex(0);
    }
    // 로그인 한 사용자 부서의 근태 담당자 내역 -> 결재자 검색창 autocomplete
    axios.get(`/dept-manager?dept_no=${token.dept_no}`).then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  useEffect(() => {
    if (initialized && !(location.state && location.state.val === 1)) {
      setStart('');
      setEnd('');
      setHalfValue('am');
      setInitialized(true);
    }
  }, [selectedValue]);

  //token 값을 decode해주는 코드
  const token = jwtDecode(localStorage.getItem('token').slice(7));

  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };

  // 결재 대기 중인 휴가 취소 (바로 취소 가능)
  const leaveCancel = (leaveapp_no) => {
    axios.get(`/user-leave-request-delete?leaveapp_no=${leaveapp_no}`).then((res) => {
      console.log(res.data);
      handleOpenDeleteModal();
      // 로그인 한 사용자의 결재대기 상태인 모든 휴가신청내역 가져오기
      axios.get(`/user-leave-request-await?user_no=${token.user_no}`).then((res) => {
        setLeaveRequestAwait(res.data);
      });
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

  // 모달창 1. 결재 대기중인 휴가 삭제 성공
  const [deleteModal, setDeleteModal] = React.useState(false);
  // 모달창 활성화 버튼
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
    setTimeout(() => {
      setDeleteModal(false);
    }, 1500);
  };
  // 모달창 취소 버튼
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  // 모달창 2. 신청 실패
  const [failModal, setFailModal] = React.useState(false);
  // 모달창 활성화 버튼
  const handleOpenFailModal = () => {
    setFailModal(true);
    setTimeout(() => {
      setFailModal(false);
    }, 1500);
  };
  // 모달창 취소 버튼
  const handleCloseFailModal = () => {
    setFailModal(false);
  };
  // 모달창 3. 휴가 신청 성공
  const [successModal, setSuccessModal] = React.useState(false);
  // 모달창 활성화 버튼
  const handleOpenSuccessModal = () => {
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      setIndex(0);
    }, 1500);
  };
  // 모달창 취소 버튼
  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    setIndex(0);
  };
  // 모달창 3. 휴가 취소 신청 성공
  const [successCancelModal, setSuccessCancelModal] = React.useState(false);
  // 모달창 활성화 버튼
  const handleOpenSuccessCancelModal = () => {
    setSuccessCancelModal(true);
  };
  // 모달창 취소 버튼
  const handleCloseSuccessCancelModal = () => {
    setSuccessCancelModal(false);
    setIndex(0);
  };

  // 자동완성
  // 결재자 창에서 검색한 이름
  const [searchName, setSearchName] = useState('');
  // 휴가 신청 객체
  const [reason, setReason] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [firstApprover, setFirstApprover] = useState({});
  const [secondApprover, setSecondApprover] = useState({});
  // 파일 업로드
  const [uploadedInfo, setUploadedInfo] = useState([]); // 파일 업로드를 위한 배열

  // 특정 날짜가 주말인지 확인하는 함수
  function isWeekend(date) {
    const day = date.getDay(); // 0은 일요일, 1은 월요일, ..., 6은 토요일
    return day === 0 || day === 6; // 일요일 또는 토요일이면 주말
  }

  // 총 휴가일수 구하는 함수
  function calculateLeaveTotal(start, end) {
    let total = 0;
    // 휴가 일수 계산
    for (let date = new Date(start); date <= new Date(end); date.setDate(date.getDate() + 1)) {
      // 주말이 아닌 경우에만 일수 추가
      if (!isWeekend(date)) {
        total++;
      }
    }
    return total;
  }

  // end (휴가 신청 가능한 날 표시)
  function calculateEndLeaveCnt(start) {
    let cnt = 0,
      total = 0;
    // 휴가 일수 계산
    while (cnt < Math.floor(leaveCnt[1])) {
      if (!isWeekend(new Date(new Date(start).getTime() + total * 24 * 60 * 60 * 1000))) {
        cnt++;
      }
      total++;
    }
    return new Date(new Date(start).getTime() + (total - 1) * 24 * 60 * 60 * 1000);
  }

  // start (휴가 신청 가능한 날 표시)
  function calculateStartLeaveCnt(start) {
    let cnt = 0,
      total = 0;
    // 휴가 일수 계산
    while (cnt < Math.floor(leaveCnt[1])) {
      if (!isWeekend(new Date(new Date(start).getTime() - total * 24 * 60 * 60 * 1000))) {
        cnt++;
      }
      total++;
    }
    return new Date(new Date(start).getTime() - (total - 1) * 24 * 60 * 60 * 1000);
  }

  // 사원선택의 자동완성 창에서 검색어 변경(검색) 될 때마다 searchName 설정
  const handleSelectUser = (event, newValue) => {
    setSearchName(newValue);
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
    // 로그인 한 사용자의 결재대기 상태인 모든 휴가신청내역 가져오기
    axios.get(`/user-leave-request-await?user_no=${token.user_no}`).then((res) => {
      setLeaveRequestAwait(res.data);
    });
    // 로그인 한 사용자의 휴가 보유 현황 가져오기
    axios.get(`/user-leave?user_no=${token.user_no}`).then((res) => {
      setLeaveCnt([res.data.leave_use, res.data.leave_remain]);
    });
    // 로그인 한 사용자의 승인,반려,결재진행중 상태인 모든 휴가신청내역 가져오기
    axios.get(`/user-leave-request-recent?user_no=${token.user_no}`).then((res) => {
      setLeaveRequestRecent(res.data);
    });
    // 폼 초기화
    setReason('');
    if (initialized && !(location.state && location.state.val === 1)) {
      setStart('');
      setEnd('');
      setSelectedValue('annual');
      setHalfValue('am');
    }
    setFirstApprover({});
    setSecondApprover({});
    if (index === 0 || index === 1) {
      setSelectLeaveCancel({});
    }
  }, [index]);

  // 휴가 신청 버튼
  function submitLeaveRequest() {
    if (Object.keys(firstApprover).length === 0 || Object.keys(secondApprover).length === 0 || start === null || end === null) {
      handleOpenFailModal();
      console.log(start);
    } else {
      axios
        .post(`/user-leave-request?user_no=${token.user_no}`, {
          leaveapp_title: `${token.user_name}(${
            selectedValue === 'annual' ? '연차' : selectedValue === 'public' ? '공가' : selectedHalfValue === 'am' ? '오전반차' : '오후반차'
          })${selectedValue === 'half' ? 0.5 : selectedValue === 'public' ? 0 : calculateLeaveTotal(start, end)}일`,
          leaveapp_content: reason,
          leaveapp_start: start,
          leaveapp_end: selectedValue === 'half' ? start : end,
          leaveapp_total: selectedValue === 'half' ? 0.5 : selectedValue === 'public' ? 0 : calculateLeaveTotal(start, end),
          leaveapp_type: selectedValue === 'annual' ? 0 : selectedValue === 'public' ? 3 : selectedHalfValue === 'am' ? 1 : 2,
          firstapp_no: firstApprover.user_no,
          secondapp_no: secondApprover.user_no
        })
        .then(async (res) => {
          const formData = new FormData();
          Array.from(uploadedInfo).forEach((file, index) => {
            console.log(index + '. : ' + file);
            formData.append(`files`, file);
          });

          try {
            await axios
              .post(`/file-upload?attached_app_no=${res.data}&attached_kind=1`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data' // 파일 업로드 시에는 반드시 필요
                }
              })
              .then((res) => {
                console.log(res.data);
                handleOpenSuccessModal();
              });
          } catch (error) {
            console.error('Error Uploading Files : ', error);
          }
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
        .post(`/user-leave-cancel-request?user_no=${token.user_no}`, {
          leaveapp_title: `${token.user_name}(휴가취소)${selectLeaveCancel.leaveapp_total}일`,
          leaveapp_content: reason,
          leaveapp_start: new Date(selectLeaveCancel.leaveapp_start),
          leaveapp_end: new Date(selectLeaveCancel.leaveapp_end),
          leaveapp_total: selectLeaveCancel.leaveapp_total,
          leaveapp_cancel_no: selectLeaveCancel.leaveapp_no,
          firstapp_no: firstApprover.user_no
        })
        .then((res) => {
          console.log(res.data);
          handleOpenSuccessCancelModal();
        });
    }
  }

  let content;
  if (selectedValue === 'annual') {
    content = (
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
          <BasicChip label="시작날짜" color="#46a5f3" />
          <LimitDatePicker
            width={'190px'}
            val={start}
            setDate={setStart}
            maxDate={end}
            minDate={calculateStartLeaveCnt(end)}
            bool={leaveCnt[1] === 0 ? true : false}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
          <BasicChip label="종료날짜" color="#46a5f3" />
          <LimitDatePicker
            width={'190px'}
            val={end}
            setDate={setEnd}
            minDate={start}
            maxDate={calculateEndLeaveCnt(start)}
            bool={leaveCnt[1] === 0 ? true : false}
          />
        </Grid>
      </Grid>
    );
  } else if (selectedValue === 'half') {
    content = (
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
          <BasicChip label="날짜" color="#46a5f3" />
          <LimitDatePicker width={'190px'} setDate={setStart} val={start} bool={leaveCnt[1] === 0 ? true : false} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
          <BasicChip label="반차 종류" color="#46a5f3" val={end} />
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
        </Grid>
      </Grid>
    );
  } else if (selectedValue === 'public') {
    content = (
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
          <BasicChip label="시작날짜" color="#46a5f3" />
          <LimitDatePicker width={'190px'} val={start} setDate={setStart} maxDate={end} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} mt={2}>
          <BasicChip label="종료날짜" color="#46a5f3" />
          <LimitDatePicker width={'190px'} val={end} setDate={setEnd} minDate={start} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} mt={2} sx={{ display: 'flex' }}>
          <BasicChip label="증빙 업로드" color="#46a5f3" />
          <FileUpload setUploadedInfo={setUploadedInfo} uploadedInfo={uploadedInfo} width="320px" />
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={index} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="휴가조회" />
          <Tab label="휴가신청" />
          <Tab label="휴가취소신청" />
        </Tabs>
      </Box>
      <BasicTab value={index} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={3.5} sm={3.5} md={3.5} lg={3.5}>
            <BasicContainer sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <LeaveDonutChart series={leaveCnt} />
            </BasicContainer>
          </Grid>
          <Grid item xs={8.5} sm={8.5} md={8.5} lg={8.5}>
            <BasicContainer>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">결재 대기 내역</Typography>
                </Grid>
              </Grid>
              <UnappLeaveTable leaveCancel={leaveCancel} datas={leaveRequestAwait} handleOpen={handleOpen} />
            </BasicContainer>
            <SuccessModal open={deleteModal} handleClose={handleCloseDeleteModal} color="#52c41a" msg="휴가 신청이 취소되었습니다." />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <BasicContainer sx={{ height: '415px' }}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">결재 진행중인 최근 내역</Typography>
                </Grid>
              </Grid>
              <AppLeaveTable requestLeaveCancel={requestLeaveCancel} datas={leaveRequestRecent.slice(0, 5)} handleOpen={handleOpen} />
            </BasicContainer>
          </Grid>
        </Grid>
        <LeaveModal open={modalOpen} handleClose={handleClose} data={modalData} />
      </BasicTab>
      <BasicTab value={index} index={1}>
        <BasicContainer>
          <Box
            sx={{
              mx: 2,
              mt: 0.5,
              height: '715px'
            }}
          >
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <Typography variant="h4">휴가 신청</Typography>
              </Grid>
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                  <Alert severity="info" sx={{ fontSize: '0.9rem' }}>
                    현재 휴가 사용율은 &nbsp;
                    <Typography component="span" fontWeight="bold">
                      {((leaveCnt[0] * 100) / (leaveCnt[0] + leaveCnt[1])).toFixed(0)}% (잔여 {leaveCnt[1]}일 / 사용 {leaveCnt[0]}일)
                    </Typography>
                    으로 {new Date().getMonth() + 1}월 기준으로 &nbsp;
                    <Typography component="span" fontWeight="bold">
                      {((leaveCnt[0] + leaveCnt[1]) / 12) * (new Date().getMonth() + 1) + 0.5 < leaveCnt[0]
                        ? '많이 사용하였습니다.'
                        : ((leaveCnt[0] + leaveCnt[1]) / 12) * (new Date().getMonth() + 1) - 0.5 > leaveCnt[0]
                        ? '적게 사용하였습니다.'
                        : '적당합니다.'}
                    </Typography>
                  </Alert>
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              sx={{
                overflow: 'scroll',
                maxHeight: '700px',
                '&::-webkit-scrollbar': {
                  width: 0
                }
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box>
                  <BasicChip label="제목" color="#46a5f3" />
                  <TextField
                    label={`${token.user_name}(${
                      selectedValue === 'annual'
                        ? '연차'
                        : selectedValue === 'public'
                        ? '공가'
                        : selectedHalfValue === 'am'
                        ? '오전반차'
                        : '오후반차'
                    })${selectedValue === 'half' ? 0.5 : selectedValue === 'public' ? 0 : calculateLeaveTotal(start, end)}일`}
                    id="title"
                    size="small"
                    sx={{ ml: 1, width: '22%' }}
                    disabled
                  />
                </Box>
                <Box mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
                  <EditNoteRoundedIcon fontSize="medium" color="secondary" sx={{ mx: 1 }} />
                  <Typography size="small" color="secondary">
                    제목은 자동 지정됩니다.
                  </Typography>
                </Box>
                <Box mt={2} sx={{ display: 'flex' }}>
                  <BasicChip label="1차 결재자" color="#46a5f3" />
                  <Box ml={1} mr={3}>
                    <AppAuto
                      label="1차 결재자"
                      datas={allUsers.filter((data) => data !== secondApprover)}
                      handleSelectUser={handleSelectUser}
                      searchName={searchName}
                      setSearchName={setSearchName}
                      setApprover={setFirstApprover}
                    />
                  </Box>
                </Box>
                <Box mt={2} sx={{ display: 'flex' }}>
                  <BasicChip label="2차 결재자" color="#46a5f3" />
                  <Box ml={1}>
                    <AppAuto
                      label="2차 결재자"
                      datas={allUsers.filter((data) => data !== firstApprover)}
                      handleSelectUser={handleSelectUser}
                      searchName={searchName}
                      setSearchName={setSearchName}
                      setApprover={setSecondApprover}
                    />
                  </Box>
                </Box>
                <Box clone mt={2}>
                  <BasicChip label="휴가 종류" color="#46a5f3" />
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
                  <Box>{content}</Box>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <BasicChip label="휴가 사유" color="#46a5f3" />
                  <TextField
                    id="reason"
                    multiline
                    rows={5}
                    sx={{
                      width: '89%',
                      ml: 1
                    }}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box clone mt={2} mr={2} pb={2}>
                  <Grid container justifyContent="right" spacing={1}>
                    <Grid item>
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={submitLeaveRequest}
                        disabled={leaveCnt[1] === 0 && selectedValue !== 'public' ? true : false}
                      >
                        완료
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </BasicContainer>
        <FailModal open={failModal} handleClose={handleCloseFailModal} color="red" msg1="날짜, 결재자는" msg2="필수로 선택하셔야합니다." />
        <SuccessModal open={successModal} handleClose={handleCloseSuccessModal} color="#46a5f3" msg="휴가 신청이 완료되었습니다." />
      </BasicTab>
      <BasicTab value={index} index={2}>
        <BasicContainer>
          <Box sx={{ mx: 2, my: 0.5, height: '710px' }}>
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box>
                  <Typography variant="h4">휴가 취소 신청</Typography>
                </Box>
                <Box clone mt={2}>
                  <BasicChip label="제목" color="#46a5f3" />
                  <TextField
                    label={`${token.user_name}(휴가취소)${selectLeaveCancel.leaveapp_total ? selectLeaveCancel.leaveapp_total + '일' : ''}`}
                    id="title"
                    size="small"
                    sx={{ ml: 1 }}
                    disabled
                  />
                </Box>
                <Box clone mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
                  <EditNoteRoundedIcon fontSize="medium" color="secondary" sx={{ mx: 1 }} />
                  <Typography size="small" color="secondary">
                    제목은 자동 지정됩니다.
                  </Typography>
                </Box>
                <Box clone mt={2} sx={{ display: 'flex' }}>
                  <BasicChip label="결재자" color="#46a5f3" />
                  <Box ml={1}>
                    <AppAuto
                      label="결재자"
                      datas={allUsers}
                      handleSelectUser={handleSelectUser}
                      searchName={searchName}
                      setSearchName={setSearchName}
                      setApprover={setFirstApprover}
                    />
                  </Box>
                </Box>
                <Box clone mt={2}>
                  <BasicChip label="선택한 휴가" color="#46a5f3" />
                  <Button
                    sx={{ ml: 1 }}
                    component="label"
                    variant="contained"
                    size="medium"
                    color="secondary"
                    onClick={handleOpenCancel}
                    endIcon={<SearchOutlined />}
                  >
                    휴가 선택
                  </Button>
                </Box>
                <Grid container sx={{ mt: 2 }}>
                  <Grid item xs={2} md={2} lg={1.2}></Grid>
                  <Grid item xs={2} md={10} lg={10.8}>
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
                  </Grid>
                </Grid>
                <Box clone mt={selectedValue === 'public' ? 1 : 2}>
                  <BasicChip label="취소 사유" color="#46a5f3" />
                  <TextField
                    id="title"
                    multiline
                    rows={8}
                    sx={{
                      width: '89.5%',
                      ml: 1
                    }}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </Box>
                <Grid container justifyContent="right">
                  <Grid item sx={{ mt: 2, mr: 0.5 }}>
                    <Button variant="contained" size="medium" onClick={submitLeaveCancelRequest}>
                      완료
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <SuccessModal
              open={successCancelModal}
              handleClose={handleCloseSuccessCancelModal}
              color="#46a5f3"
              msg="휴가 취소 신청이 완료되었습니다."
            />
            <ModalM open={openCancel} handleClose={handleCloseCancel}>
              <Grid container alignItems="center" direction="row" spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={3.4} md={3.4} lg={3.4}>
                  <Typography variant="h5">전체 휴가 신청 내역</Typography>
                </Grid>
                <Grid item xs={8.6} md={8.6} lg={8.6}></Grid>
              </Grid>
              <CancelLeaveTable
                datas={leaveRequestRecent
                  .filter((data) => data.leaveapp_type !== 4)
                  .filter((data) => data.leaveapp_status !== 1 && data.leaveapp_status !== 2)}
                handleSelectCancel={handleSelectCancel}
              />
              <Grid container justifyContent="right" spacing={1} sx={{ mt: 2 }}>
                <Grid item>
                  <Button variant="contained" size="medium" onClick={handleCloseCancel}>
                    닫기
                  </Button>
                </Grid>
              </Grid>
            </ModalM>
          </Box>
        </BasicContainer>
      </BasicTab>
    </>
  );
};

export default UserLeave;
