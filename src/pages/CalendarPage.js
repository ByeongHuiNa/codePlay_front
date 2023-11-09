import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import GroupsIcon from '@mui/icons-material/Groups';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonalCalendar from 'components/project/PersonalCalendar';
import PublicCalendar from 'components/project/PublicCalendar';
import { useCalendarGetScheduleList } from 'store/module';
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
  const { scheduleList, leaveList, setScheduleList, setLeaveList, setDataList } = useCalendarGetScheduleList();

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
              allDay: list.leaveapp_type === 0 || list.leaveapp_type === 3 ? true : false
            };
          });
        setLeaveList(leaveListAdd);
      })
      .catch((error) => {
        console.error('휴가 리스트를 불러오는 중 오류 발생: ', error);
      });
  };

  const { shereDataList, shereScheduleList, shereLeaveList, setShereScheduleList, setShereLeaveList, setShereDataList } =
    useCalendarGetScheduleList();
  //공유 캘린더 리스트
  const getShereScheduleList = () => {
    axios
      .get(`/user-dep-schedulelist?user_no=${token.user_no}`)
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
              allDay: list.leaveapp_type === 0 || list.leaveapp_type === 3 ? true : false
            };
          });
        setShereLeaveList(leaveListAdd);
      })
      .catch((error) => {
        console.error('휴가 리스트를 불러오는 중 오류 발생: ', error);
      });
  };

  // 이벤트 리스트
  const [personalEvents, setPersonalEvents] = React.useState([]);
  const [publicEvents, setPublicEvents] = React.useState([]);

  React.useEffect(() => {
    getScheduleList();
    getLeaveList();
    getShereScheduleList();
    getShereLeaveList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 비어있는 종속성 배열을 사용하여 초기 로딩 시에만 실행되도록 함

  React.useEffect(() => {
    // shereDataList에서 schedule_share가 true인 schedule_no 값을 추출
    const selectedScheduleNos = shereDataList.filter((list) => list.schedule_share == true).map((list) => list.schedule_no);
    // shereScheduleList에서 selectedScheduleNos와 id가 일치하는 객체만 추출
    const filteredShereScheduleList = shereScheduleList.filter((item) => selectedScheduleNos.includes(item.id));
    setPersonalEvents([...scheduleList, ...leaveList]);
    setPublicEvents([...filteredShereScheduleList, ...shereLeaveList]);
    console.log(token);
  }, [scheduleList, leaveList, shereScheduleList, shereLeaveList, shereDataList, value]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
          <Tab icon={<PermContactCalendarIcon />} label="개인 캘린더" {...a11yProps(0)} />
          <Tab icon={<GroupsIcon />} label="공용 캘린더" {...a11yProps(1)} />
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
