import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({ label, setDate }) {
  const datePickerFormat = 'YYYY-MM-DD';
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => Dayjs(value, datePickerFormat, true).toDate()
  };

  const startDateChange = (date) => {
    setDate(date.toDate().toISOString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={datePickerUtils}>
      <DatePicker
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
      />
    </LocalizationProvider>
  );
}
