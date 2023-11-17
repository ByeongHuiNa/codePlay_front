// material-ui
import { Typography, Grid, Tabs, Tab, Box } from '@mui/material';
//import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// project import
import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import LeaveModal from 'components/Modal/LeaveModal';

// material-ui

import BasicTab from 'components/tab/BasicTab';
import AttendanceTable from 'components/Table/AttendanceTable';
import AppLeaveTotalTable from 'components/Table/AppLeaveTotalTable';
import VacationDonutChart from 'components/chart/VacationDonutChart';
import UnappLeaveTotalTable from 'components/Table/UnappLeaveTotalTable';
import { FormControl, MenuItem, TextField } from '../../node_modules/@mui/material/index';
import AttendChart from 'components/chart/AttendChart';
import axios from '../../node_modules/axios/index';
import {
  useAttendTotalOverState,
  useAttendTotalState,
  useLeaveHourState,
  useLeaveState,
  useOverHourState,
  useWorkingHourState
} from 'store/module';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';
import { useLocation } from '../../node_modules/react-router-dom/dist/index';
import WeekAttendDonutChart from 'components/chart/WeekAttendDonutChart';

const UserAttendanceTotalPage = () => {
  const location = useLocation();

  const { hours, setHours } = useWorkingHourState(); //주간 정상근무시간 일별
  const { leaveHours, setLeaveHours } = useLeaveHourState(); //주간 휴가근무시간 일별
  const { overHours, setOverHours } = useOverHourState(); //주간 초과근무시간 일별

  //결재대기 내역 이번달로 설정
  //const [month1, setMonth1] = useState(new Date().getMonth() + 1);
  //결재완료 내역 이번달로 설정
  const [month2, setMonth2] = useState(new Date().getMonth() + 1);

  //const { hours, setHours } = useWorkingHourState();

  //token 값을 decode해주는 코드
  const token = jwtDecode(localStorage.getItem('token').slice(7));
  console.log('token@@@: ' + token.user_no);

  //const [time, setTime] = useState([]);
  const [time1, setTime1] = useState([]);
  const [time2, setTime2] = useState([]);
  const [time3, setTime3] = useState([]);
  //const [weekTotal, setWeekTotal] = useState([0, 0]);

  const { total, setTotal } = useAttendTotalState(); //한주의 정규근무시간 불러오기
  const { overTotal, setOverTotal } = useAttendTotalOverState(); //한주의 정규근무시간 불러오기

  React.useEffect(() => {
    console.log('try');
    async function get() {
      try {
        axios
          .get(`/user-attend-total-week?user_no=${token.user_no}`)
          .then((response) => {
            console.log(response.data);
            const result2 = response.data;
            const defaultObject = {
              // 기본 객체의 필드 및 값들을 정의합니다.
              // 예시로 빈 값으로 설정
              attend_total: '00:00:00'

              // ...
            };

            setTotal(result2 || defaultObject);
          })
          .catch((error) => {
            // 에러 처리
            console.error('Error fetching data:', error);
          });
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    }
    async function get1() {
      try {
        axios
          .get(`/user-attend-total-week-over?user_no=${token.user_no}`)
          .then((response) => {
            console.log(response.data);
            const result2 = response.data;
            const defaultObject = {
              // 기본 객체의 필드 및 값들을 정의합니다.
              // 예시로 빈 값으로 설정
              attend_total: '00:00:00'

              // ...
            };

            setOverTotal(result2 || defaultObject);
          })
          .catch((error) => {
            // 에러 처리
            console.error('Error fetching data:', error);
          });
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    }

    get();
    get1();
  }, []);
  useEffect(() => {
    const endPoints = [];
    console.log('token@@@: ' + token.user_no);
    //console.log('사원유저번호: ' + location.state.user_no);
    if (location.state == null) {
      endPoints.push(`/user-attend-total?user_no=${token.user_no}`);
    } else {
      endPoints.push(`/user-attend-total?user_no=${location.state.user_no}`);
    }

    async function get() {
      // const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      // //const result = await axios.get(`/user-attend-total?user_no=${token.user_no}`);
      // setHours(result[0].data);
      // console.log('dsadas: ' + hours);
      const currentTime = new Date(); // 현재 시간 가져오기
      // const attendTotalArray = result[0].data.map((item) => {
      //   const attendTotal = item.attend_total ? item.attend_total : calculateAttendTotal(item.attend_start, currentTime);
      //   return {
      //     attend_total: attendTotal
      //   };
      // });
      // console.log('attendtotal : ' + attendTotalArray);

      // const convertedArray = attendTotalArray.map((item) => {
      //   if (item.attend_total) {
      //     const totalParts = item.attend_total.split(':');
      //     const totalHours = parseInt(totalParts[0], 10);
      //     const totalMinutes = parseInt(totalParts[1], 10);
      //     return `${totalHours}.${totalMinutes}`;
      //   } else {
      //     // attend_total이 null인 경우 대체값 또는 원하는 처리
      //     return '대체값 또는 원하는 처리';
      //   }
      // });
      // //setTime(convertedArray);

      // console.log('convert: ' + convertedArray);
      const result2 = await axios.get(`/user-attend-total?user_no=${token.user_no}`);
      setHours('주간근무1: ' + result2.data);
      console.log('주간근무1: : ' + hours);

      const result3 = await axios.get(`/user-attend-total-leave?user_no=${token.user_no}`);
      setLeaveHours('주간근무2: ' + result3.data);
      console.log('주간근무2 : ' + leaveHours);

      const result4 = await axios.get(`/user-attend-total-over?user_no=${token.user_no}`);
      setOverHours('주간근무3 ' + result4.data);
      console.log('주간근무3:  ' + overHours);

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

      // // const result3 = axios.get(`/user-attend-total-week?user_no=${token.user_no}`);
      // const attendData = result3.data;

      // // attend_total에서 시간을 추출
      // const totalHours = parseInt(attendData.attend_total.split(':')[0]);
      // console.log("attend_total: " + attendData.attendDate);
      // const totalMinutes = parseInt(attendData.attend_total.split(':')[1]);

      // // 시간과 분을 합하여 8시 0분 형식으로 변환
      // const formattedTotal = `${totalHours}.${totalMinutes}`;
      // setWeekTotal([0, (formattedTotal / 40) * 100]);
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
  const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' };

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const formattedDate = date.toLocaleDateString('ko-KR', dateOptions);
    daysOfWeek.push(formattedDate);
  }

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

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const month1Change = (event) => {
  //   setMonth1(event.target.value);
  // };

  const month2Change = (event) => {
    setMonth2(event.target.value);
  };

  const [month3, setMonth3] = useState(new Date().getMonth() + 1); //출퇴근현황 현재달

  const month3Change = (event) => {
    setMonth3(event.target.value);
  };

  // 결재 대기 중인 휴가 취소 (바로 취소 가능)
  const leaveCancel = (leaveapp_no) => {
    axios.delete(`/user-leave-request-await?leaveapp_no=${leaveapp_no}`).then((res) => {
      alert(res.data + ' 선택한 휴가 취소 완료');
    });
  };

  const { setLeave } = useLeaveState(); //휴가불러오기

  React.useEffect(() => {
    async function get() {
      try {
        const result = await axios.get(`/user-leave?user_no=${token.user_no}`);
        setLeave(result.data);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    }

    get();
  }, []);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="출/퇴근" />
          <Tab label="휴가" />
        </Tabs>
      </Box>

      {/* tab 1 */}
      {/* row 1 */}
      <BasicTab value={value} index={1}>
        <Grid container spacing={1}>
          {/* row 3 - 휴가현황 그리드 */}
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <MainCard>
              <Typography variant="h5">휴가현황</Typography>
              <VacationDonutChart />
            </MainCard>
          </Grid>
          {/* row 2 */}
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <MainCard style={{ height: '380px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5">결재대기내역</Typography>
              </div>

              {location.state ? (
                <UnappLeaveTotalTable handleOpen={handleOpen} leaveCancel={leaveCancel} user_no={location.state.user_no} />
              ) : (
                <UnappLeaveTotalTable handleOpen={handleOpen} leaveCancel={leaveCancel} user_no={token.user_no} />
              )}
            </MainCard>
          </Grid>

          {/* row 2 - 결재완료 그리드 */}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MainCard>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5">{month2}월 결재 진행/완료내역</Typography>

                <FormControl sx={{ marginLeft: 3 }}>
                  <TextField
                    select
                    size="normal"
                    sx={{ width: '8rem' }}
                    value={month2}
                    onChange={month2Change}
                    inputProps={{
                      name: 'month',
                      id: 'uncontrolled-native'
                    }}
                  >
                    <MenuItem value={12}>12월</MenuItem>
                    <MenuItem value={11}>11월</MenuItem>
                    <MenuItem value={10}>10월</MenuItem>
                    <MenuItem value={9}>9월</MenuItem>
                    <MenuItem value={8}>8월</MenuItem>
                    <MenuItem value={7}>7월</MenuItem>
                    <MenuItem value={6}>6월</MenuItem>
                    <MenuItem value={5}>5월</MenuItem>
                    <MenuItem value={4}>4월</MenuItem>
                    <MenuItem value={3}>3월</MenuItem>
                    <MenuItem value={2}>2월</MenuItem>
                    <MenuItem value={1}>1월</MenuItem>
                  </TextField>
                </FormControl>
              </div>
              {location.state ? (
                <AppLeaveTotalTable handleOpen={handleOpen} month={month2} user_no={location.state.user_no} />
              ) : (
                <AppLeaveTotalTable handleOpen={handleOpen} month={month2} user_no={token.user_no} />
              )}

              <LeaveModal open={modalOpen} handleClose={handleClose} data={modalData} />
            </MainCard>
          </Grid>
        </Grid>
      </BasicTab>

      {/* tab 2 */}
      <BasicTab value={value} index={0}>
        <Grid container spacing={1}>
          {/* row 2 */}
          <Grid item xs={8}>
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
            <MainCard>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography align="left" variant="h5">
                  금주근무시간총합
                </Typography>
              </div>
              {Object.keys(total).length > 0 && Object.keys(overTotal).length > 0 && <WeekAttendDonutChart />}
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5">{month3}월 출/퇴근 현황</Typography>

                <FormControl sx={{ marginLeft: 3 }}>
                  <TextField
                    select
                    size="normal"
                    sx={{ width: '8rem' }}
                    value={month3}
                    onChange={month3Change}
                    inputProps={{
                      name: 'month',
                      id: 'uncontrolled-native'
                    }}
                  >
                    <MenuItem value={12}>12월</MenuItem>
                    <MenuItem value={11}>11월</MenuItem>
                    <MenuItem value={10}>10월</MenuItem>
                    <MenuItem value={9}>9월</MenuItem>
                    <MenuItem value={8}>8월</MenuItem>
                    <MenuItem value={7}>7월</MenuItem>
                    <MenuItem value={6}>6월</MenuItem>
                    <MenuItem value={5}>5월</MenuItem>
                    <MenuItem value={4}>4월</MenuItem>
                    <MenuItem value={3}>3월</MenuItem>
                    <MenuItem value={2}>2월</MenuItem>
                    <MenuItem value={1}>1월</MenuItem>
                  </TextField>
                </FormControl>
              </div>

              {location.state ? (
                <AttendanceTable month={month3} user_no={location.state.user_no} />
              ) : (
                <AttendanceTable month={month3} user_no={token.user_no} />
              )}
            </MainCard>
          </Grid>

          {/* row 3 - 근태현황 그리드 */}
          {/* <Grid item xs={4}>
            <MainCard title="근태현황">
              <VacationDonutChart />
            </MainCard>
          </Grid> */}
        </Grid>
      </BasicTab>
    </>
  );
};

export default UserAttendanceTotalPage;
