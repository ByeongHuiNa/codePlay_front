import * as React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';

const Calendar = React.memo(() => {
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
      // clickInfo.view.calendar.gotoDate('2023-11-12');
    }
  }

  return (
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
  );
});

export default Calendar;
