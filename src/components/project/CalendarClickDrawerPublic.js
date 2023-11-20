import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useCalendarDate, useCalendarDrawer, useCalendarEventClick } from 'store/module';
import { FormControl, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '../../../node_modules/@mui/material/index';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { DateField } from '@mui/x-date-pickers/DateField';
import CalendarDepWorkMemo from './CalendarDepWorkMemo';

export default function CalendarClickDrawerPublic() {
  //AddEventOnClick
  const { title, setTitle, allDay, content, setContent } = useCalendarEventClick();

  const { clickPublicView, setClickPublicView } = useCalendarDrawer();

  //일정종류
  const { scheduleType, setScheduleType } = useCalendarEventClick();

  //Drawer on/off
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setClickPublicView(open);
    setScheduleType('');
    setTitle('');
    setContent('');
  };

  const { startDate, endDate } = useCalendarDate();

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
            Check Event
          </Typography>
        </Box>
        <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
          <FormControl sx={{ width: '80%', mt: 2 }}>
            <InputLabel id="demo-simple-select-label">일정</InputLabel>
            {scheduleType === '휴가 일정' ? (
              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="일정" value={scheduleType} disabled>
                <MenuItem value={'휴가 일정'}>휴가 일정</MenuItem>
              </Select>
            ) : (
              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="일정" value={scheduleType} disabled>
                <MenuItem value={'개인 일정'} disabled>
                  개인 일정
                </MenuItem>
                <MenuItem value={'회사 일정'} disabled>
                  회사 일정
                </MenuItem>
                <MenuItem value={'휴가 일정'} disabled>
                  휴가 일정
                </MenuItem>
              </Select>
            )}
            {/* 개인일정 및 회사일정을 선택하면 제목, All Day 버튼, 일자, 메모, 공유 버튼을 작성할 수 있는 폼을 제공한다. */}
            {/* 휴가일정을 선택하면 연차 및 반차 버튼, 일자를 선택할 수 있고 확인 및 취소 버튼을 포함하고있다 */}
            {scheduleType === '개인 일정' || scheduleType === '회사 일정' ? (
              <>
                <TextField
                  sx={{ mt: 3 }}
                  id="outlined-basic"
                  label="제목"
                  value={title}
                  InputProps={{
                    readOnly: true // 리드온리로 설정
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {allDay == true ? (
                    <>
                      <DateField
                        sx={{
                          mt: 3
                        }}
                        label="시작일"
                        value={dayjs(`${startDate}`)}
                      />
                      <DateField
                        sx={{
                          mt: 3
                        }}
                        label="종료일"
                        value={dayjs(`${endDate}`)}
                      />
                    </>
                  ) : (
                    <>
                      <DateTimeField
                        sx={{
                          mt: 3
                        }}
                        label="시작일"
                        value={dayjs(`${startDate}`)}
                      />
                      <DateTimeField
                        sx={{
                          mt: 3
                        }}
                        label="종료일"
                        value={dayjs(`${endDate}`)}
                      />
                    </>
                  )}
                </LocalizationProvider>
                <TextField
                  id="outlined-multiline-flexible"
                  label="일정 내용"
                  InputProps={{ readOnly: true }}
                  multiline
                  rows={3}
                  value={content}
                  sx={{
                    mt: 3
                  }}
                />
                <Grid
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{
                    border: '1px solid #ccc', // 테두리 스타일 및 색상 지정
                    borderRadius: '4px', // 테두리를 둥글게 만들기 위한 속성
                    padding: '16px', // 내부 여백 설정
                    mt: 2
                  }}
                >
                  <Grid pl sx={{ mt: -2, mb: 0.5 }}>
                    <h3>메모</h3>
                  </Grid>
                  <Grid sx={{ ml: -2, mt: -2 }}>
                    <CalendarDepWorkMemo />
                  </Grid>
                </Grid>
              </>
            ) : (
              //휴가일정 클릭
              scheduleType && (
                <>
                  <TextField sx={{ mt: 3 }} id="outlined-basic" label="제목" value={title} InputProps={{ readOnly: true }} />
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{ mt: 1.5, ml: 0.7 }}>
                    <Typography>연차</Typography>
                    <Switch color="primary" checked={!allDay} disabled={true} />
                    <Typography sx={{ mr: 5 }}>반차</Typography>
                    {!allDay && (
                      <>
                        <Typography sx={{ ml: 5 }}>오전</Typography>
                        <Switch
                          color="primary"
                          checked={!(new Date(startDate).getHours() >= 6 && new Date(startDate).getHours() <= 10)}
                          disabled={true}
                        />
                        <Typography>오후</Typography>
                      </>
                    )}
                  </Grid>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {allDay ? (
                      <>
                        <DateField
                          sx={{
                            mt: 3
                          }}
                          label="시작일"
                          value={dayjs(`${startDate}`)}
                        />
                        <DateField
                          sx={{
                            mt: 3
                          }}
                          label="종료일"
                          value={dayjs(`${endDate}`)}
                        />
                      </>
                    ) : (
                      <>
                        <DateTimeField
                          sx={{
                            mt: 3
                          }}
                          disabled="true"
                          label="시작일"
                          value={
                            (new Date(startDate).getHours() >= 6 && new Date(startDate).getHours() <= 10) == false
                              ? dayjs(`${startDate}`)
                              : dayjs(`${startDate}`)
                          }
                        />
                        <DateTimeField
                          sx={{
                            mt: 3
                          }}
                          disabled="true"
                          label="종료일"
                          value={
                            (new Date(startDate).getHours() >= 6 && new Date(startDate).getHours() <= 10) == false
                              ? dayjs(`${endDate}`)
                              : dayjs(`${endDate}`)
                          }
                        />
                      </>
                    )}
                  </LocalizationProvider>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{
                      border: '1px solid #ccc', // 테두리 스타일 및 색상 지정
                      borderRadius: '4px', // 테두리를 둥글게 만들기 위한 속성
                      padding: '16px', // 내부 여백 설정
                      mt: 2
                    }}
                  >
                    <Grid pl sx={{ mt: -2, mb: 0.5 }}>
                      <h3>메모</h3>
                    </Grid>
                    <Grid sx={{ ml: -2, mt: -2 }}>
                      <CalendarDepWorkMemo />
                    </Grid>
                  </Grid>
                </>
              )
            )}
          </FormControl>
        </Grid>
      </Box>
    );
  };

  return (
    <Drawer sx={{ zIndex: '1300' }} anchor={'right'} open={clickPublicView} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}
