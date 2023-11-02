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
  const [value, setValue] = React.useState(0);
  const { scheduleList, leaveList, setScheduleList, setLeaveList, setDataList } = useCalendarGetScheduleList();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getScheduleList = () => {
    axios
      .get(`/user-schedulelist?user_no=1`)
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
      .get(`/user-leavelist?user_no=1`)
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
              textColor: '#e8f5e9'
            };
          });

        setLeaveList(leaveListAdd);
      })
      .catch((error) => {
        console.error('휴가 리스트를 불러오는 중 오류 발생: ', error);
      });
  };

  // 이벤트 리스트
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    getScheduleList();
    getLeaveList();
  }, []); // 비어있는 종속성 배열을 사용하여 초기 로딩 시에만 실행되도록 함

  React.useEffect(() => {
    // scheduleList 및 leaveList가 변경될 때마다 events 업데이트
    setEvents([...scheduleList, ...leaveList]);
  }, [scheduleList, leaveList]);

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
        <PersonalCalendar events={events}></PersonalCalendar>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* 공용 캘린더 컴포넌트 */}
        <PublicCalendar></PublicCalendar>
      </CustomTabPanel>
    </Box>
  );
};

export default CalendarPage;
