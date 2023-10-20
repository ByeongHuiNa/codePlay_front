// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import BasicContainer from 'components/container/BasicContainer';
import MainCard from 'components/MainCard';
import {
  Box,
  Button,
  Card,
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
import RecentAttendTable from '../components/Table/RecentAttendTable';
import AttendUpdateModal from '../components/Modal/AttendUpdateModal';
import UpdateAttendTable from 'components/Table/UpdateAttendTable';
import BasicDatePicker from 'components/DatePicker/BasicDatePicker';
import BasicChip from 'components/Chip/BasicChip';
import styled from 'styled-components';
import { SearchOutlined } from '../../node_modules/@mui/icons-material/index';
import TimePicker2 from 'components/DatePicker/TimePicker';

const UserAttendance = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setUpdateTime('');
    setAttendKind('');
    setAttendDefault('');
    setSelectAttendData({});
  };

  // 수정 데이터 선택
  const [selectAttendData, setSelectAttendData] = useState({});

  // 테이블에서 데이터 선택 시 selectAttendData에 저장
  const handleMyCard = async (data) => {
    try {
      setSelectAttendData(data);
    } catch (error) {
      console.error('Error Fetching Data : ', error);
    }
  };

  // 수정할 시간 선택
  const [updateTime, setUpdateTime] = useState('');

  // 정정 요청 목록 검색 : 시작날짜~종료날짜
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 수정 요청 시 라디오 버튼
  // 수정 요청 시 라디오 출/퇴근 선택
  const [attendKind, setAttendKind] = useState('');
  const handleKindRadioChange = (event) => {
    setAttendKind(event.target.value);
  };
  // 수정 요청 시 라디오 기본값/직접입력 선택
  const [attendDefault, setAttendDefault] = useState('');
  const handleDefaultRadioChange = (event) => {
    setAttendDefault(event.target.value);
  };

  useEffect(() => {
    if (Object.keys(selectAttendData).length !== 0) {
      setAttendKind('start');
      setAttendDefault('default');
      setUpdateTime('');
    }
  }, [selectAttendData]);

  // 모달창 설정
  // 수정 목록 상세 조회
  const [openRead, setOpenRead] = React.useState(false);
  const handleOpenRead = () => setOpenRead(true);
  const handleCloseRead = () => setOpenRead(false);

  const MyCard = styled(Card)`
    height: 50px;
    display: flex;
    // background-color: #e6f3ff;
    justify-content: center; // 수평 중앙 정렬
    align-items: center; // 수직 중앙 정렬
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    border: 1px solid #e6ebf1;
    border-radius: 15px;
    width: 70%;
  `;

  // 데이터 생성
  function createData(date, startTime, endTime, status) {
    return { date, startTime, endTime, status };
  }

  const datas = [
    createData('2023/10/11', '08:57:10', '18:05:12', 0),
    createData('2023/10/12', '08:59:26', '18:21:06', 1),
    createData('2023/10/13', '08:50:13', '18:12:58', 2),
    createData('2023/10/13', '08:50:13', '18:12:58', 2),
    createData('2023/10/14', '08:06:35', '18:07:26', 3),
    createData('2023/10/15', '08:32:57', '18:01:13', 4),
    createData('2023/10/15', '08:32:57', '18:01:13', 4)
  ];

  return (
    <ComponentSkeleton>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="출/퇴근 기록" />
          <Tab label="정정 요청 목록" />
        </Tabs>
      </Box>
      <BasicTab value={value} index={0}>
        <Box clone mx={1} my={1} pb={2}>
          <BasicContainer>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h4">출/퇴근 정정 요청</Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={4} md={4} lg={4}>
                <MainCard sx={{ mt: 2, mr: 1, pt: 2, height: '670px' }} content={false}>
                  <Box  ml={2}>
                  <Typography variant="h5">최근 이상 근태 내역</Typography>
                  </Box>
                  <Box mt={1}>
                    <RecentAttendTable datas={datas} handleMyCard={handleMyCard} />
                  </Box>
                </MainCard>
              </Grid>
              <Grid item xs={8} md={8} lg={8}>
                <MainCard sx={{ mt: 2, pt: 2, pr: 2, pl: 2, height: '670px' }} content={false}>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="h5">출/퇴근 수정</Typography>
                      <Box clone mt={3}>
                        <BasicChip label="제목" color="gray" />
                        <TextField size="small" />
                      </Box>
                      <Box clone mt={2.5}>
                        <BasicChip label="날짜" color="gray" />
                        <TextField
                          label="날짜"
                          id="date"
                          type="search"
                          size="small"
                          sx={{
                            width: '170px'
                          }}
                          defaultValue={selectAttendData.date}
                          key={selectAttendData.date}
                          inputProps={{ readOnly: true }}
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
                      {Object.keys(selectAttendData).length !== 0 && (
                        <>
                          <Box mt={2.5} sx={{ display: 'flex' }}>
                            <BasicChip label="선택날짜" color="gray" />
                            <MyCard>
                              <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs={3} md={3} lg={3} style={{ textAlign: 'center' }}>
                                  {selectAttendData.date}
                                </Grid>
                                <Grid item xs={3} md={3} lg={3} style={{ textAlign: 'center' }}>
                                  <Typography align="center" variant="text" component="span">
                                    {selectAttendData.startTime}
                                  </Typography>
                                </Grid>
                                <Grid item xs={3} md={3} lg={3} style={{ textAlign: 'center' }}>
                                  <Typography align="center" variant="text" component="span">
                                    {selectAttendData.endTime}
                                  </Typography>
                                </Grid>
                                <Grid item xs={3} md={3} lg={3} style={{ textAlign: 'center' }}>
                                  <Typography align="center" variant="text" component="span">
                                    {selectAttendData.status === 0
                                      ? '정상'
                                      : selectAttendData.status === 1
                                      ? '휴가'
                                      : selectAttendData.status === 2
                                      ? '지각'
                                      : selectAttendData.status === 3
                                      ? '조퇴'
                                      : '결근'}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </MyCard>
                          </Box>
                        </>
                      )}
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
          </BasicContainer>
        </Box>
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
                      전체
                    </Button>
                  </Grid>
                  <Grid item>
                    <BasicDatePicker label={'YYYY / MM / DD'} setDate={setStartDate} />
                  </Grid>
                  <Grid item>
                    <BasicDatePicker label={'YYYY / MM / DD'} setDate={setEndDate} />
                  </Grid>
                  <Grid item sx={{ mt: 0.3 }}>
                    <Button variant="contained" color="secondary">
                      조회 {startDate} {endDate} {updateTime}
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
