import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useCalendarDrawer } from 'store/module';
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography
} from '../../../node_modules/@mui/material/index';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';

export default function CalendarDrawer() {
  const { view, setView } = useCalendarDrawer();

  //일정종류
  const [scheduleType, setScheduleType] = React.useState('');

  const handleSelectChange = (event) => {
    setScheduleType(event.target.value);
  };

  //제목 입력
  const [tltle, setTltle] = React.useState('');

  const handleTitleChange = (e) => {
    setTltle(e.target.value);
  };

  //스위치 on/off
  const [allDayType, setAllDayType] = React.useState(true);

  const handleSwitchChange = () => {
    setAllDayType((pre) => !pre);
  };

  //시간

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setView(open);
    setScheduleType('');
  };

  const list = () => {
    return (
      <Box sx={{ width: 400 }} role="presentation">
        <Box
          sx={{
            width: '100%',
            height: 60,
            backgroundColor: '#f4f5fa',
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography
            variant="h6"
            color="#3A3541AA"
            sx={{
              ml: 2
            }}
          >
            Add Event
          </Typography>
        </Box>
        <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
          <FormControl sx={{ width: '80%', mt: 2 }}>
            <InputLabel id="demo-simple-select-label">일정</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="일정"
              value={scheduleType}
              onChange={handleSelectChange}
            >
              <MenuItem value={'개인 일정'}>개인 일정</MenuItem>
              <MenuItem value={'회사 일정'}>회사 일정</MenuItem>
              <MenuItem value={'휴가 일정'}>휴가 일정</MenuItem>
            </Select>
            {/* 개인일정 및 회사일정을 선택하면 제목, All Day 버튼, 일자, 메모, 공유 버튼을 작성할 수 있는 폼을 제공한다. */}
            {/* 휴가일정을 선택하면 연차 및 반차 버튼, 일자를 선택할 수 있고 확인 및 취소 버튼을 포함하고있다 */}
            {scheduleType && (
              <>
                <TextField
                  sx={{ mt: 3 }}
                  id="outlined-basic"
                  label="제목"
                  onChange={handleTitleChange}
                  value={tltle}
                  InputProps={{
                    onClick: () => {
                      if (tltle === '제목을 입력해 주세요.') {
                        handleTitleChange({ target: { value: '' } }); // 기본값이면 클릭 시 값 초기화
                      }
                    }
                  }}
                />
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                  <FormControlLabel
                    sx={{
                      mt: 1.5,
                      ml: 0.7
                    }}
                    control={
                      <Switch
                        color="secondary"
                        checked={allDayType}
                        onChange={handleSwitchChange}
                        sx={{
                          justifyContent: 'flex-start' // 왼쪽 정렬
                        }}
                      />
                    }
                    label="AllDay"
                    labelPlacement="start"
                  />
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimeField
                    sx={{
                      mt: 2
                    }}
                    label="시작일"
                    defaultValue={dayjs('2022-04-17T15:30')}
                  />
                  <DateTimeField
                    sx={{
                      mt: 2
                    }}
                    label="종료일"
                    defaultValue={dayjs('2022-04-17T15:30')}
                  />
                  {/* <DateTimeField label="Controlled field" value={value} onChange={(newValue) => setValue(newValue)} /> */}
                  <StaticDatePicker defaultValue={dayjs('2022-04-17')} />
                  <StaticDateTimePicker defaultValue={dayjs('2022-04-17')} />
                </LocalizationProvider>
              </>
            )}
          </FormControl>
        </Grid>
      </Box>
    );
  };

  return (
    <Drawer sx={{ zIndex: '1300' }} anchor={'right'} open={view} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}
