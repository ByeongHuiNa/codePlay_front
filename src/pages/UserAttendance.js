// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import {
  Box,
  Button,
  Checkbox,
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
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React, { useEffect, useState } from 'react';
import AttendUpdateModal from '../components/Modal/ModalM';
import UpdateAttendTable from 'components/Table/UpdateAttendTable';
import BasicDatePicker from 'components/DatePicker/BasicDatePicker';
import BasicChip from 'components/Chip/BasicChip';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import TimePicker2 from 'components/DatePicker/TimePicker';
import UserAllAttendTable from 'components/Table/UserAllAttendTable';
import UserAttendInfoTable from 'components/Table/UserAttendInfoTable';
import axios from '../../node_modules/axios/index';
import AppAuto from 'components/AutoComplete/AppAuto';
import { useFormatter } from 'store/module';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';
import { useLocation } from '../../node_modules/react-router-dom/dist/index';
import FileUpload from 'components/File/FileUpload';
import SuccessModal from 'components/Modal/SuccessModal';
import FailModal from 'components/Modal/FailModal';

const UserAttendance = () => {
  // 날짜 형식
  const { dateFormat } = useFormatter();
  const location = useLocation();

  //token 값을 decode해주는 코드
  const token = jwtDecode(localStorage.getItem('token').slice(7));

  useEffect(() => {
    console.log(location.state);
    if (location.state && location.state.val === 0) {
      console.log(location.state);
      setValue(location.state.index);
    }
  }, []);

  // 탭(0.출/퇴근수정, 1.수정요청목록) ================================
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setUpdateStartTime('');
    setUpdateEndTime('');
    setAttendStartDefault('default');
    setAttendEndDefault('default');
    setSelectAttendData({});
    setStartChecked(false);
    setEndChecked(false);
    searchInitial();
  };

  // 탭 0. 출/퇴근 수정 =========================================
  // 수정 할 데이터
  const [selectAttendData, setSelectAttendData] = useState({});

  // 수정 할 데이터를 선택할 때마다 리렌더링
  useEffect(() => {
    if (Object.keys(selectAttendData).length !== 0) {
      setAttendStartDefault('default');
      setAttendEndDefault('default');
      setUpdateStartTime('');
      setUpdateEndTime('');
    }
  }, [selectAttendData]);

  // 최근 이상 근태 내역 전체보기 모달창
  // 모달창에서 선택한 데이터 -> 확인 버튼 클릭하면 수정 할 데이터로 저장
  const [searchAttendData, setSearchAttendData] = useState({});

  // 테이블에서 데이터 선택 시 수정 할 데이터(selectAttendData)에 저장
  const handleMyCard = async (data) => {
    try {
      setSelectAttendData(data);
      setStartChecked(false);
      setEndChecked(false);
    } catch (error) {
      console.error('Error Fetching Data : ', error);
    }
  };

  // 출/퇴근 수정 폼
  const [reason, setReason] = useState(''); // 수정 사유
  const [updateStartTime, setUpdateStartTime] = useState(''); // 출근 : 수정할 시간
  const [updateEndTime, setUpdateEndTime] = useState(''); // 퇴근 : 수정할 시간
  const [uploadedFile, setUploadedFile] = useState([]); // 파일 업로드를 위한 배열

  // 수정 요청 시 체크 박스 (true : 체크 O, false : 체크 X)
  const [startChecked, setStartChecked] = useState(false);
  const [endChecked, setEndChecked] = useState(false);
  const [bothChecked, setBothChecked] = useState(false);

  useEffect(() => {
    if (startChecked && endChecked) {
      setBothChecked(true);
    } else {
      setBothChecked(false);
    }
  }, [startChecked, endChecked]);

  const handleStartChange = (e) => {
    setStartChecked(e.target.checked);
  };

  const handleEndChange = (e) => {
    setEndChecked(e.target.checked);
  };

  const handleBothChange = (e) => {
    setBothChecked(e.target.checked);
    setStartChecked(e.target.checked);
    setEndChecked(e.target.checked);
  };

  // 출근 수정 요청 시 라디오 : 수정시간 기본값/직접입력 선택
  const [attendStartDefault, setAttendStartDefault] = useState('default');
  const handleDefaultStartChange = (event) => {
    setAttendStartDefault(event.target.value);
  };

  // 퇴근 수정 요청 시 라디오 : 수정시간 기본값/직접입력 선택
  const [attendEndDefault, setAttendEndDefault] = useState('default');
  const handleDefaultEndChange = (event) => {
    setAttendEndDefault(event.target.value);
  };

  // 출퇴근 수정 완료 버튼 함수
  function submitAttendEdit() {
    if (
      Object.keys(selectAttendData).length === 0 ||
      Object.keys(approver).length === 0 ||
      (startChecked === false && endChecked === false)
    ) {
      // alert('날짜 선택하시고 결재자 선택하시고 수정사항 선택하세요.');
      handleOpenFailModal();
    } else {
      axios
        .post(`/attend-edit?user_no=${token.user_no}&attend_no=${selectAttendData.attend_no}`, {
          attendedit_title: `${token.user_name}-${
            Object.keys(selectAttendData).length !== 0 ? dateFormat(new Date(selectAttendData.attend_date)) : ''
          }-${startChecked === true && endChecked === true ? '출퇴근' : startChecked === true ? '출근' : '퇴근'}`,
          attendedit_reason: reason,
          attendedit_kind: startChecked === true && endChecked === true ? 2 : startChecked === true ? 0 : 1,
          attendedit_start_time: startChecked !== true ? null : updateStartTime ? updateStartTime : '09:00:00',
          attendedit_end_time: endChecked !== true ? null : updateEndTime ? updateEndTime : '18:00:00',
          attendapp_user_no: approver.user_no,
          attendoriginal_start_time: selectAttendData.attend_start,
          attendoriginal_end_time: selectAttendData.attend_end,
          attendoriginal_status: selectAttendData.attend_status
        })
        .then(async (res) => {
          const formData = new FormData();
          Array.from(uploadedFile).forEach((file, index) => {
            console.log(index + '. : ' + file);
            formData.append(`files`, file);
          });

          try {
            await axios
              .post(`/file-upload?attached_app_no=${res.data}&attached_kind=0`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
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

  // 출퇴근 수정 내역 삭제 버튼 함수
  function deleteAttendEdit(attendapp_no) {
    axios.get(`/attend-edit-delete?attendapp_no=${attendapp_no}`).then((res) => {
      console.log(res.data);
      handleOpenDeleteModal();
      axios.get(`/attend-edit?user_no=${token.user_no}`).then((res) => {
        setAttendEditDatas(res.data);
      });
    });
  }

  // 탭 1. 출/퇴근 수정 목록 조회 ====================================
  // 날짜별 데이터 검색
  const [searchStartDate, setSearchStartDate] = useState(new Date().toISOString().slice(0, 10)); // 검색 시작 날짜
  const [searchEndDate, setSearchEndDate] = useState(new Date().toISOString().slice(0, 10)); // 검색 종료 날짜
  const [filteredAttendData, setFilteredAttendData] = useState([0, []]); // 검색 결과 : 출퇴근 내역
  const [filteredAttendEditData, setFilteredAttendEditData] = useState([0, []]); // 검색 결과 : 출퇴근 수정 내역

  // 출퇴근 내역 검색 함수
  const searchAttendButton = () => {
    const startDate = new Date(searchStartDate).setHours(0, 0, 0, 0);
    const endDate = new Date(searchEndDate).setHours(23, 59, 59, 0);
    if (startDate > endDate) {
      alert('종료일이 시작일보다 작을 수 없습니다.');
    } else if (!searchStartDate || !searchEndDate) {
      alert('검색일을 선택해주세요.');
    } else {
      setFilteredAttendData((prevState) => {
        const newFiltered = [...prevState];
        newFiltered[0] = 1;
        newFiltered[1] = attendDatas.filter((attend) => {
          const attendDate = new Date(attend.attend_date);
          return attendDate >= startDate && attendDate <= endDate;
        });
        return newFiltered;
      });
    }
  };

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
        newFiltered[1] = attendEditDatas.filter((attendEdit) => {
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

  // 모달창 설정 =============================================
  const [openAll, setOpenAll] = React.useState(false); // 탭 0. 출/퇴근 전체 조회 : 최근 이상 근태 내역 전체보기
  const handleOpenAll = () => setOpenAll(true); // 모달창 활성화 버튼
  // 모달창 취소 버튼 (데이터 저장 O)
  const handleCloseAllSave = () => {
    setOpenAll(false);
    setSelectAttendData(searchAttendData);
    setSearchStartDate(new Date());
    setSearchEndDate(new Date());
    setFilteredAttendData((prevState) => {
      const newFiltered = [...prevState];
      newFiltered[0] = 0;
      newFiltered[1] = [];
      return newFiltered;
    });
  };

  // 모달창 확인 버튼 (데이터 저장 X)
  const handleCloseAll = () => {
    setOpenAll(false);
    setSearchAttendData({});
    setSearchStartDate(new Date());
    setSearchEndDate(new Date());
    setFilteredAttendData((prevState) => {
      const newFiltered = [...prevState];
      newFiltered[0] = 0;
      newFiltered[1] = [];
      return newFiltered;
    });
  };

  // 모달창 1. 신청 실패
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
  // 모달창 2. 신청 성공
  const [successModal, setSuccessModal] = React.useState(false);

  // 모달창 활성화 버튼
  const handleOpenSuccessModal = () => {
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      setValue(1);
    }, 1500);
  };

  // 모달창 취소 버튼
  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    setValue(1);
  };
  // 모달창 3. 삭제 성공
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

  // 같은 부서의 근태담당자 (우선 지금은 팀장) 사용자 데이터
  const [allUsers, setAllUsers] = useState([]);
  // 로그인 한 사용자의 출/퇴근 기록 가져오기
  const [attendDatas, setAttendDatas] = useState([]);
  // 로그인 한 사용자의 이상 출/퇴근 기록 가져오기
  const [attendWrongDatas, setAttendWrongDatas] = useState([]);
  // 로그인 한 사용자의 출/퇴근 수정 기록 가져오기
  const [attendEditDatas, setAttendEditDatas] = useState([]);
  // 로그인 한 사용자의 출퇴근 정책 가져오기
  const [attendPolicy, setAttendPolicy] = useState({});

  useEffect(() => {
    // 로그인 한 사용자 부서의 근태 담당자 내역 -> 결재자 검색창 autocomplete
    axios.get(`/dept-manager?dept_no=${token.dept_no}`).then((res) => {
      setAllUsers(res.data);
    });
    // 로그인 한 사용자의 전체 출퇴근 내역 조회
    axios.get(`/user-attend?user_no=${token.user_no}`).then((res) => {
      setAttendDatas(
        res.data.filter(
          (attend) => attend.attend_status !== '연장' && attend.attend_status !== '초과' && new Date(attend.attend_date) <= new Date()
        )
      );
    });
    // 로그인 한 사용자의 이상 출퇴근 내역 조회 (결재 진행중인 내역은 제외)
    axios.get(`/user-wrong-attend?user_no=${token.user_no}`).then((res) => {
      setAttendWrongDatas(res.data);
      console.log(res.data);
    });
    // 로그인 한 사용자의 전체 출퇴근 수정 내역 조회
    axios.get(`/attend-edit?user_no=${token.user_no}`).then((res) => {
      setAttendEditDatas(res.data);
    });
    // 로그인 한 사용자의 현재 출퇴근 정책
    axios.get(`/user-attend-policy?user_no=${token.user_no}`).then((res) => {
      setAttendPolicy(res.data);
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

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="출/퇴근 수정" />
          <Tab label="수정 요청 목록" />
        </Tabs>
      </Box>
      <BasicTab value={value} index={0}>
        <Box pb={2}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={5} md={5} lg={5}>
              <Grid container direction="column">
                <Grid item xs={5} md={5} lg={5}>
                  <MainCard sx={{ mb: 2, pt: 2, height: '160px' }} content={false}>
                    <Grid container alignItems="center" direction="row" spacing={1} sx={{ pl: 2 }}>
                      <Grid item>
                        <Typography variant="h5">선택된 날짜</Typography>
                      </Grid>
                    </Grid>
                    <Box mt={1}>
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
                          <ErrorOutlineIcon fontSize="medium" color="secondary" sx={{ mx: 1 }} />
                          <Typography size="small" color="secondary">
                            선택된 날짜 없음
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </MainCard>
                </Grid>
                <Grid item xs={7} md={7} lg={7}>
                  <MainCard sx={{ pt: 2, height: '560px' }} content={false}>
                    <Box mr={1} pl={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="h5">최근 이상 근태 내역</Typography>
                      <Button onClick={handleOpenAll}>전체보기</Button>
                    </Box>
                    <Box mt={1}>
                      <UserAllAttendTable
                        datas={attendWrongDatas}
                        handleMyCard={handleMyCard}
                        height={'450px'}
                        selectAttendData={selectAttendData}
                      />
                    </Box>
                  </MainCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={7} md={7} lg={7}>
              <MainCard sx={{ ml: 2, pt: 2, pr: 2, pl: 2, height: '730px' }} content={false}>
                <Typography variant="h5">출/퇴근 수정</Typography>
                <Grid container spacing={1} justifyContent="center" sx={{ pl: 2 }}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box mt={3}>
                      <BasicChip label="제목" color="#46a5f3" />
                      <TextField
                        label={`${token.user_name}${
                          Object.keys(selectAttendData).length !== 0 ? '-' + dateFormat(new Date(selectAttendData.attend_date)) : ''
                        }-${startChecked === true && endChecked === true ? '출퇴근' : startChecked === true ? '출근' : '퇴근'}`}
                        size="small"
                        sx={{ ml: 1, width: '40%' }}
                        disabled
                      />
                    </Box>
                    <Box mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <EditNoteRoundedIcon fontSize="medium" color="secondary" sx={{ mx: 1 }} />
                      <Typography size="small" color="secondary">
                        제목은 자동 지정됩니다.
                      </Typography>
                    </Box>
                    <Box mt={2.5} sx={{ display: 'flex' }}>
                      <BasicChip label="결재자" color="#46a5f3" />
                      <Box sx={{ ml: 1 }}>
                        <AppAuto
                          label="결재자"
                          datas={allUsers}
                          handleSelectUser={handleSelectUser}
                          searchName={searchName}
                          setSearchName={setSearchName}
                          setApprover={setApprover}
                        />
                      </Box>
                    </Box>
                    <Box mt={2.5}>
                      <BasicChip label="수정사항" color="#46a5f3" />
                      <Checkbox size="small" checked={bothChecked} onChange={handleBothChange} /> 출/퇴근
                      <Checkbox size="small" checked={startChecked} onChange={handleStartChange} /> 출근
                      <Checkbox size="small" checked={endChecked} onChange={handleEndChange} /> 퇴근
                    </Box>
                    {startChecked === true && (
                      <Box mt={2.5}>
                        <BasicChip label="출근수정시간" color="#46a5f3" />
                        <FormControl sx={{ ml: 1 }}>
                          <RadioGroup
                            row
                            sx={{ justifyContent: 'center', alignItems: 'center' }}
                            value={attendStartDefault}
                            onChange={handleDefaultStartChange}
                          >
                            <FormControlLabel value="default" control={<Radio size="small" />} label="기본값" />
                            <FormControlLabel value="other" control={<Radio size="small" />} label="직접입력" />
                          </RadioGroup>
                        </FormControl>
                        {attendStartDefault == 'other' && <TimePicker2 label={'출근수정시간'} setTime={setUpdateStartTime} />}
                        {attendStartDefault == 'default' && (
                          <TextField
                            size="small"
                            defaultValue={attendPolicy.standard_start_time}
                            key={attendStartDefault}
                            inputProps={{ readOnly: true }}
                            sx={{ width: '32%' }}
                          />
                        )}
                      </Box>
                    )}
                    {endChecked === true && (
                      <Box mt={2.5}>
                        <BasicChip label="퇴근수정시간" color="#46a5f3" />
                        <FormControl sx={{ ml: 1 }}>
                          <RadioGroup
                            row
                            sx={{ justifyContent: 'center', alignItems: 'center' }}
                            value={attendEndDefault}
                            onChange={handleDefaultEndChange}
                          >
                            <FormControlLabel value="default" control={<Radio size="small" />} label="기본값" />
                            <FormControlLabel value="other" control={<Radio size="small" />} label="직접입력" />
                          </RadioGroup>
                        </FormControl>
                        {attendEndDefault == 'other' && <TimePicker2 label={'퇴근수정시간'} setTime={setUpdateEndTime} />}
                        {attendEndDefault == 'default' && (
                          <TextField
                            size="small"
                            defaultValue={attendPolicy.standard_end_time}
                            key={attendEndDefault}
                            inputProps={{ readOnly: true }}
                            sx={{ width: '32%' }}
                          />
                        )}
                      </Box>
                    )}
                    <Box mt={2.5} sx={{ display: 'flex' }}>
                      <BasicChip label="증빙 업로드" color="#46a5f3" />
                      <FileUpload setUploadedInfo={setUploadedFile} uploadedInfo={uploadedFile} width="500px" />
                    </Box>
                    <Box mt={2} mr={1}>
                      <BasicChip label="수정사유" color="#46a5f3" />
                      <TextField
                        multiline
                        rows={3}
                        sx={{ ml: 1, width: '82%' }}
                        onChange={(e) => {
                          setReason(e.target.value);
                        }}
                      />
                    </Box>
                    <Stack direction="row" justifyContent="flex-end" mt={2.5} mr={1.5}>
                      <Button variant="contained" onClick={submitAttendEdit}>
                        수정완료
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Box>
        <AttendUpdateModal open={openAll} handleClose={handleCloseAll}>
          <Grid container alignItems="center" direction="row" spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={3.4} md={3.4} lg={3.4}>
              <Typography variant="h5">전체 근태 내역</Typography>
            </Grid>
            <Grid item xs={3} md={3} lg={3}>
              <BasicDatePicker setDate={setSearchStartDate} val={searchStartDate} />
            </Grid>
            <Grid item xs={3} md={3} lg={3}>
              <BasicDatePicker setDate={setSearchEndDate} val={searchEndDate} />
            </Grid>
            <Grid item xs={1.1} md={1.1} lg={1.1}>
              <Button variant="contained" onClick={searchAttendButton}>
                검색
              </Button>
            </Grid>
            <Grid item xs={1.5} md={1.5} lg={1.5}>
              <Button variant="contained" onClick={searchInitial}>
                초기화
              </Button>
            </Grid>
          </Grid>
          <UserAllAttendTable
            datas={filteredAttendData[0] === 0 ? attendDatas : filteredAttendData[1]}
            handleMyCard={setSearchAttendData}
            searchAttendData={searchAttendData}
            height={'470px'}
          />
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
        <FailModal
          open={failModal}
          handleClose={handleCloseFailModal}
          color="red"
          msg1="날짜, 결재자, 수정사항은"
          msg2="필수로 선택하셔야합니다."
        />
        <SuccessModal open={successModal} handleClose={handleCloseSuccessModal} color="#46a5f3" msg="수정 완료되었습니다." />
      </BasicTab>
      <BasicTab value={value} index={1}>
        <Box mx={1}>
          <Grid container>
            <Grid item xs={5.5} md={5.5} lg={5.5} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4">출/퇴근 수정 요청 목록</Typography>
            </Grid>
            <Grid item xs={6.5} md={6.5} lg={6.5}>
              <Grid container direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item sx={{ display: 'flex' }}>
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
                    <Button variant="contained" onClick={searchAttendEditButton}>
                      수정날짜 조회
                    </Button>
                  </Box>
                  <Box mt={0.3}>
                    <Button variant="contained" onClick={searchInitial}>
                      초기화
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <UpdateAttendTable
              datas={filteredAttendEditData[0] === 0 ? attendEditDatas : filteredAttendEditData[1]}
              deleteAttendEdit={deleteAttendEdit}
            />
          </MainCard>
        </Box>
        <SuccessModal open={deleteModal} handleClose={handleCloseDeleteModal} color="#52c41a" msg="수정 요청이 취소되었습니다." />
      </BasicTab>
    </>
  );
};

export default UserAttendance;
