import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Dayjs } from 'dayjs'; // dayjs 라이브러리 import

export default function TimePicker2({ label, setTime }) {
  const timePickerFormat = 'A HH:mm';
  const timePickerUtils = {
    format: timePickerFormat,
    parse: (value) => Dayjs(value, timePickerFormat, true).toDate()
  };

  const TimeChange = (time) => {
    const hour = time.$H;
    const minute = time.$m;
    const second = time.$s;
    const date = new Date();
    date.setHours(hour, minute, second, 0);
    let hours = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    let minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    let seconds = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
    setTime(`${hours}:${minutes}:${seconds}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} timeFormat={timePickerUtils}>
      <TimePicker
        label={label}
        slotProps={{
          textField: {
            size: 'small'
          }
        }}
        onChange={(newValue) => {
          TimeChange(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
