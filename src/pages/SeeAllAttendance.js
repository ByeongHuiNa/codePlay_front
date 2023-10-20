import { Typography, Box, Grid, Tab, Tabs } from '@mui/material';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import { FormControl, IconButton, InputLabel, NativeSelect, TextField } from '../../node_modules/@mui/material/index';

import VacationCountTable from 'components/Table/VacationCountTable';
import AttendanceDayTable from 'components/Table/AttendanceDayTable';
import AttendanceWeekTable from 'components/Table/AttendanceWeekTable';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import BasicTab from 'components/tab/BasicTab';
import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';

const SeeAllAttendance = () => {
  const [dept, setDept] = useState('');
  const handleChange2 = (event) => {
    setDept(event.target.value);
  };
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange3 = (event, newValue) => {
    setValue2(newValue);
  };

  const [date, setDate] = useState(new Date('2023-10-16'));
  const [currentDate, setCurrentDate] = useState(new Date('2023-10-16'));

  const [currentWeek, setCurrentWeek] = useState(0);

  const handlePrevDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7); // 7일을 빼면 1주를 뺀다
    setCurrentDate(newDate);

    // 주차를 갱신
    setCurrentWeek(currentWeek - 1);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7); // 7일을 더하면 1주를 더한다
    setCurrentDate(newDate);

    // 주차를 갱신
    setCurrentWeek(currentWeek + 1);
  };
  useEffect(() => {
    // 현재 날짜를 가져오고 그 날짜의 주차를 계산
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((now - startOfYear) / 86400000 + 1) / 7);
    setCurrentWeek(weekNumber);
  }, []);

  return (
    <ComponentSkeleton>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="휴가" />
          <Tab label="출/퇴근" />
        </Tabs>
      </Box>

      <BasicTab value={value} index={0}>
        <Grid item xs={12} sm={6} md={5} lg={7}>
          <MainCard>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h5">{dept ? `${dept} 부서 출/퇴근 현황` : '개발 부서 휴가보유 현황 '}</Typography>
              <FormControl sx={{ marginLeft: 3 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  부서
                </InputLabel>
                <NativeSelect
                  onChange={handleChange2}
                  inputProps={{
                    name: 'month',
                    id: 'uncontrolled-native'
                  }}
                >
                  <option value={'개발'}>개발부서</option>
                  <option value={'인사'}>인사부서</option>
                  <option value={'회계'}>회계부서</option>
                </NativeSelect>
              </FormControl>
            </Grid>

            <TextField
              id="outlined-basic"
              label="직책명"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="outlined-basic"
              label="사원명"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />

            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <VacationCountTable />
          </MainCard>
        </Grid>
      </BasicTab>

      <BasicTab value={value} index={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value2} onChange={handleChange3} aria-label="basic tabs example">
            <Tab label="일별" />
            <Tab label="주간" />
          </Tabs>
        </Box>
        <BasicTab value={value2} index={0}>
          <Grid item xs={12} sm={6} md={5} lg={7}>
            <MainCard>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={handlePrevDay} aria-label="이전 날짜">
                  <ArrowBackIosNewOutlinedIcon />
                </IconButton>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                  {date.toLocaleDateString()}
                </Typography>

                <IconButton onClick={handleNextDay} aria-label="다음 날짜">
                  <ArrowForwardIosOutlinedIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                  {dept ? `${dept} 부서 출/퇴근 현황` : '개발 부서 출/퇴근 현황 '}
                </Typography>
                <FormControl sx={{ marginLeft: 3 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  부서
                </InputLabel>
                <NativeSelect
                  onChange={handleChange2}
                  inputProps={{
                    name: 'month',
                    id: 'uncontrolled-native'
                  }}
                >
                  <option value={'개발'}>개발</option>
                  <option value={'인사'}>인사</option>
                  <option value={'회계'}>회계</option>
                </NativeSelect>
              </FormControl>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container xs={9} rowSpacing={4} columnSpacing={2.75}>
                  <Grid item xs={3}>
                    <MainCard>
                      <Typography variant="h4" align="center">
                        전체
                      </Typography>
                      <Typography variant="h4" align="center">
                        5건
                      </Typography>
                    </MainCard>
                  </Grid>
                  <Grid item xs={3}>
                    <MainCard>
                      <Typography variant="h4" align="center">
                        정상
                      </Typography>
                      <Typography variant="h4" align="center">
                        1건
                      </Typography>
                    </MainCard>
                  </Grid>
                  <Grid item xs={3}>
                    <MainCard>
                      <Typography variant="h4" align="center">
                        근태이상
                      </Typography>
                      <Typography variant="h4" align="center">
                        3건
                      </Typography>
                    </MainCard>
                  </Grid>
                  <Grid item xs={3}>
                    <MainCard>
                      <Typography variant="h4" align="center">
                        휴가
                      </Typography>
                      <Typography variant="h4" align="center">
                        1건
                      </Typography>
                    </MainCard>
                  </Grid>
                </Grid>
              </div>
              <AttendanceDayTable />
            </MainCard>
          </Grid>
        </BasicTab>
        <BasicTab value={value2} index={1}>
          <Grid item xs={12} sm={6} md={5} lg={7}>
            <MainCard>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={handlePrevWeek} aria-label="이전 날짜">
                  <ArrowBackIosNewOutlinedIcon />
                </IconButton>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                  {currentDate.toLocaleDateString()} {currentWeek}주
                </Typography>
                <IconButton onClick={handleNextWeek} aria-label="다음 날짜">
                  <ArrowForwardIosOutlinedIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ textAlign: 'center'}}>
                  {dept ? `${dept} 부서 출/퇴근 현황` : '개발 부서 출/퇴근 현황 '}
                </Typography>
                <FormControl sx={{ marginLeft: 3 }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  부서
                </InputLabel>
                <NativeSelect
                  onChange={handleChange2}
                  inputProps={{
                    name: 'month',
                    id: 'uncontrolled-native'
                  }}
                >
                  <option value={'개발'}>개발</option>
                  <option value={'인사'}>인사</option>
                  <option value={'회계'}>회계</option>
                </NativeSelect>
              </FormControl>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container xs={9} rowSpacing={4} columnSpacing={2.75}>
                  <Grid item xs={3}>
                    <MainCard>
                      <Typography variant="h4" align="center">
                        전체
                      </Typography>
                      <Typography variant="h4" align="center">
                        5건
                      </Typography>
                    </MainCard>
                  </Grid>
                  <Grid item xs={3}>
                    <MainCard>
                      <Typography variant="h4" align="center">
                        정상
                      </Typography>
                      <Typography variant="h4" align="center">
                        1건
                      </Typography>
                    </MainCard>
                  </Grid>
                  <Grid item xs={3}>
                    <MainCard>
                      <Typography variant="h4" align="center">
                        근태이상
                      </Typography>
                      <Typography variant="h4" align="center">
                        3건
                      </Typography>
                    </MainCard>
                  </Grid>
                  <Grid item xs={3}>
                    <MainCard>
                      <Typography variant="h4" align="center">
                        휴가
                      </Typography>
                      <Typography variant="h4" align="center">
                        1건
                      </Typography>
                    </MainCard>
                  </Grid>
                </Grid>
              </div>
              <AttendanceWeekTable />
            </MainCard>
          </Grid>
        </BasicTab>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default SeeAllAttendance;
