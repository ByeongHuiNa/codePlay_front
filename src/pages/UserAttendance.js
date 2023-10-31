// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import BasicContainer from 'components/container/BasicContainer';
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
import React, { useEffect, useState } from 'react';
import AttendUpdateModal from '../components/Modal/ModalM';
import UpdateAttendTable from 'components/Table/UpdateAttendTable';
import BasicDatePicker from 'components/DatePicker/BasicDatePicker';
import BasicChip from 'components/Chip/BasicChip';
import { UploadOutlined } from '../../node_modules/@mui/icons-material/index';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import TimePicker2 from 'components/DatePicker/TimePicker';
import UserAllAttendTable from 'components/Table/UserAllAttendTable';
import UserAttendInfoTable from 'components/Table/UserAttendInfoTable';
import styled from 'styled-components';
import axios from '../../node_modules/axios/index';
import AppAuto from 'components/AutoComplete/AppAuto';
import ModalS from 'components/Modal/ModalS';
import { useFormatter } from 'store/module';

// 파일 업로드
const VisuallyHiddenInput = styled.input`
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

const UserAttendance = () => {
  // 날짜 형식
  const { dateFormat } = useFormatter();

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
    // searchInitial();
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
  const [title, setTitle] = useState(''); // 수정 제목
  const [reason, setReason] = useState(''); // 수정 사유
  const [updateStartTime, setUpdateStartTime] = useState(''); // 출근 : 수정할 시간
  const [updateEndTime, setUpdateEndTime] = useState(''); // 퇴근 : 수정할 시간

  // 수정 요청 시 체크 박스 (true : 체크 O, false : 체크 X)
  const [startChecked, setStartChecked] = useState(false);
  const [endChecked, setEndChecked] = useState(false);

  const handleStartChange = (e) => {
    setStartChecked(e.target.checked);
  };

  const handleEndChange = (e) => {
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
      alert('날짜 선택하시고 결재자 선택하시고 수정사항 선택하세요.');
    } else {
      axios
        .post(`/attend-edit?user_no=${user.user_no}&attend_no=${selectAttendData.attend_no}`, {
          attendedit_title: title
            ? title
            : `${user.user_name}-${dateFormat(new Date(selectAttendData.attend_date))}-${
                startChecked === true && endChecked === true ? '출퇴근' : startChecked === true ? '출근' : '퇴근'
              }`,
          attendedit_reason: reason,
          attendedit_kind: startChecked === true && endChecked === true ? 2 : startChecked === true ? 0 : 1,
          attendedit_start_time: startChecked !== true ? null : updateStartTime ? updateStartTime : '09:00:00',
          attendedit_end_time: endChecked !== true ? null : updateEndTime ? updateEndTime : '18:00:00',
          attendapp_user_no: approver.user_no
        })
        .then((res) => {
          alert(res);
          setValue(1);
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
    const endDate = new Date(searchEndDate).setHours(0, 0, 0, 0);
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

  const [openRead, setOpenRead] = React.useState(false); // 탭 1. 수정 목록 상세 조회
  // 모달창 활성화 버튼
  const handleOpenRead = (data) => {
    setSelectAttendEditData(data);
    setOpenRead(true);
  };
  // 모달창 취소 버튼
  const handleCloseRead = () => {
    setSelectAttendEditData({});
    setOpenRead(false);
  };

  // 로그인 한 사용자
  const user = {
    user_no: 1,
    user_name: '이유나',
    dept: {
      dept_no: 1
    }
  };

  // 같은 부서의 근태담당자 (우선 지금은 팀장) 사용자 데이터
  const [allUsers, setAllUsers] = useState([]);
  // 로그인 한 사용자의 출/퇴근 기록 가져오기
  const [attendDatas, setAttendDatas] = useState([]);
  // 로그인 한 사용자의 출/퇴근 수정 기록 가져오기
  const [attendEditDatas, setAttendEditDatas] = useState([]);

  useEffect(() => {
    // 로그인 한 사용자 부서의 근태 담당자 내역 -> 결재자 검색창 autocomplete
    axios.get(`/dept-manager?dept_no=${user.dept.dept_no}`).then((res) => {
      setAllUsers(res.data);
    });
    // 로그인 한 사용자의 전체 출퇴근 내역 조회 (이상 근태 내역은 전체 내역에서 필터링 처리)
    axios.get(`/user-attend?user_no=${user.user_no}`).then((res) => {
      setAttendDatas(res.data);
    });
    // 로그인 한 사용자의 전체 출퇴근 수정 내역 조회
    axios.get(`/attend-edit?user_no=${user.user_no}`).then((res) => {
      setAttendEditDatas(res.data);
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
    <ComponentSkeleton>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="출/퇴근 수정" />
          <Tab label="수정 요청 목록" />
        </Tabs>
      </Box>
      <BasicTab value={value} index={0}>
        <Box pb={2}>
          <BasicContainer>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={4} md={4} lg={4}>
                <MainCard sx={{ mr: 1, pt: 2, height: '740px' }} content={false}>
                  <Box ml={2} mr={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5">최근 이상 근태 내역</Typography>
                    <Button onClick={handleOpenAll}>전체보기</Button>
                  </Box>
                  <Box mt={1}>
                    <UserAllAttendTable
                      datas={attendDatas.filter(
                        (data) => data.attend_status === '지각' || data.attend_status === '결근' || data.attend_status === '조퇴'
                      )}
                      handleMyCard={handleMyCard}
                      height={'650px'}
                      selectAttendData={selectAttendData}
                    />
                  </Box>
                </MainCard>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Grid container direction="column">
                  <Grid item xs={5} md={5} lg={5}>
                    <MainCard sx={{ pt: 2, height: '150px' }} content={false}>
                      <Grid container alignItems="center" direction="row" spacing={1} sx={{ pl: 2 }}>
                        <Grid item>
                          <Typography variant="h5">선택된 날짜</Typography>
                        </Grid>
                      </Grid>
                      <Box clone mt={1}>
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
                    <MainCard sx={{ mt: 1, pt: 2, pr: 2, pl: 2, height: '580px' }} content={false}>
                      <Grid container spacing={1} justifyContent="center">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Typography variant="h5">출/퇴근 수정</Typography>
                          <Box clone mt={3}>
                            <BasicChip label="제목" color="gray" />
                            <TextField
                              size="small"
                              onChange={(e) => {
                                setTitle(e.target.value);
                              }}
                            />
                          </Box>
                          <Box clone mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
                            <EditNoteRoundedIcon fontSize="medium" color="secondary" sx={{ mx: 1 }} />
                            <Typography size="small" color="secondary">
                              제목을 입력하지 않을 시 자동 지정됩니다.
                            </Typography>
                          </Box>
                          <Box clone mt={2.5} sx={{ display: 'flex' }}>
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
                          <Box clone mt={2.5}>
                            <BasicChip label="수정사항" color="gray" />
                            <Checkbox size="small" checked={startChecked} onChange={handleStartChange} /> 출근
                            <Checkbox size="small" checked={endChecked} onChange={handleEndChange} /> 퇴근
                          </Box>
                          {startChecked === true && (
                            <Box clone mt={2.5}>
                              <BasicChip label="출근수정시간" color="gray" />
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
                                  defaultValue="09:00:00"
                                  key={attendStartDefault}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: '30%' }}
                                />
                              )}
                            </Box>
                          )}
                          {endChecked === true && (
                            <Box clone mt={2.5}>
                              <BasicChip label="퇴근수정시간" color="gray" />
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
                                  defaultValue="18:00:00"
                                  key={attendEndDefault}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: '30%' }}
                                />
                              )}
                            </Box>
                          )}
                          <Box clone mt={2.5}>
                            <BasicChip label="증빙 업로드" color="gray" />
                            <Button component="label" variant="contained" size="medium" endIcon={<UploadOutlined />}>
                              파일 선택
                              <VisuallyHiddenInput type="file" />
                            </Button>
                          </Box>
                          <Box clone mt={2.5} mr={1}>
                            <BasicChip label="수정사유" color="gray" />
                            <TextField
                              multiline
                              rows={3}
                              sx={{ width: '84%' }}
                              onChange={(e) => {
                                setReason(e.target.value);
                              }}
                            />
                          </Box>
                          <Stack direction="row" justifyContent="flex-end" mt={2.5} mr={1}>
                            <Button variant="contained" onClick={submitAttendEdit}>
                              수정완료
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </BasicContainer>
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
      </BasicTab>
      <BasicTab value={value} index={1}>
        <Box clone mx={1} my={1} pb={2}>
          <BasicContainer sx={{ height: '760px' }}>
            <Grid container>
              <Grid item xs={3} md={3} lg={3}>
                <Typography variant="h4">출/퇴근 수정 요청 목록</Typography>
              </Grid>
              <Grid item xs={9} md={9} lg={9}>
                <Grid container justifyContent="right" spacing={1}>
                  <Grid item>
                    <BasicDatePicker setDate={setSearchStartDate} val={searchStartDate} />
                  </Grid>
                  <Grid item>
                    <BasicDatePicker setDate={setSearchEndDate} val={searchEndDate} />
                  </Grid>
                  <Grid item sx={{ mt: 0.3 }}>
                    <Button variant="contained" color="secondary" onClick={searchAttendEditButton}>
                      조회
                    </Button>
                  </Grid>
                  <Grid item sx={{ mt: 0.3 }}>
                    <Button variant="contained" color="secondary" onClick={searchInitial}>
                      초기화
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <UpdateAttendTable
                handleOpenRead={handleOpenRead}
                datas={filteredAttendEditData[0] === 0 ? attendEditDatas : filteredAttendEditData[1]}
              />
            </MainCard>
          </BasicContainer>
        </Box>

        <ModalS open={openRead} handleClose={handleCloseRead}>
          <Box py={2}>
            <Typography variant="h4">{selectAttendEditData.attendedit_title}</Typography>
          </Box>
          <Box py={2}>
            <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
              {selectAttendEditData.attendedit_kind === 2 && (
                <>
                  <Grid item xs={3} md={3} lg={3}>
                    <BasicChip label="수정사항" color="#42a5f5" />
                  </Grid>
                  <Grid item xs={9} md={9} lg={9}>
                    <Typography>출근, 퇴근</Typography>
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <BasicChip label="수정시간(출근)" color="#42a5f5" />
                  </Grid>
                  <Grid item xs={9} md={9} lg={9}>
                    <Typography>{selectAttendEditData.attendedit_start_time}</Typography>
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <BasicChip label="수정시간(퇴근)" color="#42a5f5" />
                  </Grid>
                  <Grid item xs={9} md={9} lg={9}>
                    <Typography>{selectAttendEditData.attendedit_end_time}</Typography>
                  </Grid>
                </>
              )}
              {selectAttendEditData.attendedit_kind !== 2 && (
                <>
                  <Grid item xs={3} md={3} lg={3}>
                    <BasicChip label="수정사항" color="#42a5f5" />
                  </Grid>
                  <Grid item xs={9} md={9} lg={9}>
                    <Typography>{selectAttendEditData.attendedit_kind === 0 ? '출근' : '퇴근'}</Typography>
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <BasicChip label={selectAttendEditData.attendedit_kind === 0 ? '수정시간(출근)' : '수정시간(퇴근)'} color="#42a5f5" />
                  </Grid>
                  <Grid item xs={9} md={9} lg={9}>
                    <Typography>
                      {selectAttendEditData.attendedit_kind === 0
                        ? selectAttendEditData.attendedit_start_time
                        : selectAttendEditData.attendedit_end_time}
                    </Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={3} md={3} lg={3}>
                <BasicChip label="수정사유" color="#42a5f5" />
              </Grid>
              <Grid item xs={9} md={9} lg={9}>
                <Typography>{selectAttendEditData.attendedit_reason}</Typography>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <BasicChip label="요청일자" color="#42a5f5" />
              </Grid>
              <Grid item xs={9} md={9} lg={9}>
                <Typography>{dateFormat(new Date(selectAttendEditData.attendedit_date))}</Typography>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <BasicChip label="결재자" color="#42a5f5" />
              </Grid>
              <Grid item xs={9} md={9} lg={9}>
                <Typography>{selectAttendEditData.attendapp_user_name}</Typography>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <BasicChip label="결재상태" color="#42a5f5" />
              </Grid>
              <Grid item xs={9} md={9} lg={9}>
                <Typography>
                  {selectAttendEditData.attendapp_status === 0
                    ? '결재승인'
                    : selectAttendEditData.attendapp_status === 1
                    ? '결재반려'
                    : '결재대기'}
                </Typography>
              </Grid>
              {selectAttendEditData.attendapp_status === 0 && (
                <>
                  <Grid item xs={3} md={3} lg={3}>
                    <BasicChip label="결재날짜" color="#42a5f5" />
                  </Grid>
                  <Grid item xs={9} md={9} lg={9}>
                    <Typography>{selectAttendEditData.attendapp_date}</Typography>
                  </Grid>
                </>
              )}
              {selectAttendEditData.attendapp_status === 1 && (
                <>
                  <Grid item xs={3} md={3} lg={3}>
                    <BasicChip label="반려사유" color="#42a5f5" />
                  </Grid>
                  <Grid item xs={9} md={9} lg={9}>
                    <Typography>{selectAttendEditData.attendapp_reason}</Typography>
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <BasicChip label="결재날짜" color="#42a5f5" />
                  </Grid>
                  <Grid item xs={9} md={9} lg={9}>
                    <Typography>{selectAttendEditData.attendapp_date}</Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          <Stack direction="row" justifyContent="flex-end" mt={2} mr={1.5}>
            <Button variant="contained" size="medium" onClick={handleCloseRead} sx={{ backgroundColor: '#42a5f5' }}>
              닫기
            </Button>
          </Stack>
        </ModalS>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default UserAttendance;
