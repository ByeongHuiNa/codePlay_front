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
import { INITIAL_EVENTS, createEventId } from './event-utils';
import CalendarDepWorkListTab from './CalendarDepWorkListTab';

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

  //이벤트 생성 함수
  function handleDateSelect(selectInfo) {
    let title = prompt(`이벤트를 생성 하시겠습니까? ${selectInfo.startStr}`);
    let calendarApi = selectInfo.view.calendar;
    console.log(selectInfo.view);

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
        // color: '#4582ec',
        // textColor: 'yellow'
      });
    }
  }
  //이벤트 클릭 시 지우는 함수
  function handleEventClick(clickInfo) {
    if (confirm(`해당 이벤트를 삭제 하시겠습니까? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  return (
    <>
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

          <Grid item xs={3} justifyContent="flex-start">
            <Grid item>
              <Item>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                  <CalendarDepWorkListTab></CalendarDepWorkListTab>
                </Grid>
              </Item>
            </Grid>

            <Grid item mt={2}>
              <Item>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Grid pl>
                    <h3>메모</h3>
                  </Grid>
                  <Grid></Grid>
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
