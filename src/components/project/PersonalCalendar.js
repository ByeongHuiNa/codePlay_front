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
// eslint-disable-next-line no-unused-vars
import { INITIAL_EVENTS, createEventId } from './event-utils';
import CalendarVacationStatus from './CalendarVacationStatus';
import CalendarWorkList from './CalendarWorkList';
import { Stack } from '../../../node_modules/@mui/material/index';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCalendarDate, useCalendarDrawer, useCalendarEvent } from 'store/module';
import CalendarWorkModal from './CalendarWorkModal';
import CalendarWorkModalContent from './CalendarWorkModalContent';

const PersonalCalendar = () => {
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
  const { setView, setClickView } = useCalendarDrawer();
  const { setStartDate, setEndDate } = useCalendarDate();
  const { setEvent } = useCalendarEvent();

  //달력 선택 시 발생하는 이벤트
  // eslint-disable-next-line no-unused-vars
  function handleDateSelect(selectInfo) {
    //종료일자 -1
    console.log(selectInfo);
    var dateStr = selectInfo.endStr;
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

    setStartDate(selectInfo.startStr);
    setEndDate(newDateStr);
    setView(true);
    setEvent(selectInfo);
  }
  //이벤트 클릭 시 지우는 함수
  function handleEventClick(clickInfo) {
    //종료일자 -1
    console.log(clickInfo.event);
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

    setStartDate(clickInfo.event.startStr);
    setEndDate(newDateStr);
    setClickView(true);
    setEvent(clickInfo.event);
  }
  //CalendarWorkModal on/off
  const [calendarWorkModal, setCalendarWorkModal] = React.useState(false);

  const handleCalendarWorkModal = () => {
    setCalendarWorkModal((pre) => !pre);
  };

  const calendarWorkModalContent = () => {
    return (
      <>
        <h2>modal</h2>
        <CalendarWorkModalContent handleClose={handleCalendarWorkModal} />
      </>
    );
  };

  return (
    <>
      <CalendarWorkModal open={calendarWorkModal} handleClose={handleCalendarWorkModal}>
        {calendarWorkModalContent()}
      </CalendarWorkModal>
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
                select={handleDateSelect}
                eventClick={handleEventClick}
                dayMaxEventRows={true}
              />
            </Item>
          </Grid>

          <Grid item xs={3} container direction="column" justifyContent="space-between" alignItems="stretch">
            <Grid item>
              <Item>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Grid pl>
                    <h3>휴가현황</h3>
                  </Grid>
                  <Grid>
                    <h4>더보기</h4>
                  </Grid>
                </Grid>
                <CalendarVacationStatus />
              </Item>
            </Grid>

            <Grid item mt={2}>
              <Item>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Grid pl>
                    <h3>업무 및 일정</h3>
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => {
                          setCalendarWorkModal(true);
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          console.log('-');
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Stack>
                  </Grid>
                </Grid>
                <CalendarWorkList />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonalCalendar;
