import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function BasicDatePicker({ label, setDate, val, width }) {
  const datePickerFormat = 'YYYY-MM-DD';
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate()
  };

  const startDateChange = (date) => {
    setDate(date.toDate().setHours(0, 0, 0, 0));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datePickerUtils}>
      <DatePicker
        value={val ? dayjs(val) : ''}
        label={label}
        slotProps={{
          textField: {
            size: 'medium'
          }
        }}
        format="YYYY / MM / DD"
        onChange={(newValue) => {
          startDateChange(newValue);
        }}
        sx={{
          width: `${width ? width : '100%'}`,
          backgroundColor: 'white'
        }}
      />
    </LocalizationProvider>
  );
}
