import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function LimitDatePicker({ label, setDate, width, minDate, maxDate, val, bool }) {
  const datePickerFormat = 'YYYY-MM-DD';
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => Dayjs(value, datePickerFormat, true).toDate()
  };

  const startDateChange = (date) => {
    setDate(date.toDate());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datePickerUtils}>
      <DatePicker
        value={val !== '' ? dayjs(val) : null}
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
          ml: 1
        }}
        minDate={minDate ? dayjs(minDate) : undefined}
        maxDate={maxDate ? dayjs(maxDate) : undefined}
        disabled={bool}
      />
    </LocalizationProvider>
  );
}
