import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonalCalendar from 'components/project/PersonalCalendar';
import PublicCalendar from 'components/project/PublicCalendar';
import { useCalendarGetScheduleList, useLeaveState } from 'store/module';
import axios from '../../node_modules/axios/index';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';

// ==============================|| SAMPLE PAGE ||============================== //

function CustomTabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const CalendarPage = () => {
  const token = jwtDecode(localStorage.getItem('token').slice(7));
  const [value, setValue] = React.useState(0);
  const { scheduleList, leaveList, attendanceList, dataList, setScheduleList, setLeaveList, setDataList, setAttendanceList } =
    useCalendarGetScheduleList();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //개인 캘린더 리스트
  const getScheduleList = () => {
    axios
      .get(`/user-schedulelist?user_no=${token.user_no}`)
      .then((response) => {
        const scheduleListAdd = response.data.map((list) => {
          const startDate = new Date(list.schedule_startday);
          const endDate = new Date(list.schedule_endday);

          // 날짜를 비교하여 start와 end 값이 같지 않은 경우에만 +1을 적용
          if (startDate.getDate() !== endDate.getDate()) {
            endDate.setDate(endDate.getDate() + 1);
          }

          return {
            id: list.schedule_no,
            title: list.schedule_title,
            start: startDate,
            end: endDate,
            allDay: list.schedule_allday,
            color: list.schedule_type === '개인 일정' ? '#ef9a9a' : '#90caf9',
            textColor: list.schedule_type === '개인 일정' ? '#ffebee' : '#e3f2fd'
          };
        });

        setDataList(response.data);
        setScheduleList(scheduleListAdd);
      })
      .catch((error) => {
        console.error('스케줄 리스트를 불러오는 중 오류 발생: ', error);
      });
  };

  const getLeaveList = () => {
    axios
      .get(`/user-leavelist?user_no=${token.user_no}`)
      .then((response) => {
        const leaveListAdd = response.data
          .filter((list) => list.leaveapp_status === 0) // list.leaveapp_status 값이 0인 항목만 필터링
          .map((list) => {
            const startDate = new Date(list.leaveapp_start);
            const endDate = new Date(list.leaveapp_end);
            if (list.leaveapp_type == 1) {
              startDate.setHours(9, 0, 0, 0); // 9am으로 설정
              // 만약 endDate도 변경해야 한다면 아래와 같이 endDate도 수정합니다.
              endDate.setHours(13, 0, 0, 0); // 5pm으로 설정 (예시로 5pm으로 설정한 것이니 필요에 따라 변경 가능합니다)
            }
            if (list.leaveapp_type == 2) {
              startDate.setHours(14, 0, 0, 0); // 1pm으로 설정
              // 만약 endDate도 변경해야 한다면 아래와 같이 endDate도 수정합니다.
              endDate.setHours(18, 0, 0, 0); // 5pm으로 설정 (예시로 5pm으로 설정한 것이니 필요에 따라 변경 가능합니다)
            }

            // 날짜를 비교하여 start와 end 값이 같지 않은 경우에만 +1을 적용
            if (startDate.getDate() !== endDate.getDate()) {
              endDate.setDate(endDate.getDate() + 1);
            }

            return {
              title: list.leaveapp_title,
              start: startDate,
              end: endDate,
              color: '#a5d6a7',
              textColor: '#e8f5e9',
              allDay: list.leaveapp_type == 0 || list.leaveapp_type == 3 ? true : false
            };
          });
        setLeaveList(leaveListAdd);
      })
      .catch((error) => {
        console.error('휴가 리스트를 불러오는 중 오류 발생: ', error);
      });
  };

  const getAttendanceList = () => {
    axios
      .get(`/user-attend?user_no=${token.user_no}`)
      .then((response) => {
        const leaveListAdd = response.data
          .filter((list) => ['결근', '지각', '조퇴'].includes(list.attend_status))
          .map((list) => {
            return {
              title: list.attend_status,
              start: list.attend_date,
              color: list.attend_status === '결근' ? '#e57373' : '#ffecb3', // 부드러운 톤의 빨간색과 노란색
              textColor: list.attend_status === '결근' ? '#ffebee' : '#000000', // 조금 어두운 빨간색과 검정색
              allDay: true
            };
          });
        setAttendanceList(leaveListAdd);
      })
      .catch((error) => {
        console.error('휴가 리스트를 불러오는 중 오류 발생: ', error);
      });
  };

  //공유 캘린더 리스트
  const {
    shereDataList,
    shereScheduleList,
    shereLeaveList,
    setShereScheduleList,
    setShereLeaveList,
    setShereDataList,
    setShereLeaveDataList
  } = useCalendarGetScheduleList();
  const getShereScheduleList = () => {
    axios
      .get(`/user-dep-schedulelist?user_no=${token.user_no}`)
      .then((response) => {
        console.log(response.data);
        const scheduleListAdd = response.data.map((list) => {
          const startDate = new Date(list.schedule_startday);
          const endDate = new Date(list.schedule_endday);

          // 날짜를 비교하여 start와 end 값이 같지 않은 경우에만 +1을 적용
          if (startDate.getDate() !== endDate.getDate()) {
            endDate.setDate(endDate.getDate() + 1);
          }

          return {
            id: list.schedule_no,
            title: list.schedule_title,
            start: startDate,
            end: endDate,
            allDay: list.schedule_allday,
            color: list.schedule_type === '개인 일정' ? '#ef9a9a' : '#90caf9',
            textColor: list.schedule_type === '개인 일정' ? '#ffebee' : '#e3f2fd'
          };
        });

        setShereDataList(response.data);
        setShereScheduleList(scheduleListAdd);
      })
      .catch((error) => {
        console.error('스케줄 리스트를 불러오는 중 오류 발생: ', error);
      });
  };

  const getShereLeaveList = () => {
    axios
      .get(`/user-dep-leavelist?user_no=${token.user_no}`)
      .then((response) => {
        const leaveListAdd = response.data
          .filter((list) => list.leaveapp_status === 0) // list.leaveapp_status 값이 0인 항목만 필터링
          .map((list) => {
            const startDate = new Date(list.leaveapp_start);
            const endDate = new Date(list.leaveapp_end);

            if (list.leaveapp_type == 1) {
              startDate.setHours(9, 0, 0, 0); // 9am으로 설정
              // 만약 endDate도 변경해야 한다면 아래와 같이 endDate도 수정합니다.
              endDate.setHours(13, 0, 0, 0); // 1pm으로 설정
            }
            if (list.leaveapp_type == 2) {
              startDate.setHours(14, 0, 0, 0); // 1pm으로 설정
              // 만약 endDate도 변경해야 한다면 아래와 같이 endDate도 수정합니다.
              endDate.setHours(18, 0, 0, 0); // 6pm으로 설정
            }

            // 날짜를 비교하여 start와 end 값이 같지 않은 경우에만 +1을 적용
            if (startDate.getDate() !== endDate.getDate()) {
              endDate.setDate(endDate.getDate() + 1);
            }

            return {
              id: list.leaveapp_no,
              title: list.leaveapp_title,
              start: startDate,
              end: endDate,
              color: '#a5d6a7',
              textColor: '#e8f5e9',
              allDay: list.leaveapp_type == 0 || list.leaveapp_type == 3 ? true : false
            };
          });
        setShereLeaveList(leaveListAdd);
        setShereLeaveDataList(response.data.filter((list) => list.leaveapp_status == 0));
      })
      .catch((error) => {
        console.error('휴가 리스트를 불러오는 중 오류 발생: ', error);
      });
  };

  // 이벤트 리스트
  const [personalEvents, setPersonalEvents] = React.useState([]);
  const [publicEvents, setPublicEvents] = React.useState([]);

  React.useEffect(() => {
    if (dataList.length === 0) {
      getScheduleList();
      getLeaveList();
      getShereScheduleList();
      getShereLeaveList();
      getAttendanceList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 비어있는 종속성 배열을 사용하여 초기 로딩 시에만 실행되도록 함

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // shereDataList에서 schedule_share가 true인 schedule_no 값을 추출
    const selectedScheduleNos = shereDataList.filter((list) => list.schedule_share == true).map((list) => list.schedule_no);
    // shereScheduleList에서 selectedScheduleNos와 id가 일치하는 객체만 추출
    const filteredShereScheduleList = shereScheduleList.filter((item) => selectedScheduleNos.includes(item.id));
    setPersonalEvents([...scheduleList, ...leaveList, ...attendanceList]);
    setPublicEvents([...filteredShereScheduleList, ...shereLeaveList]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleList, leaveList, shereScheduleList, shereLeaveList, shereDataList, attendanceList, value]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 0 }}>
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
          <Tab label="개인 캘린더" {...a11yProps(0)} />
          <Tab label="공용 캘린더" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* 개인 캘린더 컴포넌트 */}
        <PersonalCalendar events={personalEvents}></PersonalCalendar>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* 공용 캘린더 컴포넌트 */}
        <PublicCalendar events={publicEvents}></PublicCalendar>
      </CustomTabPanel>
    </Box>
  );
};

export default CalendarPage;
