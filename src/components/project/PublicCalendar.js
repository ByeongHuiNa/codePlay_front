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
import { INITIAL_EVENTS } from './event-utils';
import CalendarDepWorkListTab from './CalendarDepWorkListTab';
import CalendarDepWorkMemo from './CalendarDepWorkMemo';
import { useCalendarDate, useCalendarDrawer, useCalendarEvent, useCalendarEventClick, useCalendarMemoModal } from 'store/module';
import CalendarMemoModal from './CalendarMemoModal';
import CalendarMemoModalContent from './CalendarMemoModalContent';

const PublicCalendar = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2.5),
    textAlign: 'center'
  }));

  //이벤트에 표기될 정보
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  //zustand
  const { setClickView } = useCalendarDrawer();
  const { setStartDate, setEndDate } = useCalendarDate();
  const { setEvent } = useCalendarEvent();

  //이벤트 클릭 시 수정하는 함수
  const { setTitle, setAllDay } = useCalendarEventClick();
  function handleEventClick(clickInfo) {
    //종료일자 -1
    console.log(clickInfo.event);
    if (clickInfo.event.endStr == !'') {
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
    } else {
      newDateStr = clickInfo.event.startStr;
    }
    setStartDate(clickInfo.event.startStr);
    setEndDate(newDateStr);
    setClickView(true);
    setEvent(clickInfo.event);
    setTitle(clickInfo.event.title);
    setAllDay(clickInfo.event.allDay);
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
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                }}
                initialView="dayGridMonth"
                weekends="true"
                editable={true}
                initialEvents={INITIAL_EVENTS}
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
                <Grid>
                  <CalendarDepWorkListTab></CalendarDepWorkListTab>
                </Grid>
              </Item>
            </Grid>

            <Grid item mt={1.3}>
              <Item>
                <Grid container direction="column" justifyContent="space-between" alignItems="flex-start">
                  <Grid pl>
                    <h3>메모</h3>
                  </Grid>
                  <Grid>
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
