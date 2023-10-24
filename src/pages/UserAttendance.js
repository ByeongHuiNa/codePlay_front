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
import TimePicker2 from 'components/DatePicker/TimePicker';
import UserAllAttendTable from 'components/Table/UserAllAttendTable';
import UserAttendInfoTable from 'components/Table/UserAttendInfoTable';
import styled from 'styled-components';
import axios from '../../node_modules/axios/index';
import AppAuto from 'components/AutoComplete/AppAuto';
import ModalS from 'components/Modal/ModalS';

const UserAttendance = () => {
  // 탭(0.출/퇴근수정, 1.수정요청목록)
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setUpdateStartTime('');
    setUpdateEndTime('');
    setAttendStartDefault('default');
    setAttendEndDefault('default');
    setSearchStartDate('');
    setSearchEndDate('');
    setSelectAttendData({});
    setStartChecked(false);
    setEndChecked(false);
  };

  // 탭 0. 출/퇴근 수정
  // 수정 데이터
  const [selectAttendData, setSelectAttendData] = useState({});

  // 모달창에서 선택한 데이터 -> 확인 버튼 클릭하면 수정 데이터로 저장
  const [searchAttendData, setSearchAttendData] = useState({});

  // 근태 내역 전체보기 모달창
  // 출/퇴근 목록 검색 : 시작날짜~종료날짜
  const [searchStartDate, setSearchStartDate] = useState('');
  const [searchEndDate, setSearchEndDate] = useState('');

  // 테이블에서 데이터 선택 시 수정 데이터(selectAttendData)에 저장
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
  // 출근 : 수정할 시간
  const [updateStartTime, setUpdateStartTime] = useState('');
  // 퇴근 : 수정할 시간
  const [updateEndTime, setUpdateEndTime] = useState('');

  // 수정 요청 시 체크 박스
  // true : 체크 O, false : 체크 X
  const [startChecked, setStartChecked] = useState(false);
  const [endChecked, setEndChecked] = useState(false);

  const handleStartChange = (e) => {
    setStartChecked(e.target.checked);
  };

  const handleEndChange = (e) => {
    setEndChecked(e.target.checked);
  };

  // 출근 수정 요청 시 라디오 : 수정시간 기본값/직접입력 선택
  const [attendStartDefault, setAttendStartDefault] = useState('');
  const handleDefaultStartChange = (event) => {
    setAttendStartDefault(event.target.value);
  };

  // 퇴근 수정 요청 시 라디오 : 수정시간 기본값/직접입력 선택
  const [attendEndDefault, setAttendEndDefault] = useState('');
  const handleDefaultEndChange = (event) => {
    setAttendEndDefault(event.target.value);
  };

  // 수정 사유
  const [reason, setReason] = useState('');

  // 출퇴근 수정 완료 버튼
  function submitAttendEdit() {
    alert('수정완료');
    // axios
    //   .post(`http://localhost:8000/attendance_edit_approval?user_no=${user.user_no}&attend_no=${selectAttendData.attend_no}`, {
    //     user_no: user.user_no,
    //     attend_no: selectAttendData.attend_no,
    //     attendedit_reason: reason,
    //     attendedit_kind: startChecked === true && endChecked === true ? 2 : startChecked === true ? 0 : 1,
    //     attendedit_time:
    //       startChecked === true && endChecked === true
    //         ? [updateStartTime, updateEndTime]
    //         : startChecked === true
    //         ? updateStartTime
    //         : updateEndTime,
    //     attendedit_date: new Date().toLocaleDateString(),
    //     attendedit_title: `${user.user_name}/${selectAttendData.attend_date}/${
    //       startChecked === true && endChecked === true ? '출퇴근' : startChecked === true ? '출근' : '퇴근'
    //     }`,
    //     attendapp_user_no: approver.user_no
    //   })
    //   .then(() => {
    //     alter('ㅇ');
    //   });
  }

  // 탭 1. 출/퇴근 수정 목록 조회
  // 목록에서 선택한 수정 데이터 -> 모달창에서 조회
  const [selectAttendEditData, setSelectAttendEditData] = useState({});

  // 데이터를 선택할 때마다 리렌더링
  useEffect(() => {
    if (Object.keys(selectAttendData).length !== 0) {
      setAttendStartDefault('default');
      setAttendEndDefault('default');
      setUpdateStartTime('');
      setUpdateEndTime('');
    }
  }, [selectAttendData]);

  // 모달창 설정
  // 탭 0. 출/퇴근 전체 조회
  const [openAll, setOpenAll] = React.useState(false);
  const handleOpenAll = () => setOpenAll(true);
  const handleCloseAllSave = () => {
    // 모달창 취소 버튼 (데이터 저장 X)
    setOpenAll(false);
    setSelectAttendData(searchAttendData);
    setSearchStartDate('');
    setSearchEndDate('');
  };
  const handleCloseAll = () => {
    // 모달창 확인 버튼 (데이터 저장 O)
    setOpenAll(false);
    setSearchAttendData({});
    setSearchStartDate('');
    setSearchEndDate('');
  };

  // 탭 1. 수정 목록 상세 조회
  const [openRead, setOpenRead] = React.useState(false);
  const handleOpenRead = (data) => {
    setSelectAttendEditData(data);
    setOpenRead(true);
  };
  const handleCloseRead = () => {
    setSelectAttendEditData({});
    setOpenRead(false);
  };

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
  // 1번(user_no) 사용자의 출/퇴근 기록 가져오기
  const [attendDatas, setAttendDatas] = useState([]);
  // 1번(user_no) 사용자의 출/퇴근 수정 기록 가져오기
  const [attendEditDatas, setAttendEditDatas] = useState([]);

  useEffect(() => {
    // 로그인 한 사용자의 전체 출퇴근 내역 조회 (이상 근태 내역은 전체 내역에서 필터링 처리)
    axios.get(`http://localhost:8000/attendance?user_no=${user.user_no}`).then((res) => {
      setAttendDatas(res.data);
    });
    // 로그인 한 사용자의 전체 출퇴근 수정 내역 조회
    axios.get(`http://localhost:8000/attendance_edit_approval?user_no=${user.user_no}`).then((res) => {
      setAttendEditDatas(res.data);
    });
    // 로그인 한 사용자 부서의 근태 담당자 내역 -> 결재자 검색창 autocomplete
    axios.get(`http://localhost:8000/user?dept_no=${user.dept.dept_no}&user_position=${user.user_position}`).then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  // 자동완성
  // 결재자 창에서 검색한 이름
  const [searchName, setSearchName] = useState('');
  // 선택한 결재자 데이터
  const [approver, setApprover] = useState({});

  // 사원선택의 자동완성 창에서 검색어 변경(검색) 될 때마다 searchName 설정
  const handleSelectUser = (event, newValue) => {
    setSearchName(newValue);
  };

  // 아직 사용하지 않은 데이터
  console.log(searchStartDate);
  console.log(searchEndDate);
  console.log(updateStartTime);
  console.log(updateEndTime);
  console.log(approver);
  console.log(reason);

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
                      datas={attendDatas.filter((data) => data.attend_status > 1)}
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
                            <Typography variant="h5">선택된 날짜 없음</Typography>
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
                            <TextField size="small" />
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
                            <Checkbox size="small" checked={startChecked} onChange={handleStartChange} />
                            출근
                            <Checkbox size="small" checked={endChecked} onChange={handleEndChange} />
                            퇴근
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
          <UserAllAttendTable datas={attendDatas} handleMyCard={setSearchAttendData} searchAttendData={searchAttendData} height={'470px'} />
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
                  <Grid item sx={{ mt: 0.3 }}>
                    <Button variant="contained" color="secondary">
                      전체
                    </Button>
                  </Grid>
                  <Grid item>
                    <BasicDatePicker label={'YYYY / MM / DD'} setDate={setSearchStartDate} />
                  </Grid>
                  <Grid item>
                    <BasicDatePicker label={'YYYY / MM / DD'} setDate={setSearchEndDate} />
                  </Grid>
                  <Grid item sx={{ mt: 0.3 }}>
                    <Button variant="contained" color="secondary">
                      조회
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <UpdateAttendTable handleOpenRead={handleOpenRead} datas={attendEditDatas} />
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
                    <Typography>{selectAttendEditData.attendedit_time[0]}</Typography>
                  </Grid>
                  <Grid item xs={3} md={3} lg={3}>
                    <BasicChip label="수정시간(퇴근)" color="#42a5f5" />
                  </Grid>
                  <Grid item xs={9} md={9} lg={9}>
                    <Typography>{selectAttendEditData.attendedit_time[1]}</Typography>
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
                    <Typography>{selectAttendEditData.attendedit_time}</Typography>
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
                <Typography>{selectAttendEditData.attendedit_date}</Typography>
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <BasicChip label="결재자" color="#42a5f5" />
              </Grid>
              <Grid item xs={9} md={9} lg={9}>
                {allUsers.length > 0 && Object.keys(selectAttendEditData).length > 0 && (
                  <Typography>{allUsers.find((a) => a.user_no === selectAttendEditData.attendapp_user_no)?.user_name}</Typography>
                )}
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
            <Button variant="contained" size="medium" onClick={handleCloseRead} sx={{backgroundColor:"#42a5f5"}}>
              닫기
            </Button>
          </Stack>
        </ModalS>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default UserAttendance;
