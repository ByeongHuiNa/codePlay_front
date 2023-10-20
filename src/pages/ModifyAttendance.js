import { useEffect, useState } from 'react';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import {
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '../../node_modules/@mui/material/index';
import BasicContainer from 'components/container/BasicContainer';
import ApprovalTab from 'components/tab/ApprovalTab';
import styled from 'styled-components';
import UserAttendTable from 'components/Table/UserAttendTable';
import { SearchOutlined } from '../../node_modules/@mui/icons-material/index';
import BasicChip from 'components/Chip/BasicChip';
import MainCard from 'components/MainCard';
import BasicTab from 'components/tab/BasicTab';
import TimePicker2 from 'components/DatePicker/TimePicker';
import BasicDatePicker from 'components/DatePicker/BasicDatePicker';
import UserAttendInfoTable from 'components/Table/UserAttendInfoTable';

const ModifyAttendance = () => {
  const [value, setValue] = useState(0); // Tab 부분

  // 선택한 사용자 데이터 값
  const [selectUserData, setSelectUserData] = useState({});

  // 선택한 휴가 데이터 값
  const [selectLeaveData, setSelectLeaveData] = useState({});

  // 선택한 출/퇴근 날짜
  const [selectDate, setSelectDate] = useState('');
  // 선택한 출/퇴근 데이터 값
  const [selectAttendData, setSelectAttendData] = useState({});
  // 테이블에서 데이터 선택 시 selectAttendData에 저장
  const handleMyCard = async (data) => {
    try {
      setSelectAttendData(data);
    } catch (error) {
      console.error('Error Fetching Data : ', error);
    }
  };

  // 출/퇴근 수정 요청 시 라디오 버튼
  // 출/퇴근 수정 요청 시 라디오 출/퇴근 선택
  const [attendKind, setAttendKind] = useState('');
  const handleKindRadioChange = (event) => {
    setAttendKind(event.target.value);
  };
  // 출/퇴근 수정 요청 시 라디오 기본값/직접입력 선택
  const [attendDefault, setAttendDefault] = useState('');
  const handleDefaultRadioChange = (event) => {
    setAttendDefault(event.target.value);
  };

  // 출/퇴근 수정할 시간 선택
  const [updateTime, setUpdateTime] = useState('');

  useEffect(() => {
    if (Object.keys(selectAttendData).length !== 0) {
      setAttendKind('start');
      setAttendDefault('default');
      setUpdateTime('');
      setSelectDate('');
    }
  }, [selectAttendData]);

  useEffect(() => {}, [selectUserData, selectLeaveData]);

  const handleTab = (event, newValue) => {
    setValue(newValue);
    setUpdateTime('');
    setSelectDate('');
    setAttendKind('');
    setAttendDefault('');
    setSelectLeaveData({});
    setSelectAttendData({});
  };

  // Tab 커스텀
  const MyTab = styled(Tab)`
    padding: 3px;
    height: 37px;
    min-height: 37px;
    width: 60px;
    min-width: 60px;
    color: ${(props) => {
      props.index == value ? '#1890ff' : 'black';
    }};
  `;

  const MyTabs = styled(Tabs)`
    padding: 0px;
    height: 37px;
    min-height: 37px;
  `;

  // Card 커스텀
  const MyCard = styled(Card)`
    height: 60px;
    display: flex;
    justify-content: center; // 수평 중앙 정렬
    align-items: center; // 수직 중앙 정렬
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    border: 1px solid #e6ebf1;
    border-radius: 15px;
    width: 100%;
    padding-left: 40px;
  `;

  // 데이터 생성
  function createAttendData(date, startTime, endTime, status) {
    return { date, startTime, endTime, status };
  }

  const attendDatas = [
    createAttendData('2023/10/10', '08:57:10', '18:05:12', 0),
    createAttendData('2023/10/11', '08:57:10', '18:05:12', 0),
    createAttendData('2023/10/16', '08:59:26', '18:21:06', 1),
    createAttendData('2023/10/12', '08:59:26', '18:21:06', 1),
    createAttendData('2023/10/17', '08:50:13', '18:12:58', 2),
    createAttendData('2023/10/13', '08:50:13', '18:12:58', 2),
    createAttendData('2023/10/18', '08:06:35', '18:07:26', 3),
    createAttendData('2023/10/14', '08:06:35', '18:07:26', 3),
    createAttendData('2023/10/19', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/15', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/21', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/22', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/23', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/24', '08:32:57', '18:01:13', 0),
    createAttendData('2023/10/25', '08:32:57', '18:01:13', 0)
  ];

  function createUserData(name, dept, position, email) {
    return { name, dept, position, email };
  }

  const userData = createUserData('이유나', '개발 1팀', '과장', 'endless@naver.com');

  return (
    <ComponentSkeleton>
      <Box clone mx={1}>
        <BasicContainer>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4">근태 현황 수정</Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={3} md={3} lg={3}>
              <Box
                clone
                mt={2.5}
                mb={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <BasicChip label="사원선택" color="gray" />
                <TextField
                  id="searchUser"
                  type="search"
                  size="medium"
                  sx={{
                    width: '190px',
                    marginLeft: '5px'
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
                  onClick={() => {
                    setSelectUserData(userData);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={5} md={5} lg={5}>
              {Object.keys(selectUserData).length !== 0 && (
                <Box mt={1}>
                  <MyCard>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item xs={2} md={2} lg={2}>
                        <Avatar alt="프로필" src="" sx={{ width: 40, height: 40 }} />
                      </Grid>
                      <Grid item xs={2} md={2} lg={2}>
                        <Typography align="center" variant="text" component="span">
                          이름
                        </Typography>
                      </Grid>
                      <Grid item xs={3} md={3} lg={3}>
                        <Typography align="center" variant="text" component="span">
                          부서/직책
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={5} lg={5}>
                        <Typography align="center" variant="text" component="span">
                          010-1234-5678
                        </Typography>
                      </Grid>
                    </Grid>
                  </MyCard>
                </Box>
              )}
            </Grid>
            <Grid item xs={4} md={4} lg={4}></Grid>
          </Grid>
          <Box mt={3} ml={1}>
            <Box sx={{ borderBottom: 1, border: '0px' }}>
              <MyTabs value={value} onChange={handleTab} aria-label="basic tabs example">
                <MyTab label="출/퇴근" index="0" />
                <MyTab label="휴가" index="1" />
              </MyTabs>
            </Box>
            <ApprovalTab value={value} index={0} border={'none'}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={4} md={4} lg={4}>
                  <MainCard sx={{ pt: 2, pr: 2, mr: 1, height: '670px' }} content={false}>
                    <Typography variant="h5" sx={{ mb: 1, pl: 2 }}>
                      근태 내역 {selectDate} {updateTime}
                    </Typography>
                    <UserAttendTable datas={attendDatas} handleMyCard={handleMyCard} />
                  </MainCard>
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                  <Grid container direction="column">
                    <Grid item xs={5} md={5} lg={5} sx={{ mb: 1 }}>
                      <MainCard sx={{ pt: 2, mr: 1, height: '200px' }} content={false}>
                        <Grid container alignItems="center" direction="row" spacing={1} sx={{ pl: 2 }}>
                          <Grid item xs={1.5} md={1.5} lg={1.5}>
                            <Typography variant="h5">날짜 선택</Typography>
                          </Grid>
                          <Grid item xs={4} md={4} lg={4}>
                            <BasicDatePicker setDate={setSelectDate} />
                          </Grid>
                          <Grid item xs={2} md={2} lg={2}>
                            <Button variant="contained">검색</Button>
                          </Grid>
                          <Grid item xs={4.5} md={4.5} lg={4.5}></Grid>
                        </Grid>
                        <Box clone mt={3}>
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
                      <MainCard sx={{ pt: 2, pr: 2, pl: 2, height: '460px' }} content={false}>
                        <Grid container spacing={1} justifyContent="center">
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="h5">출/퇴근 수정</Typography>
                            <Box clone mt={2.5}>
                              <BasicChip label="제목" color="gray" />
                              <TextField size="small" />
                            </Box>
                            <Box clone mt={1.5}>
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
                            <Box clone mt={1.5}>
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
                            <Box clone mt={1.5}>
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
                            <Box clone mt={1.5} mr={1}>
                              <BasicChip label="수정사유" color="gray" />
                              <TextField multiline rows={5} sx={{ width: '84%' }} />
                            </Box>
                            <Stack direction="row" justifyContent="flex-end" mt={2} mr={1.5}>
                              <Button variant="contained">결재완료</Button>
                            </Stack>
                          </Grid>
                        </Grid>
                      </MainCard>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ApprovalTab>
            <BasicTab value={value} index={1}>
              <Grid item xs={5} md={5} lg={5}></Grid>
              <Grid item xs={7} md={7} lg={7}></Grid>
            </BasicTab>
          </Box>
        </BasicContainer>
      </Box>
    </ComponentSkeleton>
  );
};

export default ModifyAttendance;
