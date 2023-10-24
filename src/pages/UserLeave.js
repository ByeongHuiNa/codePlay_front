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

const UserLeave = () => {
  const { index, setIndex } = useLeaveTab();
  const [selectedValue, setSelectedValue] = useState('annual');

  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };

  useEffect(() => {
    setIndex(0);
  }, []);

  // 결재 대기 중인 휴가 취소 (바로 취소 가능)
  const leaveCancel = () => {
    alert('취소하시겠습니까?');
  };

  // 결재 완료 된 휴가 취소 신청 (결재 받은 뒤 취소 처리)
  const requestLeaveCancel = () => {
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

  // 날짜 선택창 (연차, 반차, 공가별로 다르게 설정)
  const selectLeave = (event) => {
    setSelectedValue(event.target.value);
  };

  let content;
  if (selectedValue === 'annual') {
    content = (
      <>
        <Box clone mt={2}>
          <MyChip label="시작날짜" />
          <BasicDatePicker sx={{ width: '30px' }} />
        </Box>
        <Box clone mt={2}>
          <MyChip label="종료날짜" />
          <BasicDatePicker sx={{ width: '30px' }} />
        </Box>
      </>
    );
  } else if (selectedValue === 'half') {
    content = (
      <>
        <Box clone mt={2}>
          <MyChip label="날짜" />
          <BasicDatePicker sx={{ width: '30px' }} />
        </Box>
        <Box clone mt={2}>
          <MyChip label="반차 종류" />
          <FormControl sx={{ ml: 1 }}>
            <RadioGroup row>
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
          <BasicDatePicker sx={{ width: '30px' }} />
        </Box>
        <Box clone mt={2}>
          <MyChip label="종료날짜" />
          <BasicDatePicker sx={{ width: '30px' }} />
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
              <LeaveDonutChart series={[12, 4]} />
            </BasicContainer>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} sx={{ overflow: 'auto' }}>
            <BasicContainer>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">결재 대기 내역</Typography>
                </Grid>
              </Grid>
              <UnappLeaveTable leaveCancel={leaveCancel} />
            </BasicContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <BasicContainer>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h5">최근 결재 완료 내역</Typography>
                </Grid>
              </Grid>
              <AppLeaveTable requestLeaveCancel={requestLeaveCancel} handleOpen={handleOpen} />
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
                <TextField label="제목" id="title" size="small" />
              </Box>
              <Box clone mt={2}>
                <MyChip label="결재자" />
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
              <Box clone mt={2}>
                <MyChip label="휴가 종류" />
                <FormControl sx={{ ml: 1 }}>
                  <RadioGroup row value={selectedValue} onChange={selectLeave}>
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
                  id="title"
                  multiline
                  rows={8}
                  sx={{
                    width: '100%'
                  }}
                />
              </Box>
              <Box clone mt={1}>
                <Grid container justifyContent="right" spacing={1}>
                  <Grid item>
                    <Button variant="contained" size="medium">
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
                <TextField label="제목" id="title" size="small" />
              </Box>
              <Box clone mt={2}>
                <MyChip label="결재자" />
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
                />
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
                />
              </Box>
              <Box clone mt={1}>
                <Grid container justifyContent="right" spacing={1}>
                  <Grid item>
                    <Button variant="contained" size="medium">
                      완료
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </BasicContainer>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default UserLeave;
