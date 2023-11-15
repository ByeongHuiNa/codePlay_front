import { Typography, Box, Grid, Tab, Tabs } from '@mui/material';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import { IconButton } from '../../node_modules/@mui/material/index';

import VacationCountTable from 'components/Table/VacationCountTable';
import AttendanceDayTable from 'components/Table/AttendanceDayTable';
import AttendanceWeekTable from 'components/Table/AttendanceWeekTable';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import BasicTab from 'components/tab/BasicTab';

import { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';

import axios from '../../node_modules/axios/index';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';
import { useProfileState } from 'store/module';

const SeeAllAttendance = () => {
  //const [userInput, setUserInput] = useState(''); //사원검색창 입력값

  const [depts, setDepts] = useState([]); //부서목록

  const { profile, setProfile } = useProfileState();

  

  //token 값을 decode해주는 코드
  const token = jwtDecode(localStorage.getItem('token').slice(7));
  console.log('token@@@: ' + token.dept_no);

  // const getValue = (e) => {
  //   setUserInput(e.target.value.toLowerCase());
  // };

  //const [dept, setDept] = useState('');
  // const handleChange2 = (event) => {
  //   setDept(event.target.value);
  // };
  // const handleChange4 = (event) => {
  //   setSelectedDept(event.target.value);
  // };
  // const [selectedDept, setSelectedDept] = useState(0); //선택한부서번호
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange3 = (event, newValue) => {
    setValue2(newValue);
  };

  const [date, setDate] = useState(() => new Date().toLocaleDateString()); //일별 근태에서 씀
  //const [filterDate, setFilterDate] = useState(() => date.toLocaleDateString());
  const [currentDate, setCurrentDate] = useState(new Date()); //주별 근태에서 씀

  const [currentWeek, setCurrentWeek] = useState(0); //몇주인지 나타냄

  const [mon, setMon] = useState(''); //주별 월요일 날짜를 받기위해 씀

  const handlePrevDay = () => { //어제날짜
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate.toLocaleDateString());
    //setFilterDate(date);
  };

  const handleNextDay = () => { //내일날짜
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate.toLocaleDateString());
    //setFilterDate(date);
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7); // 7일을 빼면 1주를 뺀다
    //setCurrentDate(newDate.getFormattedMonday());
    setCurrentDate(newDate);
    //setMon(getFormattedMonday());

    // 주차를 갱신
    setCurrentWeek(currentWeek - 1);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7); // 7일을 더하면 1주를 더한다
    //setCurrentDate(newDate.getFormattedMonday());
    setCurrentDate(newDate);
    //setMon(getFormattedMonday());
    
    // 주차를 갱신
    setCurrentWeek(currentWeek + 1);
  };

  const getFormattedMonday = () => {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  //let monday = new Date();
  useEffect(() => {
    // 현재 날짜를 가져오고 그 날짜의 주차를 계산
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((now - startOfYear) / 86400000 + 1) / 7);

   
    //monday.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));

    // setCurrentDate를 사용하여 상태를 업데이트
    //setCurrentDate(monday);
    // console.log('이번주의 월요일 : ' + currentDate.toLocaleDateString());

    // console.log('이번주의 월요일2 : ' + getFormattedMonday());
    setCurrentWeek(weekNumber);
    setMon(getFormattedMonday());
    async function get() {
      const endPoints = [`/user-information?user_no=${token.user_no}`];
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      setProfile(result[0].data[0]);
    }

    const fetchData = async () => {
      try {
        const result = await axios.get('/see-all-dept');
        setDepts(result.data);
        console.log('depts: ' + depts);
      } catch (error) {
        console.error('Error fetching department data:', error);
      }
    };

    fetchData();
    get();
  }, [currentWeek]);

  return (
    <ComponentSkeleton>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="휴가" />
          <Tab label="출/퇴근" />
        </Tabs>
      </Box>

      <BasicTab value={value} index={0}>
        <Grid container>
          <Grid item xs={6}>
            <MainCard>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h5">
                  {profile.dept_name ? `${profile.dept_name} 부서 휴가보유 현황` : '부서 휴가보유 현황 '}
                </Typography>
                {/* <FormControl sx={{ marginLeft: 3 }}>
                  <NativeSelect
                    onChange={handleChange4}
                    inputProps={{
                      name: 'dept_no',
                      id: 'uncontrolled-native'
                    }}
                  >
                    {depts.map((dept) => (
                      <option key={dept.dept_no} value={dept.dept_no}>
                        {dept.dept_name}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl> */}
              </Grid>

              {/* <TextField
                value={userInput}
                onChange={getValue}
                id="outlined-basic"
                label="사원명"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              /> */}

              {/* <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton> */}
              <VacationCountTable depts={token.dept_no} />
            </MainCard>
          </Grid>
          <Grid item xs={6}>
            <MainCard></MainCard>
          </Grid>
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
                  {date}
                </Typography>

                <IconButton onClick={handleNextDay} aria-label="다음 날짜">
                  <ArrowForwardIosOutlinedIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                  <Typography variant="h5">{profile.dept_name ? `${profile.dept_name} 일별 근태 현황` : ' 일별 근태 현황 '}</Typography>
                </Typography>
                {/* <FormControl sx={{ marginLeft: 3 }}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    부서
                  </InputLabel>
                  <NativeSelect
                    onChange={handleChange4}
                    inputProps={{
                      name: 'dept_no',
                      id: 'uncontrolled-native'
                    }}
                  >
                     {depts.map((dept) => (
                      <option key={dept.dept_no} value={dept.dept_no}>
                        {dept.dept_name}
                      </option>
                    ))}
                    
                  </NativeSelect>
                </FormControl> */}
              </div>

              <AttendanceDayTable depts={token.dept_no} filterDate={date} />
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
                  {mon} {currentWeek}주
                </Typography>
                <IconButton onClick={handleNextWeek} aria-label="다음 날짜">
                  <ArrowForwardIosOutlinedIcon />
                </IconButton>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                  <Typography variant="h5">{profile.dept_name ? `${profile.dept_name} 주간 근태 현황` : '주간 근태 현황 '}</Typography>
                </Typography>
                {/* <FormControl sx={{ marginLeft: 3 }}>
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
                </FormControl> */}
              </div>

              <AttendanceWeekTable depts={token.dept_no} filterDate={mon} />
            </MainCard>
          </Grid>
        </BasicTab>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default SeeAllAttendance;
