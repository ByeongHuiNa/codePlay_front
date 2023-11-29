// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import BasicContainer from 'components/container/BasicContainer';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Switch,
  Tab,
  Tabs,
  TextField
} from '../../node_modules/@mui/material/index';
import BasicTab from 'components/tab/BasicTab';
import React, { useEffect, useState } from 'react';
import ApprovalTab from 'components/tab/ApprovalTab';
import { styled } from '@mui/material/styles';
import AdminAppLeaveTable from 'components/Table/AdminAppLeaveTable';
import AdminAppAttendTable from 'components/Table/AdminAppAttendTable';
import BasicChip from 'components/Chip/BasicChip';
import axios from '../../node_modules/axios/index';
import { useFormatter, useLeaveCnt } from 'store/module';
import UserAttendOriginInfoTable from 'components/Table/UserAttendOriginInfoTable';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import AdminAppOvertimeTable from 'components/Table/AdminAppOvertimeTable';
import { useLocation } from '../../node_modules/react-router-dom/dist/index';
import { CloudDownload, InsertDriveFile } from '../../node_modules/@mui/icons-material/index';
import SuccessModal from 'components/Modal/SuccessModal';
import AdminUnAppLeaveTable from 'components/Table/AdminUnAppLeaveTable';

const ApprovalAttendance = () => {
  //token 값을 decode해주는 코드
  const token = jwtDecode(localStorage.getItem('token').slice(7));
  const { dateFormat } = useFormatter();
  const { leaveCnt, setLeaveCnt } = useLeaveCnt();
  const location = useLocation();
  const [deptLeaveCnt, setDeptLeaveCnt] = useState({});

  useEffect(() => {
    if (location.state && location.state.val === 0) {
      setValue1(location.state.index);
      console.log(location.state);
    }
  }, []);

  const LeaveInfo = (data) => {
    console.log(data);
    if (Object.keys(data).length > 0) {
      // 선택한 휴가의 첨부파일 가져오기
      axios.get(`/file-list?attached_app_no=${data.leaveapp_no}&attached_kind=1`).then((res) => {
        setSelectLeaveFileData(res.data);
        console.log(res.data);
      });
      // 신청자의 휴가 보유 현황 가져오기
      axios.get(`/user-leave?user_no=${data.user_no}`).then((res) => {
        setLeaveCnt(res.data);
        console.log(res.data);
      });
      // 신청자의 휴가 신청일에 같은 부서 사원들의 휴가 사용율 가져오기
      axios
        .post(`/dept-leave`, {
          user_no: data.user_no,
          leaveapp_start: new Date(data.leaveapp_start).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }),
          leaveapp_end: new Date(data.leaveapp_end).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }),
          leaveapp_status: data.leaveapp_status,
          leaveapp_type: data.leaveapp_type,
          leaveapp_total: data.leaveapp_total
        })
        .then((res) => {
          setDeptLeaveCnt(res.data);
          console.log(res.data);
        });
      setSelectLeaveData(data);
    }
  };

  const AttendInfo = (data) => {
    console.log(data);
    if (Object.keys(data).length > 0) {
      // 선택한 휴가의 첨부파일 가져오기
      axios.get(`/file-list?attached_app_no=${data.attendapp_no}&attached_kind=0`).then((res) => {
        setSelectAttendFileData(res.data);
        console.log(res.data);
      });
      setSelectAttendData(data);
    }
  };

  const downloadFile = async (attached_name) => {
    try {
      const response = await axios.get(`/file/${attached_name}`, {
        responseType: 'blob'
      });

      // 파일 다운로드를 위한 처리
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', attached_name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file: ', error);
    }
  };

  const [value1, setValue1] = useState(0); // 전체 Tab
  const handleChange1 = (event, newValue) => {
    // 전체 Tab
    setValue1(newValue);
    setValue2(1);
    setValue3(1);
    setValue4(1);
    if (newValue === 0) {
      setSelectAttendData({});
      setSelectOvertimeData({});
    } else if (newValue === 1) {
      setSelectLeaveData({});
      setSelectOvertimeData({});
    } else {
      setSelectLeaveData({});
      setSelectAttendData({});
    }
    setReason('');
  };

  const [value2, setValue2] = useState(0); // 휴가 부분 Tab
  // 휴가 부분 Tab
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    setReason('');

    if (newValue === 0 && leaveAppDatas.length > 0) {
      LeaveInfo(leaveAppDatas[0]);
    } else if (newValue === 1 && leaveAppDatas.filter((data) => data.leaveappln_status === 2).length > 0) {
      LeaveInfo(leaveAppDatas.filter((data) => data.leaveappln_status === 2)[0]);
    } else if (newValue === 2 && leaveAppDatas.filter((data) => data.leaveappln_status === 0 || data.leaveappln_status === 1).length > 0) {
      LeaveInfo(leaveAppDatas.filter((data) => data.leaveappln_status === 0 || data.leaveappln_status === 1)[0]);
    }
  };

  const [value3, setValue3] = useState(0); // 출/퇴근 부분 Tab
  // 출/퇴근 부분 Tab
  const handleChange3 = (event, newValue) => {
    setValue3(newValue);
    setReason('');

    if (newValue === 0 && attendAppDatas.length > 0) {
      AttendInfo(attendAppDatas[0]);
    } else if (newValue === 1 && attendAppDatas.filter((data) => data.attendapp_status === 2).length > 0) {
      AttendInfo(attendAppDatas.filter((data) => data.attendapp_status === 2)[0]);
    } else if (newValue === 2 && attendAppDatas.filter((data) => data.attendapp_status === 0 || data.attendapp_status === 1).length > 0) {
      AttendInfo(attendAppDatas.filter((data) => data.attendapp_status === 0 || data.attendapp_status === 1)[0]);
    }
  };

  const [value4, setValue4] = useState(0); // 초과근무 부분 Tab
  const handleChange4 = (event, newValue) => {
    setValue4(newValue);
    setReason('');

    if (newValue === 0 && overtimeAppDatas.length > 0) {
      setSelectOvertimeData(overtimeAppDatas[0]);
    } else if (newValue === 1 && overtimeAppDatas.filter((data) => data.overtimeapp_status === 2).length > 0) {
      setSelectOvertimeData(overtimeAppDatas.filter((data) => data.overtimeapp_status === 2)[0]);
    } else if (
      newValue === 2 &&
      overtimeAppDatas.filter((data) => data.overtimeapp_status === 0 || data.overtimeapp_status === 1).length > 0
    ) {
      setSelectOvertimeData(overtimeAppDatas.filter((data) => data.overtimeapp_status === 0 || data.overtimeapp_status === 1)[0]);
    }
  };

  const [checked, setChecked] = useState(false);
  const handleCheckedChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    // 로그인 한 근태담당자의 휴가 전체 결재 내역
    axios.get(`/manager-leave-approval?user_no=${token.user_no}`).then((res) => {
      setLeaveAppDatas(res.data);
      if (location.state && location.state.val === 0 && location.state.index === 0) {
        LeaveInfo(res.data.find((data) => data.leaveapp_no === location.state.data_no));
      } else {
        if (res.data.length > 0) {
          LeaveInfo(res.data[0]);
        }
      }
    });
    // 로그인 한 근태담당의 출퇴근 전체 결재 내역
    axios.get(`/manager-attend-approval?user_no=${token.user_no}`).then((res) => {
      setAttendAppDatas(res.data);
      if (location.state && location.state.val === 0 && location.state.index === 1) {
        AttendInfo(res.data.find((data) => data.attendapp_no === location.state.data_no));
      } else {
        if (res.data.length > 0) {
          AttendInfo(res.data[0]);
        }
      }
    });
    // 로그인 한 근태담당자의 초과근무 전체 결재 내역
    axios.get(`/manager-overtime-approval?user_no=${token.user_no}`).then((res) => {
      setOvertimeAppDatas(res.data);
      setSelectOvertimeData(res.data[0]);
    });
  }, [value1]);

  // Tab 0. 휴가 부분 =================================================
  const [leaveAppDatas, setLeaveAppDatas] = useState([]); // 전체 휴가 결재 데이터
  const [selectLeaveData, setSelectLeaveData] = useState({}); // 선택한 휴가 데이터 값
  const [selectLeaveFileData, setSelectLeaveFileData] = useState([]);
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
        leaveapp_start: selectLeaveData.leaveapp_start,
        leaveapp_end: selectLeaveData.leaveapp_end,
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
        handleOpenSuccessModal();
        setSelectLeaveData({});
      });
  }

  // Tab 1. 출퇴근 부분 ================================================
  const [attendAppDatas, setAttendAppDatas] = useState([]); // 전체 출퇴근 결재 데이터
  const [selectAttendData, setSelectAttendData] = useState({}); // 선택한 출/퇴근 데이터 값
  const [selectAttendFileData, setSelectAttendFileData] = useState([]); // 선택한 출/퇴근 데이터 값
  const [appAttendStatus, setAppAttendStatus] = useState('attendApp'); // 출/퇴근 정정 결재 : 승인, 반려

  // 출/퇴근 부분 승인, 반려 라디오 버튼
  const handleAttendRadioChange = (event) => {
    setAppAttendStatus(event.target.value);
  };

  // 출퇴근 수정 결재 완료 버튼
  function submitAttendApproval() {
    axios
      .patch('/manager-attend-approval', {
        user_no: selectAttendData.user_no,
        attend_no: selectAttendData.attend_no,
        attend_start: selectAttendData.attend_start,
        attend_end: selectAttendData.attend_end,
        attend_date: selectAttendData.attend_date,
        attend_status: selectAttendData.attend_status,
        attendapp_no: selectAttendData.attendapp_no,
        attendapp_status: appAttendStatus == 'attendApp' ? 0 : 1,
        attendapp_reason: reason,
        attendedit_kind: selectAttendData.attendedit_kind,
        attendedit_start_time: selectAttendData.attendedit_start_time,
        attendedit_end_time: selectAttendData.attendedit_end_time
      })
      .then((res) => {
        console.log('결재완료 : ' + res.data);
        handleOpenSuccessModal();
        setSelectAttendData({});
      });
  }

  // Tab 2. 초과근무 부분 =================================================
  const [overtimeAppDatas, setOvertimeAppDatas] = useState([]); // 전체 초과근무 결재 데이터
  const [selectOvertimeData, setSelectOvertimeData] = useState({}); // 선택한 초과근무 데이터 값
  const [appOvertimeStatus, setAppOvertimeStatus] = useState('overtimeApp'); // 출/퇴근 정정 결재 : 승인, 반려
  const [total, setTotal] = useState({}); //한주의 초과근무시간 불러오기

  // 출/퇴근 부분 승인, 반려 라디오 버튼
  const handleOvertimeRadioChange = (event) => {
    setAppOvertimeStatus(event.target.value);
  };

  // 초과근무 결재 완료 버튼
  function submitOvertimaApproval() {
    axios
      .patch(`/manager-overtime-approval`, {
        overtime_no: selectOvertimeData.overtime_no,
        attend_no: selectOvertimeData.attend_no,
        overtimeapp_status: appOvertimeStatus === 'overtimeApp' ? 0 : 1,
        overtimeapp_reason: reason
      })
      .then((res) => {
        console.log(res);
        handleOpenSuccessModal();
        setSelectOvertimeData({});
      });
  }

  useEffect(() => {
    setAppLeaveStatus('');
    setSelectLeaveFileData([]);
  }, [selectLeaveData]);

  useEffect(() => {
    setAppAttendStatus('');
  }, [selectAttendData]);

  useEffect(() => {
    console.log(selectOvertimeData);
    setAppOvertimeStatus('');
    async function get() {
      try {
        if (selectOvertimeData && Object.keys(selectOvertimeData).length > 0) {
          axios
            .get(`/user-attend-total-over?user_no=${selectOvertimeData.user_no}`)
            .then((response) => {
              console.log(response.data);

              if (response.data.length > 0) {
                const totalMilliseconds = response.data.reduce((acc, obj) => {
                  const [hours, minutes, seconds] = obj.attend_total.split(':').map(Number);
                  return acc + hours * 3600000 + minutes * 60000 + seconds * 1000;
                }, 0);

                // Convert total milliseconds back to 'HH:mm:ss' format
                const totalHours = Math.floor(totalMilliseconds / 3600000);
                const totalMinutes = Math.floor((totalMilliseconds % 3600000) / 60000);
                const totalSeconds = Math.floor((totalMilliseconds % 60000) / 1000);

                setTotal({
                  str: `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(
                    2,
                    '0'
                  )}`,
                  num: totalHours * 60 + totalMinutes + totalSeconds / 60
                });
              }
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    }

    if (selectOvertimeData && Object.keys(selectOvertimeData).length > 0) {
      get();
    }
  }, [selectOvertimeData]);

  // 모달창 3. 휴가 신청 성공
  const [successModal, setSuccessModal] = React.useState(false);
  // 모달창 활성화 버튼
  const handleOpenSuccessModal = () => {
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      setValue2(2);
      setValue3(2);
      setValue4(2);
    }, 1500);
  };
  // 모달창 취소 버튼
  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    setIndex(0);
  };

  // 휴가 부분 Tab 커스텀
  const MyTab = styled(Tab)`
    padding: 3px;
    height: 37px;
    min-height: 37px;
    width: 60px;
    min-width: 60px;
    color: ${(props) =>
      value1 === 0
        ? props.index == value2
          ? '#1890ff'
          : 'black'
        : value1 === 1
        ? props.index == value3
          ? '#1890ff'
          : 'black'
        : props.index == value4
        ? '#1890ff'
        : 'black'};
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
    background-color: ${() =>
      value1 === 0
        ? value2 === 1
          ? '#6cbfef'
          : '#b9e5ff'
        : value1 === 1
        ? value3 === 1
          ? '#6cbfef'
          : '#b9e5ff'
        : value4 === 1
        ? '#6cbfef'
        : '#b9e5ff'};
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
        : value1 === 1
        ? value3 === 1
          ? '0px 3px 6px rgba(0, 0, 0, 0.3)'
          : '0px 0px 0px 0px'
        : value4 === 1
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
    background-color: ${() =>
      value1 === 0
        ? value2 === 0
          ? '#6cbfef'
          : '#b9e5ff'
        : value1 === 1
        ? value3 === 0
          ? '#6cbfef'
          : '#b9e5ff'
        : value4 === 0
        ? '#6cbfef'
        : '#b9e5ff'};
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
        : value1 === 1
        ? value3 === 0
          ? '0px 3px 6px rgba(0, 0, 0, 0.3)'
          : '0px 0px 0px 0px'
        : value4 === 0
        ? '0px 3px 6px rgba(0, 0, 0, 0.3)'
        : '0px 0px 0px 0px'};
  `;

  const MyCardL = styled(Card)`
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background-color: ${() =>
      value1 === 0
        ? value2 === 2
          ? '#6cbfef'
          : '#b9e5ff'
        : value1 === 1
        ? value3 === 2
          ? '#6cbfef'
          : '#b9e5ff'
        : value4 === 2
        ? '#6cbfef'
        : '#b9e5ff'};
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
        : value1 === 1
        ? value3 === 2
          ? '0px 3px 6px rgba(0, 0, 0, 0.3)'
          : '0px 0px 0px 0px'
        : value4 === 2
        ? '0px 3px 6px rgba(0, 0, 0, 0.3)'
        : '0px 0px 0px 0px'};
  `;

  const progressColor = (percent) => {
    if (percent >= 0 && percent <= 30) {
      return '#00c642'; // 초록색
    } else if (percent > 30 && percent <= 99) {
      return '#29abe2'; // 파란색
    } else {
      return 'red'; // 기본값, 에러 상태 등에 사용될 색상
    }
  };

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

  // 초과근무 결재 승인 : overtimeApp
  // 초과근무 결재 반려 : overtimeUnapp
  // 초과근무 결재 대기 : overtimeWaitapp
  let overtimeApp = 0;
  let overtimeUnapp = 0;
  let overtimeWaitapp = 0;
  overtimeAppDatas &&
    overtimeAppDatas.map((data) => {
      if (data.overtimeapp_status == 0) {
        overtimeApp++;
      } else if (data.overtimeapp_status == 1) {
        overtimeUnapp++;
      } else if (data.overtimeapp_status == 2) {
        overtimeWaitapp++;
      }
    });

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value1} onChange={handleChange1} aria-label="basic tabs example">
          <Tab label="휴가결재" />
          <Tab label="출/퇴근수정결재" />
          <Tab label="초과근무결재" />
        </Tabs>
      </Box>
      <BasicTab value={value1} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <FormControlLabel control={<Switch checked={checked} onChange={handleCheckedChange} />} label="총 결재 수" />
        </Box>
        {checked && (
          <Fade in={checked}>
            <Box clone mx={1}>
              <Box>
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
            </Box>
          </Fade>
        )}
        <Box clone mx={1} my={1}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
            <Grid item xs={6} md={6} lg={5}>
              <BasicContainer>
                <Box sx={{ borderBottom: 1, border: '0px' }}>
                  <MyTabs value={value2} onChange={handleChange2} aria-label="basic tabs example">
                    <MyTab label="전체" index="0" />
                    <MyTab label="대기" index="1" />
                    <MyTab label="완료" index="2" />
                  </MyTabs>
                </Box>
                <ApprovalTab value={value2} index={0}>
                  <Box pb={3}>
                    <AdminAppLeaveTable datas={leaveAppDatas} LeaveInfo={LeaveInfo} selectLeaveData={selectLeaveData} />
                  </Box>
                </ApprovalTab>
                <ApprovalTab value={value2} index={1}>
                  <Box pb={3}>
                    <AdminUnAppLeaveTable
                      datas={leaveAppDatas.filter((data) => data.leaveappln_status === 2)}
                      LeaveInfo={LeaveInfo}
                      selectLeaveData={selectLeaveData}
                    />
                  </Box>
                </ApprovalTab>
                <ApprovalTab value={value2} index={2}>
                  <Box pb={3}>
                    <AdminAppLeaveTable
                      datas={leaveAppDatas.filter((data) => data.leaveappln_status === 0 || data.leaveappln_status === 1)}
                      LeaveInfo={LeaveInfo}
                      selectLeaveData={selectLeaveData}
                    />
                  </Box>
                </ApprovalTab>
              </BasicContainer>
            </Grid>
            <Grid item xs={7} md={7} lg={7}>
              <BasicContainer>
                <Box
                  sx={{
                    height: '900px',
                    p: 2,
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                      width: 5
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'white'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'gray',
                      borderRadius: 2
                    }
                  }}
                >
                  {Object.keys(selectLeaveData).length !== 0 && (
                    <Grid container spacing={1} justifyContent="center" sx={{ overflow: 'hidden' }}>
                      <Grid item xs={11} sm={11} md={11} lg={12}>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="h5">휴가 상세 조회</Typography>
                          </Grid>
                          {selectLeaveData.leaveapp_status === 0 &&
                            selectLeaveData.leaveapp_type !== 4 &&
                            selectLeaveData.leaveappln_order === 2 && (
                              <Grid item>
                                <Button variant="contained" size="medium">
                                  휴가취소
                                </Button>
                              </Grid>
                            )}
                        </Grid>
                        <Box clone mt={2}>
                          <BasicChip label="제목" color="#46a5f3" />
                          <TextField
                            size="small"
                            defaultValue={selectLeaveData.leaveapp_title}
                            key={selectLeaveData.leaveapp_title}
                            InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                            sx={{ width: '40%' }}
                          />
                        </Box>
                        <Box clone mt={2}>
                          <BasicChip label="신청자" color="#46a5f3" />
                          <TextField
                            size="small"
                            defaultValue={selectLeaveData.user_name}
                            key={selectLeaveData.user_name}
                            InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                            sx={{ width: '20%' }}
                          />
                        </Box>
                        <Box clone mt={2}>
                          <BasicChip label="휴가 종류" color="#46a5f3" />
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
                            InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                            sx={{ width: '20%', mr: 2 }}
                          />
                          <BasicChip label="휴가 사용일수" color="#46a5f3" />
                          <TextField
                            size="small"
                            defaultValue={`${selectLeaveData.leaveapp_total}일`}
                            key={selectLeaveData.leaveapp_total}
                            InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                            sx={{ width: '20%' }}
                          />
                        </Box>
                        {(selectLeaveData.leaveapp_type == 0 || selectLeaveData.leaveapp_type == 3) && (
                          <Box clone mt={2}>
                            <BasicChip label="휴가 시작일" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={dateFormat(new Date(selectLeaveData.leaveapp_start))}
                              key={`start-${selectLeaveData.leaveapp_start}`}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '20%', mr: 2 }}
                            />
                            <BasicChip label="휴가 종료일" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={dateFormat(new Date(selectLeaveData.leaveapp_end))}
                              key={selectLeaveData.leaveapp_end}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '20%' }}
                            />
                          </Box>
                        )}
                        {selectLeaveFileData.length !== 0 && selectLeaveData.leaveapp_type == 3 && (
                          <Box clone mt={2} sx={{ display: 'flex' }}>
                            <BasicChip label="증빙 파일" color="#46a5f3" />
                            <Box>
                              <List>
                                {selectLeaveFileData.map((file, index) => (
                                  <ListItem key={index} alignItems="center">
                                    <ListItemIcon sx={{ mr: 2 }}>
                                      <InsertDriveFile />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={file.attached_name}
                                      secondary={file.attached_type.replace('application/', '') + '파일'}
                                    />
                                    <ListItemIcon sx={{ ml: 3 }}>
                                      <Button variant="outlined" color="primary" onClick={() => downloadFile(file.attached_name)}>
                                        <CloudDownload />
                                      </Button>
                                    </ListItemIcon>
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                          </Box>
                        )}
                        {(selectLeaveData.leaveapp_type === 1 || selectLeaveData.leaveapp_type === 2) && (
                          <Box clone mt={2}>
                            <BasicChip label="반차 사용일" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={`${dateFormat(new Date(selectLeaveData.leaveapp_start))} ${
                                selectLeaveData.leaveapp_type == 1 ? '오전' : '오후'
                              }`}
                              key={selectLeaveData.leaveapp_type}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '40%' }}
                            />
                          </Box>
                        )}
                        {selectLeaveData.leaveapp_type === 4 && (
                          <Box clone mt={2}>
                            <BasicChip label="취소휴가 시작" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={dateFormat(new Date(selectLeaveData.leaveapp_start))}
                              key={`cancel-start-${selectLeaveData.leaveapp_start}`}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '20%', mr: 2 }}
                            />
                            <BasicChip label="취소휴가 종료" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={dateFormat(new Date(selectLeaveData.leaveapp_end))}
                              key={`cancel-end-${selectLeaveData.leaveapp_end}`}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '20%' }}
                            />
                          </Box>
                        )}
                        <Box clone mt={2}>
                          <BasicChip label="휴가 사유" color="#46a5f3" />
                          <TextField
                            multiline
                            rows={3}
                            defaultValue={selectLeaveData.leaveapp_content}
                            key={selectLeaveData.leaveapp_content}
                            InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                            sx={{ width: '80%' }}
                          />
                        </Box>
                        {(selectLeaveData.leaveappln_status == 0 || selectLeaveData.leaveappln_status == 1) && (
                          <>
                            <Box clone mt={2}>
                              <BasicChip label="나의 결재 차수" color="#46a5f3" />
                              <TextField
                                size="small"
                                defaultValue={`${selectLeaveData.leaveappln_order}차`}
                                key={`order-${selectLeaveData.leaveappln_order}`}
                                InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                sx={{ width: '20%', mr: 2 }}
                              />
                              <BasicChip label="나의 결재 상태" color="#46a5f3" />
                              <TextField
                                size="small"
                                defaultValue={selectLeaveData.leaveappln_status == 0 ? '승인' : '반려'}
                                key={`status-${selectLeaveData.leaveappln_status}`}
                                InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                sx={{ width: '20%' }}
                              />
                            </Box>
                            <Box clone mt={2}>
                              <BasicChip label="최종 결재 상태" color="#46a5f3" />
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
                                InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                sx={{ width: '40%', mr: 2 }}
                              />
                            </Box>
                          </>
                        )}
                        {selectLeaveData.leaveappln_status === 2 && selectLeaveData.leaveapp_type !== 4 && (
                          <Box mr={2}>
                            <Box mt={2}>
                              <Alert severity="info">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  {selectLeaveData.user_name}님의 휴가 신청일 중 {selectLeaveData.dept_name} 사원들의 최고 휴가 사용일 :
                                  &nbsp;
                                  <Typography variant="h5">{deptLeaveCnt[0]}</Typography>
                                </Box>
                                <Box my={1} sx={{ display: 'flex', width: '500px' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5">
                                      {deptLeaveCnt[1]}/{deptLeaveCnt[2]}
                                    </Typography>
                                    명 휴가 사용
                                  </Box>
                                  <Box sx={{ width: '350px', ml: 3 }}>
                                    <Progress
                                      percent={(deptLeaveCnt[1] * 100) / deptLeaveCnt[2]}
                                      theme={{
                                        active: {
                                          color: progressColor((deptLeaveCnt[1] * 100) / deptLeaveCnt[2])
                                        }
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </Alert>
                              <Alert severity="info">
                                {selectLeaveData.user_name}의 휴가 사용율
                                <Box my={1} sx={{ display: 'flex', width: '550px' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5">
                                      {leaveCnt.leave_use}/{leaveCnt.leave_total}
                                    </Typography>
                                    일 휴가 사용
                                  </Box>
                                  <Box sx={{ width: '350px', ml: 3 }}>
                                    <Progress
                                      percent={((leaveCnt.leave_use * 100) / leaveCnt.leave_total).toFixed(0)}
                                      theme={{
                                        active: {
                                          color: progressColor((leaveCnt.leave_use * 100) / leaveCnt.leave_total)
                                        }
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </Alert>
                            </Box>
                            <Box mt={1}>
                              {deptLeaveCnt[1] / deptLeaveCnt[2] >= 0.6 &&
                              (leaveCnt.leave_total / 12) * (new Date().getMonth() + 1) < leaveCnt.leave_use ? (
                                <Alert severity="error">
                                  {selectLeaveData.user_name}님의 휴가 사용율이 높고 휴가 신청일에 휴가를 사용한 사원이 많아 휴가 반려를
                                  추천합니다.
                                </Alert>
                              ) : deptLeaveCnt[1] / deptLeaveCnt[2] >= 0.6 ? (
                                <Alert severity="error">
                                  {selectLeaveData.user_name}님의 휴가 신청일에 휴가를 사용한 사원이 많아 휴가 반려를 추천합니다.
                                </Alert>
                              ) : (leaveCnt.leave_total / 12) * (new Date().getMonth() + 1) < leaveCnt.leave_use ? (
                                <Alert severity="error">{selectLeaveData.user_name}님의 휴가 사용율이 높아 휴가 반려를 추천합니다.</Alert>
                              ) : (
                                <Alert severity="success">
                                  {selectLeaveData.user_name}님의 휴가 사용율과 부서 휴가 사용율이 적당하여 휴가 승인을 추천합니다
                                </Alert>
                              )}
                            </Box>
                            <Box clone mt={2}>
                              <BasicChip label={`${selectLeaveData.leaveappln_order}차 결재`} color="#46a5f3" />
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
                                  <BasicChip label="반려 사유" color="#46a5f3" />
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
                            <Stack direction="row" justifyContent="flex-end" mt={2}>
                              <Button variant="contained" onClick={submitLeaveApproval}>
                                결재완료
                              </Button>
                            </Stack>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  )}
                </Box>
                <SuccessModal open={successModal} handleClose={handleCloseSuccessModal} color="#46a5f3" msg="결재 완료되었습니다." />
              </BasicContainer>
            </Grid>
          </Grid>
        </Box>
      </BasicTab>
      <BasicTab value={value1} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <FormControlLabel control={<Switch checked={checked} onChange={handleCheckedChange} />} label="총 결재 수" />
        </Box>
        {checked && (
          <Fade in={checked}>
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
          </Fade>
        )}
        <Box clone mx={1} my={1}>
          <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
              <Grid item xs={5} md={5} lg={5}>
                <BasicContainer>
                  <Box sx={{ borderBottom: 1, border: '0px' }}>
                    <MyTabs value={value3} onChange={handleChange3} aria-label="basic tabs example">
                      <MyTab label="전체" index="0" />
                      <MyTab label="대기" index="1" />
                      <MyTab label="완료" index="2" />
                    </MyTabs>
                  </Box>
                  <ApprovalTab value={value3} index={0}>
                    <Box pb={3}>
                      <AdminAppAttendTable datas={attendAppDatas} setSelectAttendData={AttendInfo} selectAttendData={selectAttendData} />
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value3} index={1}>
                    <Box pb={3}>
                      <AdminAppAttendTable
                        datas={attendAppDatas.filter((data) => data.attendapp_status === 2)}
                        setSelectAttendData={AttendInfo}
                        selectAttendData={selectAttendData}
                      />
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value3} index={2}>
                    <Box pb={3}>
                      <AdminAppAttendTable
                        datas={attendAppDatas.filter((data) => data.attendapp_status === 0 || data.attendapp_status === 1)}
                        setSelectAttendData={AttendInfo}
                        selectAttendData={selectAttendData}
                      />
                    </Box>
                  </ApprovalTab>
                </BasicContainer>
              </Grid>
              <Grid item xs={7} md={7} lg={7}>
                <BasicContainer>
                  <Box
                    sx={{
                      height: '775px',
                      p: 2,
                      overflow: 'auto',
                      '&::-webkit-scrollbar': {
                        width: 5
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'white'
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'gray',
                        borderRadius: 2
                      }
                    }}
                  >
                    {Object.keys(selectAttendData).length !== 0 && (
                      <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={11} sm={11} md={11} lg={12}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="h5">출/퇴근 수정 상세 조회</Typography>
                            </Grid>
                          </Grid>
                          <Box clone mt={2}>
                            <BasicChip label="제목" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={selectAttendData.attendedit_title}
                              key={selectLeaveData.attendedit_title}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '50%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="수정 날짜" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={dateFormat(new Date(selectAttendData.attend_date))}
                              key={selectAttendData.attend_date}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '25%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <Grid container direction="row">
                              <Grid item xs={2.2} sm={2.2} md={2.2} lg={2.2}>
                                <BasicChip label="수정 전 시간" color="#46a5f3" />
                              </Grid>
                              <Grid item xs={9.8} sm={9.8} md={9.8} lg={9.8}>
                                <UserAttendOriginInfoTable data={selectAttendData} />
                              </Grid>
                            </Grid>
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="사용자" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={selectAttendData.user_name}
                              key={selectAttendData.user_name}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '25%' }}
                            />
                          </Box>
                          {selectAttendFileData.length !== 0 && (
                            <Box clone mt={2} sx={{ display: 'flex' }}>
                              <BasicChip label="증빙 파일" color="#46a5f3" />
                              <Box>
                                <List>
                                  {selectAttendFileData.map((file, index) => (
                                    <ListItem key={index} alignItems="center">
                                      <ListItemIcon sx={{ mr: 2 }}>
                                        <InsertDriveFile />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={file.attached_name}
                                        secondary={file.attached_type.replace('application/', '') + '파일'}
                                      />
                                      <ListItemIcon sx={{ ml: 3 }}>
                                        <Button
                                          variant="outlined"
                                          color="primary"
                                          sx={{ border: 'none' }}
                                          onClick={() => downloadFile(file.attached_name)}
                                        >
                                          <CloudDownload />
                                        </Button>
                                      </ListItemIcon>
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                            </Box>
                          )}
                          {selectAttendData.attendedit_kind !== 2 && (
                            <Box clone mt={2}>
                              <BasicChip label="수정 사항" color="#46a5f3" />
                              <TextField
                                size="small"
                                defaultValue={selectAttendData.attendedit_kind === 0 ? '출근' : '퇴근'}
                                key={`status-${selectAttendData.attendedit_kind}`}
                                InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                sx={{ width: '25%', mr: 2 }}
                              />
                              <BasicChip label="수정 시간" color="#46a5f3" />
                              <TextField
                                size="small"
                                defaultValue={
                                  selectAttendData.attendedit_kind === 0
                                    ? selectAttendData.attendedit_start_time
                                    : selectAttendData.attendedit_end_time
                                }
                                key={`time-${selectAttendData.attendedit_kind}`}
                                InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                sx={{ width: '25%' }}
                              />
                            </Box>
                          )}
                          {selectAttendData.attendedit_kind === 2 && (
                            <>
                              <Box clone mt={2}>
                                <BasicChip label="수정 사항" color="#46a5f3" />
                                <TextField
                                  size="small"
                                  defaultValue="출근"
                                  InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                  sx={{ width: '25%', mr: 2 }}
                                />
                                <BasicChip label="수정 시간" color="#46a5f3" />
                                <TextField
                                  size="small"
                                  defaultValue={selectAttendData.attendedit_start_time}
                                  InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                  sx={{ width: '25%' }}
                                />
                              </Box>
                              <Box clone mt={2}>
                                <BasicChip label="수정 사항" color="#46a5f3" />
                                <TextField
                                  size="small"
                                  defaultValue="퇴근"
                                  InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                  sx={{ width: '25%', mr: 2 }}
                                />
                                <BasicChip label="수정 시간" color="#46a5f3" />
                                <TextField
                                  size="small"
                                  defaultValue={selectAttendData.attendedit_end_time}
                                  InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                  sx={{ width: '25%' }}
                                />
                              </Box>
                            </>
                          )}
                          <Box clone mt={2}>
                            <BasicChip label="수정 사유" color="#46a5f3" />
                            <TextField
                              multiline
                              rows={3}
                              defaultValue={selectAttendData.attendedit_reason}
                              key={selectAttendData.attendedit_reason}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '70%' }}
                            />
                          </Box>
                          {(selectAttendData.attendapp_status === 0 || selectAttendData.attendapp_status === 1) && (
                            <Box clone mt={2}>
                              <BasicChip label="결재 상태" color="#46a5f3" />
                              <TextField
                                size="small"
                                defaultValue={selectAttendData.attendapp_status == 0 ? '승인' : '반려'}
                                key={selectAttendData.attendapp_status}
                                InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                sx={{ width: '20%' }}
                              />
                            </Box>
                          )}
                          {selectAttendData.attendapp_status == 2 && (
                            <Box clone mt={2}>
                              <BasicChip label="결재" color="#46a5f3" />
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
                </BasicContainer>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </BasicTab>
      <BasicTab value={value1} index={2}>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <FormControlLabel control={<Switch checked={checked} onChange={handleCheckedChange} />} label="총 결재 수" />
        </Box>
        {checked && (
          <Fade in={checked}>
            <Box clone mx={1}>
              <BasicContainer>
                <Grid container spacing={2}>
                  <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5}>
                    <MyCardAll
                      onClick={() => {
                        setValue4(0);
                        setSelectOvertimeData({});
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4">전체 결재</Typography>
                        <Typography variant="text">{overtimeWaitapp + overtimeUnapp + overtimeApp}건</Typography>
                      </CardContent>
                    </MyCardAll>
                  </Grid>
                  <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5}>
                    <MyCardM
                      onClick={() => {
                        setValue4(1);
                        setSelectOvertimeData({});
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h4">결재 대기</Typography>
                        <Typography variant="text">{overtimeWaitapp}건</Typography>
                      </CardContent>
                    </MyCardM>
                  </Grid>
                  <Grid item xs={7} sm={7} md={7} lg={7}>
                    <MyCardL
                      onClick={() => {
                        setValue4(2);
                        setSelectOvertimeData({});
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
                              <Typography variant="text">총 {overtimeApp + overtimeUnapp}건</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                            <MyCardS>
                              <CardContent>
                                <Typography variant="h5">결재 승인 </Typography>
                                <Typography variant="text">{overtimeApp}건</Typography>
                              </CardContent>
                            </MyCardS>
                          </Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
                            <MyCardS>
                              <CardContent>
                                <Typography variant="h5">결재 반려</Typography>
                                <Typography variant="text">{overtimeUnapp}건</Typography>
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
          </Fade>
        )}
        <Box clone mx={1} my={1}>
          <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
              <Grid item xs={5} md={5} lg={5}>
                <BasicContainer>
                  <Box sx={{ borderBottom: 1, border: '0px' }}>
                    <MyTabs value={value4} onChange={handleChange4} aria-label="basic tabs example">
                      <MyTab label="전체" index="0" />
                      <MyTab label="대기" index="1" />
                      <MyTab label="완료" index="2" />
                    </MyTabs>
                  </Box>
                  <ApprovalTab value={value4} index={0}>
                    <Box pb={3}>
                      {overtimeAppDatas && (
                        <AdminAppOvertimeTable
                          datas={overtimeAppDatas}
                          setSelectOvertimeData={setSelectOvertimeData}
                          selectOvertimeData={selectOvertimeData}
                        />
                      )}
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value4} index={1}>
                    <Box pb={3}>
                      {overtimeAppDatas && (
                        <AdminAppOvertimeTable
                          datas={overtimeAppDatas.filter((data) => data.overtimeapp_status === 2)}
                          setSelectOvertimeData={setSelectOvertimeData}
                          selectOvertimeData={selectOvertimeData}
                        />
                      )}
                    </Box>
                  </ApprovalTab>
                  <ApprovalTab value={value4} index={2}>
                    <Box pb={3}>
                      {overtimeAppDatas && (
                        <AdminAppOvertimeTable
                          datas={overtimeAppDatas.filter((data) => data.overtimeapp_status === 0 || data.overtimeapp_status === 1)}
                          setSelectOvertimeData={setSelectOvertimeData}
                          selectOvertimeData={selectOvertimeData}
                        />
                      )}
                    </Box>
                  </ApprovalTab>
                </BasicContainer>
              </Grid>
              <Grid item xs={7} md={7} lg={7}>
                <BasicContainer>
                  <Box
                    sx={{
                      height: '775px',
                      p: 2,
                      overflow: 'auto',
                      '&::-webkit-scrollbar': {
                        width: 5
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'white'
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'gray',
                        borderRadius: 2
                      }
                    }}
                  >
                    {selectOvertimeData && (
                      <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={11} sm={11} md={11} lg={12}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="h5">초과근무 상세 조회</Typography>
                            </Grid>
                          </Grid>
                          <Box clone mt={2}>
                            <BasicChip label="업무 내용" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={selectOvertimeData.overtime_content}
                              key={selectOvertimeData.overtime_content}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '70%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="근무 사유" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={selectOvertimeData.overtime_reason}
                              key={selectOvertimeData.overtime_reason}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              multiline
                              rows={2}
                              sx={{ width: '70%' }}
                            />
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="신청자" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={selectOvertimeData.user_name}
                              key={selectOvertimeData.user_name}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '35%' }}
                            />
                            <Box clone mt={2}>
                              <BasicChip label="초과근무종류" color="#46a5f3" />
                              <TextField
                                size="small"
                                defaultValue={selectOvertimeData.overtime_type === 0 ? '주말 근무' : '연장 근무'}
                                key={`status-${selectOvertimeData.overtime_type}`}
                                InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                sx={{ width: '35%', mr: 2 }}
                              />
                            </Box>
                            <Box clone mt={2}>
                              <BasicChip label="초과근무 날짜" color="#46a5f3" />
                              <TextField
                                size="small"
                                defaultValue={dateFormat(new Date(selectOvertimeData.attend_date))}
                                key={selectOvertimeData.attend_date}
                                InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                sx={{ width: '35%' }}
                              />
                            </Box>
                          </Box>
                          <Box clone mt={2}>
                            <BasicChip label="초과근무시간" color="#46a5f3" />
                            <TextField
                              size="small"
                              defaultValue={`${selectOvertimeData.overtime_time} (${selectOvertimeData.attend_start} ~ ${selectOvertimeData.attend_end})`}
                              key={`time-${selectOvertimeData.overtime_time}`}
                              InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                              sx={{ width: '35%' }}
                            />
                          </Box>
                          {selectOvertimeData.overtimeapp_status !== 2 && (
                            <Box clone mt={2}>
                              <BasicChip label="결재 상태" color="#46a5f3" />
                              <TextField
                                size="small"
                                defaultValue={
                                  selectOvertimeData.overtimeapp_status === 0
                                    ? '승인'
                                    : selectOvertimeData.overtimeapp_status === 1
                                    ? '반려'
                                    : selectOvertimeData.overtimeapp_status === 0
                                    ? '대기'
                                    : '취소'
                                }
                                key={`status-${selectOvertimeData.overtimeapp_status}`}
                                InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                sx={{ width: '35%', mr: 2 }}
                              />
                            </Box>
                          )}
                          {selectOvertimeData.overtimeapp_status === 1 && (
                            <Box clone mt={2}>
                              <BasicChip label="반려 사유" color="#46a5f3" />
                              <TextField
                                size="small"
                                defaultValue={selectOvertimeData.overtimeapp_reason}
                                key={selectOvertimeData.overtimeapp_reason}
                                InputProps={{ readOnly: true, style: { borderRadius: 0 } }}
                                sx={{ width: '70%', mr: 2 }}
                              />
                            </Box>
                          )}
                          {selectOvertimeData.overtimeapp_status === 2 && (
                            <Box clone mt={2}>
                              {Object.keys(total).length > 0 && (
                                <Alert severity="info" sx={{ width: '350px' }}>
                                  {selectOvertimeData.user_name}님의 금주 총 근무 시간 : {parseInt(total.str.split(':')[0])}시간{' '}
                                  {parseInt(total.str.split(':')[1])}분 {parseInt(total.str.split(':')[2])}초 근무
                                  <Box my={1} sx={{ display: 'flex', width: '250px' }}>
                                    <Box sx={{ width: '250px', ml: 5, mt: 2 }}>
                                      <Progress
                                        type="circle"
                                        percent={(total.num / 7.2).toFixed(1)}
                                        theme={{
                                          active: {
                                            color: progressColor(25)
                                          }
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                </Alert>
                              )}
                              <Box mt={2}>
                                <BasicChip label="결재" color="#46a5f3" />
                                <FormControl sx={{ ml: 1 }}>
                                  <RadioGroup
                                    row
                                    sx={{ justifyContent: 'center', alignItems: 'center' }}
                                    value={appOvertimeStatus}
                                    onChange={handleOvertimeRadioChange}
                                  >
                                    <FormControlLabel value="overtimeApp" control={<Radio size="small" />} label="승인" />
                                    <FormControlLabel value="overtimeUnapp" control={<Radio size="small" />} label="반려" />
                                  </RadioGroup>
                                </FormControl>
                              </Box>
                              {appOvertimeStatus == 'overtimeUnapp' && (
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
                                <Button variant="contained" onClick={submitOvertimaApproval}>
                                  결재완료
                                </Button>
                              </Stack>
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    )}
                  </Box>
                </BasicContainer>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </BasicTab>
    </>
  );
};

export default ApprovalAttendance;
