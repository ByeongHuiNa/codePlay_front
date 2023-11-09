import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useCalendarDate, useCalendarDrawer, useCalendarEvent, useCalendarEventClick, useCalendarGetScheduleList } from 'store/module';
import {
  Button,
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
import { DateField } from '@mui/x-date-pickers/DateField';
import axios from '../../../node_modules/axios/index';

export default function CalendarClickDrawer() {
  const { updateScheduleList, updateDataList, deleteDataList, deleteScheduleList, updateShereDataList, updateShereScheduleList } =
    useCalendarGetScheduleList();
  const { event } = useCalendarEvent();
  //AddEventOnClick
  const { title, setTitle, allDay, setAllDay, shareType, setShareType, content, setContent } = useCalendarEventClick();

  const { clickView, setClickView } = useCalendarDrawer();

  //일정종류
  const { scheduleType, setScheduleType } = useCalendarEventClick();

  const handleSelectChange = (event) => {
    setScheduleType(event.target.value);
  };

  //제목 수정
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  //AllDay스위치 on/off
  const handleAllDayTypeSwitchChange = () => {
    if (allDay == true) {
      setAllDay(false);
    } else {
      setAllDay(true);
    }
  };

  //LEAVETYPE스위치 on/off
  const [leaveType, setLeaveType] = React.useState(false);

  const handleLeaveTypeSwitchChange = () => {
    setLeaveType((pre) => !pre);
  };

  //LEAVEHALF_TYPE스위치 on/off
  const [leaveHalfType, setLeaveHalfType] = React.useState(false);

  const handleLeaveHalfTypeSwitchChange = () => {
    setLeaveHalfType((pre) => !pre);
  };

  const handleShareTypeSwitchChange = () => {
    if (shareType == true) {
      setShareType(false);
    } else {
      setShareType(true);
    }
  };

  //Drawer on/off
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setClickView(open);
    setScheduleType('');
    setTitle('');
    setContent('');
    setStartDatePicker(false);
    setEndDatePicker(false);
    setLeaveType(false);
    setLeaveHalfType(false);
  };

  // eslint-disable-next-line no-unused-vars
  const { startDate, setStartDate, endDate, setEndDate } = useCalendarDate();

  //DatePicker on/off
  const [startDatePicker, setStartDatePicker] = React.useState(false);
  const [endDatePicker, setEndDatePicker] = React.useState(false);

  const handleStartDateFieldOnClick = () => {
    setStartDatePicker((pre) => !pre);
    if (endDatePicker) setEndDatePicker(false);
  };

  const handleStartDateFieldOnAccept = (e) => {
    setStartDate(new Date(e));
    setStartDatePicker((pre) => !pre);
  };

  const handleEndDateFieldOnClick = () => {
    setEndDatePicker((pre) => !pre);
    if (startDatePicker) setStartDatePicker(false);
  };

  const handleEndDateFieldOnAccept = (e) => {
    setEndDate(new Date(e));
    setEndDatePicker((pre) => !pre);
  };

  const handleUpdateEventOnClick = () => {
    console.log(event.id);
    const schedule = {
      schedule_no: parseInt(event.id),
      schedule_startday: startDate,
      schedule_endday: endDate,
      schedule_type: scheduleType,
      schedule_title: title,
      schedule_allday: allDay,
      schedule_description: content,
      schedule_share: shareType
    };
    axios.patch(`/user-schedule`, schedule).then(() => {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // 날짜를 비교하여 start와 end 값이 같지 않은 경우에만 +1을 적용
      if (start.getDate() !== end.getDate() && allDay == true) {
        end.setDate(end.getDate() + 1);
      }
      const scheduleListAdd = {
        id: parseInt(event.id),
        title: title,
        start: start,
        end: end,
        allDay: allDay,
        color: scheduleType === '개인 일정' ? '#ef9a9a' : '#90caf9',
        textColor: scheduleType === '개인 일정' ? '#ffebee' : '#e3f2fd'
      };
      updateDataList(schedule);
      updateScheduleList(scheduleListAdd);
      updateShereDataList(schedule);
      updateShereScheduleList(scheduleListAdd);
    });

    setClickView(false);
  };

  const handleDeleteEventOnClick = () => {
    axios.post(`/user-schedule-delete?schedule_no=${parseInt(event.id)}`).then(() => {
      deleteDataList(event.id);
      deleteScheduleList(event.id);
    });
    setClickView(false);
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
            Edit Event
          </Typography>
        </Box>
        <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
          <FormControl sx={{ width: '80%', mt: 2 }}>
            <InputLabel id="demo-simple-select-label">일정</InputLabel>
            {scheduleType === '휴가 일정' ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="일정"
                value={scheduleType}
                onChange={handleSelectChange}
                disabled
              >
                <MenuItem value={'휴가 일정'}>휴가 일정</MenuItem>
              </Select>
            ) : (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="일정"
                value={scheduleType}
                onChange={handleSelectChange}
              >
                <MenuItem value={'개인 일정'}>개인 일정</MenuItem>
                <MenuItem value={'회사 일정'}>회사 일정</MenuItem>
                <MenuItem value={'휴가 일정'} disabled>
                  휴가 일정
                </MenuItem>
              </Select>
            )}
            {/* 개인일정 및 회사일정을 선택하면 제목, All Day 버튼, 일자, 메모, 공유 버튼을 작성할 수 있는 폼을 제공한다. */}
            {/* 휴가일정을 선택하면 연차 및 반차 버튼, 일자를 선택할 수 있고 확인 및 취소 버튼을 포함하고있다 */}
            {scheduleType === '개인 일정' || scheduleType === '회사 일정' ? (
              <>
                <TextField sx={{ mt: 3 }} id="outlined-basic" label="제목" onChange={handleTitleChange} value={title} />
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                  <FormControlLabel
                    sx={{
                      mt: 1.5,
                      ml: 0.7
                    }}
                    control={
                      <Switch
                        color="primary"
                        checked={allDay}
                        onChange={handleAllDayTypeSwitchChange}
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
                  {allDay == true ? (
                    <>
                      <DateField
                        sx={{
                          mt: 3
                        }}
                        label="시작일"
                        value={dayjs(`${startDate}`)}
                        onClick={handleStartDateFieldOnClick}
                      />
                      <DateField
                        sx={{
                          mt: 3
                        }}
                        label="종료일"
                        value={dayjs(`${endDate}`)}
                        onClick={handleEndDateFieldOnClick}
                      />
                      {startDatePicker && (
                        <StaticDatePicker
                          value={dayjs(`${startDate}`)}
                          onAccept={handleStartDateFieldOnAccept}
                          onClose={() => setStartDatePicker(false)}
                        />
                      )}
                      {endDatePicker && (
                        <StaticDatePicker
                          value={dayjs(`${endDate}`)}
                          onAccept={handleEndDateFieldOnAccept}
                          onClose={() => setEndDatePicker(false)}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <DateTimeField
                        sx={{
                          mt: 3
                        }}
                        label="시작일"
                        value={dayjs(`${startDate}`)}
                        onClick={handleStartDateFieldOnClick}
                      />
                      <DateTimeField
                        sx={{
                          mt: 3
                        }}
                        label="종료일"
                        value={dayjs(`${endDate}`)}
                        onClick={handleEndDateFieldOnClick}
                      />
                      {startDatePicker && (
                        <StaticDateTimePicker
                          value={dayjs(`${startDate}`)}
                          onAccept={handleStartDateFieldOnAccept}
                          onClose={() => setStartDatePicker(false)}
                        />
                      )}
                      {endDatePicker && (
                        <StaticDateTimePicker
                          value={dayjs(`${endDate}`)}
                          onAccept={handleEndDateFieldOnAccept}
                          onClose={() => setEndDatePicker(false)}
                        />
                      )}
                    </>
                  )}
                </LocalizationProvider>
                <TextField
                  id="outlined-multiline-flexible"
                  label="일정 내용"
                  multiline
                  rows={3}
                  onChange={handleContentChange}
                  value={content}
                  sx={{
                    mt: 3
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
                        color="primary"
                        checked={shareType}
                        onChange={handleShareTypeSwitchChange}
                        sx={{
                          justifyContent: 'flex-start' // 왼쪽 정렬
                        }}
                      />
                    }
                    label="공유하기"
                    labelPlacement="start"
                  />
                </Grid>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateEventOnClick}
                  sx={{
                    mt: 28
                  }}
                >
                  일정 수정
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="error"
                  onClick={handleDeleteEventOnClick}
                  sx={{
                    mt: 2
                  }}
                >
                  일정 취소
                </Button>
              </>
            ) : (
              scheduleType && (
                <>
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{ mt: 1.5, ml: 0.7 }}>
                    <Typography>연차</Typography>
                    <Switch color="primary" checked={leaveType} onChange={handleLeaveTypeSwitchChange} />
                    <Typography sx={{ mr: 5 }}>반차</Typography>
                    {leaveType && (
                      <>
                        <Typography sx={{ ml: 5 }}>오전</Typography>
                        <Switch color="primary" checked={leaveHalfType} onChange={handleLeaveHalfTypeSwitchChange} />
                        <Typography>오후</Typography>
                      </>
                    )}
                  </Grid>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {leaveType == false ? (
                      <>
                        <DateField
                          sx={{
                            mt: 3
                          }}
                          label="시작일"
                          value={dayjs(`${startDate}`)}
                          onClick={handleStartDateFieldOnClick}
                        />
                        <DateField
                          sx={{
                            mt: 3
                          }}
                          label="종료일"
                          value={dayjs(`${endDate}`)}
                          onClick={handleEndDateFieldOnClick}
                        />
                        {startDatePicker && (
                          <StaticDatePicker
                            value={dayjs(`${startDate}`)}
                            onAccept={handleStartDateFieldOnAccept}
                            onClose={() => setStartDatePicker(false)}
                          />
                        )}
                        {endDatePicker && (
                          <StaticDatePicker
                            value={dayjs(`${endDate}`)}
                            onAccept={handleEndDateFieldOnAccept}
                            onClose={() => setEndDatePicker(false)}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <DateTimeField
                          sx={{
                            mt: 3
                          }}
                          disabled="true"
                          label="시작일"
                          value={leaveHalfType == false ? dayjs(`${startDate}T09:00`) : dayjs(`${startDate}T14:00`)}
                        />
                        <DateTimeField
                          sx={{
                            mt: 3
                          }}
                          disabled="true"
                          label="종료일"
                          value={leaveHalfType == false ? dayjs(`${startDate}T13:00`) : dayjs(`${startDate}T18:00`)}
                        />
                      </>
                    )}
                  </LocalizationProvider>
                  <Button
                    size="large"
                    variant="contained"
                    color="error"
                    onClick={handleUpdateEventOnClick}
                    sx={{
                      mt: 62
                    }}
                  >
                    휴가 취소
                  </Button>
                </>
              )
            )}
          </FormControl>
        </Grid>
      </Box>
    );
  };

  return (
    <Drawer sx={{ zIndex: '1300' }} anchor={'right'} open={clickView} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}
