// material-ui
//import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { Avatar, Box, Grid, Link, Typography } from '../../node_modules/@mui/material/index';
import VacationDonutChart from 'components/chart/VacationDonutChart';
import AttendChart from 'components/chart/AttendChart';
import UserLeaveTable from 'components/Table/UserLeaveTable';
import { useProfileState, useWorkingHourState } from 'store/module';
import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
import TodayAttendancdForm from 'components/Form/TodayAttendanceForm';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';

// ==============================|| 로그인 이후 무조건 들어올 메인페이지 ||============================== //

const Main = () => {
  //화면 초기값 셋팅
  const { profile, setProfile } = useProfileState();
  const { hours, setHours } = useWorkingHourState();
  const [time, setTime] = useState([]);

  //token 값을 decode해주는 코드
  const token = jwtDecode(localStorage.getItem('token').slice(7));

  useEffect(() => {
    async function get() {
      console.log(token);
      const endPoints = [`/user-information?user_no=${token.user_no}`];
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      setProfile(result[0].data[0]);

      const result2 = await axios.get(`/user-attend-total?user_no=${token.user_no}`);
      console.log('토큰: ' + token.user_no);
      setHours(result2.data);
      console.log('dsadas: ' + hours);
      const currentTime = new Date(); // 현재 시간 가져오기
      const attendTotalArray = result2.data.map((item) => {
        const attendTotal = item.attend_total ? item.attend_total : calculateAttendTotal(item.attend_start, currentTime);
        return {
          attend_total: attendTotal
        };
      });

      console.log('attendtotal : ' + attendTotalArray);

      const convertedArray = attendTotalArray.map((item) => { ///시간 double형태로 변환 ex(10.1)
        if (item.attend_total) {
          const totalParts = item.attend_total.split(':');
          const totalHours = parseInt(totalParts[0], 10);
          const totalMinutes = parseInt(totalParts[1], 10);
          return `${totalHours}.${totalMinutes}`;
        } else {
          // attend_total이 null인 경우 대체값 또는 원하는 처리
          return '대체값 또는 원하는 처리';
        }
      });
      setTime(convertedArray);
      // const resultAttend = await axios.get('/user-attend-today?user_no=1');

      // const dateObject = new Date(attend.attend_date);
      // setFormattedDate(dateObject.toLocaleDateString());
    }
    get();
  }, []);
  
  function calculateAttendTotal(attendStart, currentTime) {
    const startParts = attendStart.split(':');
    const startHours = parseInt(startParts[0], 10);
    const startMinutes = parseInt(startParts[1], 10);

    const hoursDiff = currentTime.getHours() - startHours;
    const minutesDiff = currentTime.getMinutes() - startMinutes;

    const totalHours = hoursDiff < 0 ? 0 : hoursDiff;
    const totalMinutes = minutesDiff < 0 ? 0 : minutesDiff;

    return `${totalHours}:${totalMinutes}`;
  }
  const now = new Date(); // 현재 날짜와 시간
  const currentDay = now.getDay() - 1; // 현재 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)

  // 현재 주의 월요일 날짜를 계산
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - currentDay);

  // 현재 주의 월요일부터 일요일까지의 날짜를 계산하고 포맷팅
  const daysOfWeek = [];
  const dateOptions = { month: '2-digit', day: '2-digit' };

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const formattedDate = date.toLocaleDateString('ko-KR', dateOptions);
    daysOfWeek.push(formattedDate);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        {Object.keys(profile).length > 0 && (
          <MainCard sx={{ height: '350px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
              <Typography align="left" variant="h5">
                내 정보
              </Typography>
              <Link href="/userInformation" variant="h5">
                더보기
              </Link>
            </div>
            <Box my={2} align="center" sx={{ marginBottom: 5 }}>
              <Avatar alt="프로필" src={profile.user_profile} sx={{ width: 150, height: 150 }} />
            </Box>
            <Typography align="center" variant="h5" component="div">
              {profile.user_name}
            </Typography>
            <Typography align="center" color="text.secondary">
              {`${profile.dept_name}/${profile.user_position}`}
            </Typography>
          </MainCard>
        )}
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <TodayAttendancdForm />
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <MainCard>
          <Typography align="left" variant="h5">
            금주 근무 시간
          </Typography>
          <AttendChart
            chart={{
              labels: daysOfWeek,
              series: [
                {
                  name: '정상근무',
                  type: 'column',
                  fill: 'solid',
                  data: time
                },
                {
                  name: '초과근무',
                  type: 'column',
                  fill: 'solid',
                  data: [0, 0, 0, 0, 0, 0, 0]
                },
                {
                  name: '휴가',
                  type: 'column',
                  fill: 'solid',
                  data: [0, 0, 0, 0, 0, 0, 0]
                }
              ]
            }}
          />
        </MainCard>
      </Grid>

      <Grid item xs={4}>
        <MainCard style={{ height: '415px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
            <Typography align="left" variant="h5">
              휴가신청목록
            </Typography>
            <Link href="/userleave" variant="h5">
              더보기
            </Link>
          </div>
          <UserLeaveTable />
        </MainCard>
      </Grid>

      <Grid item xs={4}>
        <MainCard sx={{ height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: '30px' }}>
            <Typography align="left" variant="h5">
              휴가현황
            </Typography>
            <Link href="/userleave" variant="h5">
              더보기
            </Link>
          </div>
          <VacationDonutChart />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Main;
