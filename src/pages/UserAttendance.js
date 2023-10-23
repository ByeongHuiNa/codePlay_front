// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import BasicContainer from 'components/container/BasicContainer';
import MainCard from 'components/MainCard';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField
} from '../../node_modules/@mui/material/index';
import BasicTab from 'components/tab/BasicTab';
import React, { useEffect, useState } from 'react';
import AttendUpdateModal from '../components/Modal/AttendUpdateModal';
import UpdateAttendTable from 'components/Table/UpdateAttendTable';
import BasicDatePicker from 'components/DatePicker/BasicDatePicker';
import BasicChip from 'components/Chip/BasicChip';
import { SearchOutlined, UploadOutlined } from '../../node_modules/@mui/icons-material/index';
import TimePicker2 from 'components/DatePicker/TimePicker';
import UserAllAttendTable from 'components/Table/UserAllAttendTable';
import UserAttendInfoTable from 'components/Table/UserAttendInfoTable';
import styled from 'styled-components';

const UserAttendance = () => {
  // 탭(0.출/퇴근수정, 1.수정요청목록)
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setUpdateTime('');
    setAttendKind('');
    setAttendDefault('');
    setSearchStartDate('');
    setSearchEndDate('');
    setSelectAttendData({});
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
    } catch (error) {
      console.error('Error Fetching Data : ', error);
    }
  };

  // 출/퇴근 수정 폼
  // 수정할 시간
  const [updateTime, setUpdateTime] = useState('');

  // 수정 요청 시 라디오 버튼
  // 수정 요청 시 라디오 : 출/퇴근 선택
  const [attendKind, setAttendKind] = useState('');
  const handleKindRadioChange = (event) => {
    setAttendKind(event.target.value);
  };
  // 수정 요청 시 라디오 : 수정시간 기본값/직접입력 선택
  const [attendDefault, setAttendDefault] = useState('');
  const handleDefaultRadioChange = (event) => {
    setAttendDefault(event.target.value);
  };

  // 데이터를 선택할 때마다 리렌더링
  useEffect(() => {
    if (Object.keys(selectAttendData).length !== 0) {
      setAttendKind('start');
      setAttendDefault('default');
      setUpdateTime('');
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
  const handleOpenRead = () => setOpenRead(true);
  const handleCloseRead = () => setOpenRead(false);

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

  // 더미 데이터 생성
  function createData(date, startTime, endTime, status) {
    return { date, startTime, endTime, status };
  }

  const datas = [
    createData('2023/10/11', '08:57:10', '18:05:12', 0),
    createData('2023/10/12', '09:00:00', '18:00:00', 1),
    createData('2023/10/13', '08:50:13', '18:12:58', 0),
    createData('2023/10/14', '09:50:13', '18:12:58', 2),
    createData('2023/10/15', '08:06:35', '18:07:26', 3),
    createData('2023/10/16', '08:06:35', '18:07:26', 3),
    createData('2023/10/17', '08:32:57', '18:01:13', 4),
    createData('2023/10/18', '08:32:57', '18:01:13', 4),
    createData('2023/10/19', '08:57:10', '18:05:12', 0),
    createData('2023/10/20', '08:59:26', '18:21:06', 1),
    createData('2023/10/21', '08:50:13', '18:12:58', 0),
    createData('2023/10/22', '09:50:13', '18:12:58', 2),
    createData('2023/10/23', '08:57:10', '18:05:12', 0),
    createData('2023/10/24', '08:57:10', '18:05:12', 0),
    createData('2023/10/25', '08:57:10', '18:05:12', 0),
    createData('2023/10/26', '08:57:10', '18:05:12', 0),
    createData('2023/10/27', '09:57:10', '18:05:12', 2),
    createData('2023/10/28', '08:57:10', '17:05:12', 3),
    createData('2023/10/29', '08:57:10', '18:05:12', 0),
    createData('2023/10/30', '08:57:10', '18:05:12', 0),
    createData('2023/10/31', '09:57:10', '18:05:12', 2)
  ];

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
                    <UserAllAttendTable datas={datas.filter((data) => data.status > 1)} handleMyCard={handleMyCard} height={'650px'} />
                  </Box>
                </MainCard>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <Grid container direction="column">
                  <Grid item xs={5} md={5} lg={5}>
                    <MainCard sx={{ pt: 2, mr: 1, height: '150px' }} content={false}>
                      <Grid container alignItems="center" direction="row" spacing={1} sx={{ pl: 2 }}>
                        <Grid item xs={1.5} md={1.5} lg={1.5}>
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
                          <Box clone mt={2.5}>
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
                          <Box clone mt={2.5}>
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
                          <Box clone mt={2.5}>
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
                          <Box clone mt={2.5}>
                            <BasicChip label="증빙 업로드" color="gray" />
                            <Button component="label" variant="contained" size="medium" endIcon={<UploadOutlined />}>
                              파일 선택
                              <VisuallyHiddenInput type="file" />
                            </Button>
                          </Box>
                          <Box clone mt={2.5} mr={1}>
                            <BasicChip label="수정사유" color="gray" />
                            <TextField multiline rows={5} sx={{ width: '84%' }} />
                          </Box>
                          <Stack direction="row" justifyContent="flex-end" mt={2.5} mr={1}>
                            <Button variant="contained">결재완료</Button>
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
          <UserAllAttendTable datas={datas} handleMyCard={setSearchAttendData} height={'470px'} />
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
          <BasicContainer>
            <Grid container>
              <Grid item xs={3} md={3} lg={3}>
                <Typography variant="h4">출/퇴근 정정 요청 목록</Typography>
              </Grid>
              <Grid item xs={9} md={9} lg={9}>
                <Grid container justifyContent="right" spacing={1}>
                  <Grid item sx={{ mt: 0.3 }}>
                    <Button variant="contained" color="secondary">
                      전체 ({searchStartDate} ~ {searchEndDate})
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
                      조회 {updateTime}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <UpdateAttendTable handleOpenRead={handleOpenRead} />
            </MainCard>
          </BasicContainer>
        </Box>

        <AttendUpdateModal open={openRead} handleClose={handleCloseRead}>
          모달창
          <Grid container justifyContent="right" spacing={1}>
            <Grid item>
              <Button variant="contained" size="small" onClick={handleCloseRead}>
                닫기
              </Button>
            </Grid>
          </Grid>
        </AttendUpdateModal>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default UserAttendance;
