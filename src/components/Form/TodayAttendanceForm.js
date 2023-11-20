import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '../../../node_modules/@mui/material/index';
import MainCard from 'components/MainCard';
import { useTodayState } from 'store/module';
import axios from '../../../node_modules/axios/index';

// ============================|| LOGIN FORM ||============================ //

const TodayAttendancdForm = ({ user_no }) => {
  const { attend, setAttend } = useTodayState();

  const [formattedDate, setFormattedDate] = useState();

  const [policy, setPolicy] = useState({});

  //const [ip, setIp] = useState();

  const formData = {};

  // 시간을 09:00 형식으로 변환하는 함수
  // const formatTime = (time) => {
  //   const date = new Date(`0000-01-01T${time}`);
  //   return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  // };

  // 함수를 밖으로 빼서 재사용 가능하도록 설정
  const getAttendanceData = async () => {
    const result = await axios.get(`/user-attend-today?user_no=${user_no}`);
    setAttend(result.data[0]);

    // null 값 검사
    if (result.data[0] && result.data[0].attend_date) {
      const dateObject = new Date(result.data[0].attend_date);
      setFormattedDate(
        dateObject.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
        })
      );
    }
  };
  //사용자정책 가져오는 함수

  // 시간을 09:00 형식의 문자열로 변환하는 함수
  const formatTime = (time) => {
    // const date = new Date(`0000-01-01T${time}`);
    // const formattedTime = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    console.log('타임:  ' + time);
    return time.substring(5, 10); // 앞의 5자리만 반환 (hh:mm 형식으로)
  };

  useEffect(() => {
    console.log('토큰사원번호(출근폼): ' + user_no);
    getAttendanceData();

    async function get() {
      const result = await axios.get(`/user-policy-detail?user_no=${user_no}`);
      setPolicy(result.data[0]);
      console.log('사용자정책: ' + policy.policy_no);
    }
    get();

    // axios.get('https://geolocation-db.com/json/').then((res) => {
    //   setIp(res.data.IPv4);
    // });
  }, []);

  //출근기록
  const startSubmit = (e) => {
    e.preventDefault();

    if (attend && attend.attend_date) {
      alert('이미 출근을 기록하였습니다.');
      return; // 이미 출근한 경우 함수를 종료합니다.
    }
    //console.log('아이피주소는: ' + ip);

    axios
      .post(`/user-attend-today?user_no=${user_no}`, formData)
      .then(() => {
        alert('출근을 기록하였습니다.');
        getAttendanceData();
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

    if (attend && attend.attend_end) {
      alert('이미 퇴근을 기록하였습니다.');
      return; // 이미 퇴근한 경우 함수를 종료합니다.
    }

    //const currentDate = new Date();
    //const currentHour = currentDate.getHours();

    // // 6시 이전에 퇴근 버튼을 누르면 확인 메시지 표시
    // if (currentHour < 18) {
    //   const confirmMessage = '6시 이전에 퇴근하시겠습니까?';
    //   const userConfirmed = window.confirm(confirmMessage);

    //   if (!userConfirmed) {
    //     // 사용자가 취소한 경우
    //     return;
    //   }
    // }

    axios
      .patch(`/user-attend-today?user_no=${user_no}`, formData)
      .then(() => {
        // 퇴근을 기록한 후 성공적으로 완료됐을 때 실행할 코드
        alert('퇴근을 기록하였습니다.');
        getAttendanceData();
      })
      .catch((error) => {
        // 요청이 실패했을 때 실행할 코드
        console.error('에러 발생: ', error);
        // 에러 메시지를 표시하거나 다른 작업을 수행할 수 있습니다.
      });
  };

  return (
    <MainCard sx={{ height: '350px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 15px' }}>
        <Typography align="left" variant="h5">
          출/퇴근
        </Typography>
        {formattedDate}
      </div>

      <Box mt={4} mb={4} ml={3}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={3} sm={3} md={3} lg={3}>
            <Typography align="center" color="text.secondary">
              출퇴근 정책
            </Typography>
          </Grid>
          <Grid item xs={8} sm={8} md={8} lg={8} sx={{ paddingRight: 5 }} align="right">
            {policy.standard_start_time ? formatTime(policy.standard_start_time) : ''} ~{' '}
            {policy.standard_end_time ? formatTime(policy.standard_end_time) : ''}
          </Grid>
        </Grid>
      </Box>
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
        <Grid container justifyContent="center" spacing={1} sx={{ mt: 3 }}>
          <Grid item>
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
  );
};

export default TodayAttendancdForm;
