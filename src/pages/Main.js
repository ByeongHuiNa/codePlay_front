// material-ui
//import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { Avatar, Box, Button, Grid, Link, Typography } from '../../node_modules/@mui/material/index';
import VacationDonutChart from 'components/chart/VacationDonutChart';
import AttendChart from 'components/chart/AttendChart';
import UserLeaveTable from 'components/Table/UserLeaveTable';
import { useProfileState, useTodayState } from 'store/module';
import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';

// ==============================|| 로그인 이후 무조건 들어올 메인페이지 ||============================== //

const Main = () => {
  //화면 초기값 셋팅
  const { profile, setProfile } = useProfileState();

  const { attend, setAttend } = useTodayState();
  

  const [formattedDate, setFormattedDate] = useState();

  const formData = {};

  //출근기록
  const startSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/user-attend-today?user_no=1', formData)
      .then(() => {
        // 출근을 기록한 후 성공적으로 완료됐을 때 실행할 코드
        alert('출근을 기록하였습니다.');
        window.location.reload(); // 페이지 새로고침
      })
      .catch((error) => {
        // 요청이 실패했을 때 실행할 코드
        console.error('에러 발생: ', error);
        // 에러 메시지를 표시하거나 다른 작업을 수행할 수 있습니다.
      });
  };

  //퇴근기록
  const endSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    // 6시 이전에 퇴근 버튼을 누르면 확인 메시지 표시
    if (currentHour < 18) {
      const confirmMessage = "6시 이전에 퇴근하시겠습니까?";
      const userConfirmed = window.confirm(confirmMessage);

      if (!userConfirmed) {
        // 사용자가 취소한 경우
        return;
      }
    }

    axios.patch('/user-attend-today?user_no=1', formData)
      .then(() => {
        // 퇴근을 기록한 후 성공적으로 완료됐을 때 실행할 코드
        alert('퇴근을 기록하였습니다.');
        window.location.reload(); // 페이지 새로고침
      })
      .catch((error) => {
        // 요청이 실패했을 때 실행할 코드
        console.error('에러 발생: ', error);
        // 에러 메시지를 표시하거나 다른 작업을 수행할 수 있습니다.
      });
  };

  useEffect(() => {
    async function get() {
      const endPoints = ['/user-information?user_no=1', '/user-attend-today?user_no=1'];
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      setProfile(result[0].data[0]);
      // const resultAttend = await axios.get('/user-attend-today?user_no=1');
      setAttend(result[1].data[0]);
      // const dateObject = new Date(attend.attend_date);
      // setFormattedDate(dateObject.toLocaleDateString());

      // null 값 검사
      if (attend && attend.attend_date) {
        const dateObject = new Date(attend.attend_date);
        setFormattedDate(
          dateObject.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          })
        );
      }
    }
    get();
  }, [attend]);

  // useEffect(() => {
  //   async function get() {
  //     const endPoints = ['http://localhost:8000/attendance'];
  //     const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
  //     setAttend(result[0].data[0]);
  //     console.log("zz: " + result[0].data[0]);
  //   }
  //   get();
  // }, []);

  // async function postData() {
  //   alert('zz');
  //   try {
  //     //응답 성공
  //     const response = await axios.post('http://localhost:8000/attend', {
  //       start: 'devstone',
  //       end: '12345'
  //     });
  //     alert('성공');
  //     console.log(response);
  //   } catch (error) {
  //     //응답 실패
  //     console.error(error);
  //   }
  // }

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
        <MainCard sx={{ height: '350px' }}>
          <Typography align="left" variant="h5">
            출/퇴근
          </Typography>
          <Box mt={4} mb={4} ml={3}>
            <Grid container justifyContent="center" spacing={1}>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <Typography align="center" color="text.secondary">
                  출근 시간
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} sx={{ paddingRight: 5 }} align="right">
                {attend ? (
                  <Typography variant="text" align="right" sx={{ fontSize: 15 }}>
                    {formattedDate}
                    <br />
                    {attend.attend_start}
                  </Typography>
                ) : (
                  <Typography variant="text" sx={{ fontSize: 15, color: 'error' }}>
                    미출근
                    <br />
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
          <Box my={4} ml={3}>
            <Grid container justifyContent="center" spacing={1}>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <Typography align="center" color="text.secondary">
                  퇴근 시간
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} sx={{ paddingRight: 5 }} align="right">
                {attend ? (
                  <Typography variant="text" sx={{ fontSize: 15 }}>
                    {formattedDate}
                    <br />
                    {attend.attend_end}
                  </Typography>
                ) : (
                  <Typography variant="text" sx={{ fontSize: 15, color: 'error' }}>
                    미퇴근
                    <br />
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container justifyContent="center" spacing={1} sx={{mt:8}}>
              <Grid item >
                <form onSubmit={startSubmit}>
                  <Button variant="outlined" size="large" type="submit">
                    <Box mx={6}>출근</Box>
                  </Button>
                </form>
              </Grid>
              <Grid item>
                <form onSubmit={endSubmit}>
                  <Button variant="contained" size="large" type="submit">
                    <Box mx={6}>퇴근</Box>
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4}>
        <MainCard>
          <Typography align="left" variant="h5">
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
