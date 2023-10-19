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
    const ampm = time.$H >= 12 ? 'PM' : 'AM';
    setTime(`${ampm} ${time.$H} : ${time.$m} : 00`);
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
