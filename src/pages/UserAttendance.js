import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import BasicContainer from 'components/container/BasicContainer';
import MainCard from 'components/MainCard';
import {
  Avatar,
  // Avatar,
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
import React, { useState } from 'react';
import RecentAttendTable from '../components/Table/RecentAttendTable';
import AttendChart from 'components/chart/AttendChart';
import { FormOutlined } from '@ant-design/icons';
import AttendUpdateModal from '../components/Modal/AttendUpdateModal';
import UpdateAttendTable from 'components/Table/UpdateAttendTable';
import BasicDatePicker from 'components/DatePicker/BasicDatePicker';

// ===============================|| Shadow-Box ||=============================== //

function ShadowBox({ shadow, label, color, bgcolor }) {
  return (
    <MainCard border={false} sx={{ bgcolor: bgcolor || 'inherit', boxShadow: shadow }}>
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Typography variant="subtitle1" color={color}>
          {label}
        </Typography>
      </Stack>
    </MainCard>
  );
}

ShadowBox.propTypes = {
  shadow: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  bgcolor: PropTypes.string
};

// ============================|| COMPONENT - SHADOW ||============================ //

const UserAttendance = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 모달창 설정
  // 수정
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  // 수정 목록 상세 조회
  const [openRead, setOpenRead] = React.useState(false);
  const handleOpenRead = () => setOpenRead(true);
  const handleCloseRead = () => setOpenRead(false);

  return (
    <ComponentSkeleton>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="출/퇴근 기록"/>
          <Tab label="정정 요청 목록"/>
        </Tabs>
      </Box>
      <BasicTab value={value} index={0}>
        <Box clone mx={1} pb={1}>
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button variant="contained" onClick={handleOpenUpdate}>
              <FormOutlined />
              <Box clone pl={1}>
                수정요청
              </Box>
            </Button>
          </Stack>
        </Box>
        <Box clone mx={1} pt={1}>
          <BasicContainer>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <Grid sx={{ padding: 2.5 }}>
                  <Typography align="center" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    사원정보
                  </Typography>
                  <Box clone my={2} align="center">
                    <Avatar alt="프로필" src="" sx={{ width: 150, height: 150 }} />
                  </Box>
                  <Typography align="center" variant="h5" component="div">
                    이름
                  </Typography>
                  <Typography align="center" color="text.secondary">
                    직책/부서
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Typography align="center" variant="h5">
                  오늘의 출/퇴근 기록
                </Typography>
                <Box clone mt={4} mb={4} ml={3}>
                  <Grid container justifyContent="center" spacing={1}>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <Typography align="center" color="text.secondary">
                        출근 시간
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} sx={{ paddingRight: 5 }} align="right">
                      <Typography variant="text" align="right" sx={{ fontSize: 15 }}>
                        2023년 10월 12일 목요일
                        <br />
                        오전 11 : 30 : 12
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box clone my={4} ml={3}>
                  <Grid container justifyContent="center" spacing={1}>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                      <Typography align="center" color="text.secondary">
                        퇴근 시간
                      </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} sx={{ paddingRight: 5 }} align="right">
                      <Typography variant="text" sx={{ fontSize: 15 }}>
                        2023년 10월 12일 목요일
                        <br />
                        오전 11 : 30 : 12
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box clone mb={2}>
                  <Grid container justifyContent="center" spacing={1}>
                    <Grid item>
                      <Button variant="outlined" size="large">
                        <Box clone mx={6}>
                          출근
                        </Box>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" size="large">
                        <Box clone mx={6}>
                          퇴근
                        </Box>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5}>
                <Typography align="center" variant="h5">
                  금주 근무 시간
                </Typography>
                <AttendChart
                  chart={{
                    labels: ['10/07', '10/08', '10/09', '10/10', '10/11', '10/12', '10/13'],
                    series: [
                      {
                        name: '정상근무',
                        type: 'column',
                        fill: 'solid',
                        data: [0, 8, 10, 10, 4, 10, 0]
                      },
                      {
                        name: '초과근무',
                        type: 'column',
                        fill: 'solid',
                        data: [4, 0, 1, 1, 0, 1, 0]
                      },
                      {
                        name: '휴가',
                        type: 'column',
                        fill: 'solid',
                        data: [0, 0, 0, 0, 4, 0, 8]
                      }
                    ]
                  }}
                />
              </Grid>
            </Grid>
          </BasicContainer>
        </Box>

        {/* 수정 모달창 */}
        <AttendUpdateModal open={openUpdate} handleClose={handleCloseUpdate}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            autoComplete="off"
          >
            <TextField label="제목" id="title" size="small" />
            <TextField label="결재자" id="approval" size="small" />
            <TextField label="날짜" id="date" size="small" />
            <FormControl>
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                <FormControlLabel value="start" control={<Radio />} label="출근" />
                <FormControlLabel value="end" control={<Radio />} label="퇴근" />
              </RadioGroup>
            </FormControl>
            <Grid container justifyContent="right" spacing={1}>
              <Grid item>
                <Button variant="outlined" size="small" onClick={handleCloseUpdate}>
                  닫기
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" size="small">
                  완료
                </Button>
              </Grid>
            </Grid>
          </Box>
        </AttendUpdateModal>

        <Box clone mx={1} my={1} pb={2}>
          <BasicContainer>
            <Grid item xs={12} md={7} lg={8}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">최근 출근 기록</Typography>
                </Grid>
              </Grid>
              <MainCard sx={{ mt: 2 }} content={false}>
                <RecentAttendTable handleOpenUpdate={handleOpenUpdate} />
              </MainCard>
            </Grid>
          </BasicContainer>
        </Box>
      </BasicTab>
      <BasicTab value={value} index={1}>
        {/* <Container maxWidth="lg"> */}
        <Box clone mx={1} my={1} pb={2}>
          <BasicContainer>
            <Grid container>
              <Grid item xs={6} md={6} lg={6}>
                <Typography variant="h5">출/퇴근 정정 요청 목록</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <Grid container justifyContent="right" spacing={1}>
                  <Grid item sx={{ mt: 0.3 }}>
                    <Button variant="contained" color="secondary">
                      전체
                    </Button>
                  </Grid>
                  <Grid item>
                    <BasicDatePicker />
                  </Grid>
                  <Grid item sx={{ mt: 0.3 }}>
                    <Button variant="contained" color="secondary">
                      결재대기
                    </Button>
                  </Grid>
                  <Grid item sx={{ mt: 0.3 }}>
                    <Button variant="contained" color="secondary">
                      결재완료
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
        {/* 수정 조회 모달창 */}
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
