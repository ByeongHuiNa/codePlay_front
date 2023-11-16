import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import CalendarDepWorkListTab from './CalendarDepWorkListTab';
import CalendarDepWorkMemo from './CalendarDepWorkMemo';
import {
  useCalendarDate,
  useCalendarDrawer,
  useCalendarEvent,
  useCalendarEventClick,
  useCalendarGetScheduleList,
  useCalendarMemoModal
} from 'store/module';
import CalendarMemoModal from './CalendarMemoModal';
import CalendarMemoModalContent from './CalendarMemoModalContent';
import { Typography } from '../../../node_modules/@mui/material/index';
// import { jwtDecode } from '../../../node_modules/jwt-decode/build/cjs/index';

// eslint-disable-next-line react/prop-types
const PublicCalendar = ({ events }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2.5),
    textAlign: 'center'
  }));

  // const token = jwtDecode(localStorage.getItem('token').slice(7));

  //이벤트에 표기될 정보
  function renderEventContent(eventInfo) {
    return (
      <Typography variant="body2" component="div">
        {eventInfo.event.title}
      </Typography>
    );
  }
  //zustand
  const { setClickPublicView } = useCalendarDrawer();
  const { setStartDate, setEndDate } = useCalendarDate();
  const { setEvent } = useCalendarEvent();

  //이벤트 클릭 시 수정하는 함수
  const { setTitle, setAllDay, setScheduleType, setShareType, setContent } = useCalendarEventClick();
  const { dataList } = useCalendarGetScheduleList();
  function handleEventClick(clickInfo) {
    const ScheduleType =
      clickInfo.event.backgroundColor === '#ef9a9a'
        ? '개인 일정'
        : clickInfo.event.backgroundColor === '#90caf9'
        ? '회사 일정'
        : '휴가 일정';
    console.log(clickInfo.event);
    if (
      (clickInfo.event.endStr !== '' && clickInfo.event.allDay == true) ||
      (clickInfo.event.endStr !== '' && ScheduleType == '휴가 일정' && clickInfo.event.allDay == true)
    ) {
      var dateStr = clickInfo.event.endStr;
      var parts = dateStr.split('-');
      var year = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10);
      var day = parseInt(parts[2], 10);

      var newDay = day - 1;
      var newMonth = month;
      var newYear = year;

      if (newDay === 0) {
        // 날짜가 0이면 이전 달로 이동
        newMonth--;
        if (newMonth === 0) {
          // 이전 달이 0이면 작년 12월로 이동
          newYear--;
          newMonth = 12;
        }

        // 이전 달의 마지막 날짜를 계산
        var lastDayOfPreviousMonth = new Date(newYear, newMonth, 0).getDate();
        newDay = lastDayOfPreviousMonth;
      }

      var newDateStr = newYear + '-' + String(newMonth).padStart(2, '0') + '-' + String(newDay).padStart(2, '0');
    } else if (clickInfo.event.endStr == '') {
      newDateStr = clickInfo.event.startStr;
    } else {
      newDateStr = clickInfo.event.endStr;
    }

    const desiredScheduleNo = clickInfo.event.id;
    // dataList 배열에서 schedule_no 객체를 찾기
    const targetObject = dataList.find((item) => item.schedule_no == desiredScheduleNo);
    // schedule_no가 1인 객체가 존재하고 있다면 schedule_share 값을 가져옴
    const scheduleShare = targetObject ? targetObject.schedule_share : null;
    // scheduleShare에는 schedule_no가 1인 객체의 schedule_share 값이 저장
    const scheduleDescription = targetObject ? targetObject.schedule_description : null;
    // scheduleDescription에는 schedule_no가 일치하는 객체의 schedule_description 값이 저장

    setStartDate(clickInfo.event.startStr);
    setEndDate(newDateStr);
    setEvent(clickInfo.event);
    setTitle(clickInfo.event.title);
    setAllDay(clickInfo.event.allDay);
    setScheduleType(ScheduleType);
    setShareType(scheduleShare);
    setContent(scheduleDescription);
    setClickPublicView(true);
  }

  //CalendarMemoModal on/off
  const { memoView } = useCalendarMemoModal();

  const calendarWorkModalContent = () => {
    return (
      <>
        <h2>메모 상세</h2>
        <CalendarMemoModalContent />
      </>
    );
  };

  return (
    <>
      <CalendarMemoModal open={memoView}>{calendarWorkModalContent()}</CalendarMemoModal>
      <Box
        sx={{
          flexGrow: 1
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Item>
              <FullCalendar
                height={700}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                }}
                initialView="dayGridMonth"
                weekends="true"
                editable={true}
                initialEvents={events}
                eventContent={renderEventContent}
                selectable={true}
                eventClick={handleEventClick}
                dayMaxEventRows={true}
              />
            </Item>
          </Grid>

          <Grid item xs={3} justifyContent="flex-start">
            <Grid item>
              <Item>
                <Grid sx={{ mt: -1, height: '305px' }}>
                  <CalendarDepWorkListTab />
                </Grid>
              </Item>
            </Grid>

            <Grid item mt={1.3}>
              <Item>
                <Grid container direction="column" justifyContent="space-between" alignItems="flex-start">
                  <Grid pl sx={{ mt: -2, mb: 0.5 }}>
                    <h3>메모</h3>
                  </Grid>
                  <Grid sx={{ ml: -2, mt: -2 }}>
                    <CalendarDepWorkMemo />
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PublicCalendar;
