// material-ui
//import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { Avatar, Box, Grid, Link, Typography } from '../../node_modules/@mui/material/index';
import VacationDonutChart from 'components/chart/VacationDonutChart';
import AttendChart from 'components/chart/AttendChart';
import UserLeaveTable from 'components/Table/UserLeaveTable';
import {
  useAttendTotalState,
  useLeaveHourState,
  useLeaveState,
  useOverHourState,
  useProfileState,
  useWorkingHourState
} from 'store/module';
import React, { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
import TodayAttendancdForm from 'components/Form/TodayAttendanceForm';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

// ==============================|| 로그인 이후 무조건 들어올 메인페이지 ||============================== //

const Main = () => {
  //화면 초기값 셋팅
  const { profile, setProfile } = useProfileState();
  const { hours, setHours } = useWorkingHourState(); //주간 정상근무시간 일별
  const { leaveHours, setLeaveHours } = useLeaveHourState(); //주간 휴가근무시간 일별
  const { overHours, setOverHours } = useOverHourState(); //주간 초과근무시간 일별

  const [time1, setTime1] = useState([]);
  const [time2, setTime2] = useState([]);
  const [time3, setTime3] = useState([]);
  // const [leaveTime, setLeaveTime] = useState([]);

  //token 값을 decode해주는 코드
  const token = jwtDecode(localStorage.getItem('token').slice(7));

  const { setLeave } = useLeaveState(); //휴가불러오기

  const { setTotal } = useAttendTotalState(); //근무시간 + 연장근무시간 불러오기

  React.useEffect(() => {
    async function get() {
      try {
        const result = await axios.get(`/user-leave?user_no=${token.user_no}`);
        setLeave(result.data);
        const result2 = await axios.get(`/user-attend-total-week?user_no=${token.user_no}`);
        setTotal(result2.data);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    }

    get();
  }, []);

  let navigate = useNavigate();

  function myinfo() {
    navigate('/userinformation');
  }

  function leave() {
    navigate('/userleave');
  }

  useEffect(() => {
    async function get() {
      const endPoints = [`/user-information?user_no=${token.user_no}`];
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      setProfile(result[0].data[0]);
      console.log('토큰사원번호 : ' + token.user_no);

      const result2 = await axios.get(`/user-attend-total?user_no=${token.user_no}`);
      setHours('주간근무1: ' + result2.data);
      console.log('dsadas: ' + hours);

      const result3 = await axios.get(`/user-attend-total-leave?user_no=${token.user_no}`);
      setLeaveHours('주간근무2: ' + result3.data);
      console.log('dsadas: ' + leaveHours);

      const result4 = await axios.get(`/user-attend-total-over?user_no=${token.user_no}`);
      setOverHours('주간근무3 ' + result4.data);
      console.log('dsadas: ' + overHours);

      const currentTime = new Date(); // 현재 시간 가져오기

      const attendTotalArray1 = Array.isArray(result2.data)
        ? result2.data.map((item) => {
            const attendTotal = item.attend_total ? item.attend_total : calculateAttendTotal(item.attend_start, currentTime);
            return {
              attend_total: attendTotal
            };
          })
        : [];

      const attendTotalArray2 = result3.data.map((item) => {
        const attendTotal = item.attend_total ? item.attend_total : 0;
        return {
          attend_total: attendTotal
        };
      });

      const attendTotalArray3 = result4.data.map((item) => {
        const attendTotal = item.attend_total ? item.attend_total : 0;
        return {
          attend_total: attendTotal
        };
      });

      console.log('attendtotal : ' + attendTotalArray1);

      const convertedArray1 = attendTotalArray1.map((item) => {
        if (item.attend_total) {
          const totalParts = item.attend_total.split(':');
          const totalHours = parseInt(totalParts[0], 10);
          const totalMinutes = parseInt(totalParts[1], 10);
          return `${totalHours}.${totalMinutes}`;
        } else {
          // attend_total이 null인 경우 대체값 또는 원하는 처리
          return 0;
        }
      });
      setTime1(convertedArray1);
      console.log('타임1: ' + convertedArray1);

      const convertedArray2 = attendTotalArray2.map((item) => {
        if (item.attend_total) {
          const totalParts = item.attend_total.split(':');
          const totalHours = parseInt(totalParts[0], 10);
          const totalMinutes = parseInt(totalParts[1], 10);
          return `${totalHours}.${totalMinutes}`;
        } else {
          // attend_total이 null인 경우 대체값 또는 원하는 처리
          return 0;
        }
      });
      setTime2(convertedArray2);
      console.log('타임2: ' + convertedArray2);

      const convertedArray3 = attendTotalArray3.map((item) => {
        if (item.attend_total) {
          const totalParts = item.attend_total.split(':');
          const totalHours = parseInt(totalParts[0], 10);
          const totalMinutes = parseInt(totalParts[1], 10);
          return `${totalHours}.${totalMinutes}`;
        } else {
          // attend_total이 null인 경우 대체값 또는 원하는 처리
          return 0;
        }
      });
      setTime3(convertedArray3);
      console.log('타임3: ' + convertedArray3);
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
  const currentDay = now.getDay(); // 현재 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)

  // 현재 주의 월요일 날짜를 계산
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

  // 현재 주의 월요일부터 일요일까지의 날짜를 계산하고 포맷팅
  const daysOfWeek = [];
  const dateOptions = { month: '2-digit', day: '2-digit' };

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const formattedDate = date.toLocaleDateString('ko-KR', dateOptions);
    daysOfWeek.push(formattedDate);
  }
  console.log('일주일: ' + daysOfWeek);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        {Object.keys(profile).length > 0 && (
          <MainCard sx={{ height: '350px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 15px' }}>
              <Typography align="left" variant="h5">
                내 정보
              </Typography>
              <Link variant="h5" onClick={myinfo}>
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
        <TodayAttendancdForm user_no={token.user_no} />
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <MainCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 15px' }}>
            <Typography align="left" variant="h5">
              금주 근무 시간
            </Typography>
          </div>
          <AttendChart
            chart={{
              labels: daysOfWeek,
              series: [
                {
                  name: '정상근무',
                  type: 'column',
                  fill: 'solid',
                  data: time1
                },
                {
                  name: '초과근무',
                  type: 'column',
                  fill: 'solid',
                  data: time3
                },
                {
                  name: '휴가',
                  type: 'column',
                  fill: 'solid',
                  data: time2
                }
              ]
            }}
          />
        </MainCard>
      </Grid>

      <Grid item xs={4}>
        <MainCard style={{ height: '415px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 15px' }}>
            <Typography align="left" variant="h5">
              휴가신청목록
            </Typography>
            <Link variant="h5" onClick={leave}>
              더보기
            </Link>
          </div>
          <UserLeaveTable user_no={token.user_no} />
        </MainCard>
      </Grid>

      <Grid item xs={4}>
        <MainCard sx={{ height: '100%' }}>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 15px', marginBottom: '20px' }}
          >
            <Typography align="left" variant="h5">
              휴가현황
            </Typography>
            <Link variant="h5" onClick={leave}>
              더보기
            </Link>
          </div>
          <VacationDonutChart />
        </MainCard>
      </Grid>

      {/* <Grid item xs={4}>
        <MainCard sx={{ height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: '30px' }}>
            <Typography align="left" variant="h5">
              근무시간
            </Typography>
            <Link variant="h5" onClick={leave}>
              더보기
            </Link>
          </div>
          <WeekAttendDonutChart series={weekTotal} total={12} />
        </MainCard>
      </Grid> */}
    </Grid>
  );
};

export default Main;
