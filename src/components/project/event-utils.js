let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    end: todayStr + 'T18:00:00'
  },
  {
    title: 'Meeting',
    start: new Date(),
    color: '#b9e7ff',
    textColor: '#16b1ff'
  },
  {
    title: 'Meeting',
    start: '2023-08-12T14:30:00',
    extendedProps: {
      status: 'done'
    }
  },
  {
    title: 'Birthday Party',
    start: '2023-08-13T07:00:00',
    backgroundColor: 'green',
    borderColor: 'green'
  }
];

export function createEventId() {
  return String(eventGuid++);
}
