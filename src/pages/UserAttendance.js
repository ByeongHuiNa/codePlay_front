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
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField
} from '../../node_modules/@mui/material/index';
import BasicTab from 'components/tab/BasicTab';
import React, { useState } from 'react';
import RecentAttendTable from '../components/Table/RecentAttendTable';
import AttendUpdateModal from '../components/Modal/AttendUpdateModal';
import UpdateAttendTable from 'components/Table/UpdateAttendTable';
import BasicDatePicker from 'components/DatePicker/BasicDatePicker';
import BasicChip from 'components/Chip/BasicChip';
import styled from 'styled-components';

const UserAttendance = () => {
  const [value, setValue] = useState(0);

  // 정정 요청 목록 검색 : 시작날짜~종료날짜
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 모달창 설정
  // 수정 목록 상세 조회
  const [openRead, setOpenRead] = React.useState(false);
  const handleOpenRead = () => setOpenRead(true);
  const handleCloseRead = () => setOpenRead(false);

  const MyCard = styled(Card)`
    height: 50px;
    display: flex;
    background-color: #e6f3ff;
    justify-content: center; // 수평 중앙 정렬
    align-items: center; // 수직 중앙 정렬
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    border: 1px solid #e6ebf1;
    border-radius: 15px;
    width: 100%;
    margin-bottom: 30px;
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
    createData('2023/10/13', '08:50:13', '18:12:58', 2),
    createData('2023/10/13', '08:50:13', '18:12:58', 2),
    createData('2023/10/13', '08:50:13', '18:12:58', 2),
    createData('2023/10/13', '08:50:13', '18:12:58', 2),
    createData('2023/10/14', '08:06:35', '18:07:26', 3),
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
              <Grid item xs={6} md={6} lg={6}>
                <MainCard sx={{ mt: 2, mr: 1, pt: 2, pl: 2, height: '670px' }} content={false}>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <MyCard>
                        <Typography variant="h5">최근 출/퇴근</Typography>
                      </MyCard>
                    </Grid>
                  </Grid>
                  <RecentAttendTable datas={datas} />
                </MainCard>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <MainCard sx={{ mt: 2, pt: 2, height: '670px' }} content={false}>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <MyCard>
                        <Typography variant="h5">출/퇴근 수정</Typography>
                      </MyCard>
                      <Box clone mt={2}>
                        <BasicChip label="제목" color="gray" />
                        <TextField
                        // size="small"
                        // defaultValue={selectLeaveData.leaveTitle}
                        // key={selectLeaveData.leaveTitle}
                        // inputProps={{ readOnly: true }}
                        // sx={{ width: '40%' }}
                        />
                      </Box>
                      <Box clone mt={2}>
                        <BasicChip label="사용자" color="gray" />
                        <TextField
                        // size="small"
                        // defaultValue={selectLeaveData.leaveUser}
                        // key={selectLeaveData.leaveUser}
                        // inputProps={{ readOnly: true }}
                        // sx={{ width: '20%' }}
                        />
                      </Box>
                      <Box clone mt={2}>
                        <BasicChip label="휴가 종류" color="gray" />
                        <TextField
                        // size="small"
                        // defaultValue={selectLeaveData.leaveKind}
                        // key={selectLeaveData.leaveKind}
                        // inputProps={{ readOnly: true }}
                        // sx={{ width: '20%' }}
                        />
                      </Box>
                      <Box clone mt={2}>
                        <BasicChip label="연차 기간" color="gray" />
                        <TextField
                        // size="small"
                        // defaultValue={`${selectLeaveData.leaveStart} ~ ${selectLeaveData.leaveEnd}`}
                        // key={selectLeaveData.leaveStart}
                        // inputProps={{ readOnly: true }}
                        // sx={{ width: '40%' }}
                        />
                      </Box>
                      <Box clone mt={2}>
                        <BasicChip label="반차 시간" color="gray" />
                        <TextField
                        // size="small"
                        // defaultValue={`${selectLeaveData.leaveStart} ${selectLeaveData.halfKind == 0 ? '오전' : '오후'}`}
                        // key={selectLeaveData.leaveKind}
                        // inputProps={{ readOnly: true }}
                        // sx={{ width: '40%' }}
                        />
                      </Box>
                      <Box clone mt={2}>
                        <BasicChip label="휴가 사유" color="gray" />
                        <TextField
                          multiline
                          rows={3}
                          // defaultValue={selectLeaveData.leaveReason}
                          // key={selectLeaveData.leaveReason}
                          // inputProps={{ readOnly: true }}
                          // sx={{ width: '70%' }}
                        />
                      </Box>
                      <Box clone mt={2}>
                        <BasicChip label="결재 상태" color="gray" />
                        <TextField
                        // size="small"
                        // defaultValue={selectLeaveData.status == 0 ? '승인' : '반려'}
                        // key={selectLeaveData.status}
                        // inputProps={{ readOnly: true }}
                        // sx={{ width: '20%' }}
                        />
                      </Box>
                      <MainCard sx={{ mt: 2, p: 1, pt: 1.5, width: '91%', justifyContent: 'center', alignItems: 'center' }} content={false}>
                        <FormControl sx={{ ml: 1 }}>
                          <RadioGroup
                            row
                            sx={{ justifyContent: 'center', alignItems: 'center' }}
                            // value={appLeaveStatus}
                            // onChange={handleLeaveRadioChange}
                          >
                            <FormControlLabel value="leaveApp" control={<Radio size="small" />} label="승인" />
                            <FormControlLabel value="leaveUnapp" control={<Radio size="small" />} label="반려" />
                          </RadioGroup>
                        </FormControl>
                        <TextField label="반려 사유" size="small" sx={{ width: '66%' }} />
                      </MainCard>
                      <Stack direction="row" justifyContent="flex-end" mt={1} mr={6}>
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
                      조회 {startDate} {endDate}
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
