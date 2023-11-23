import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid, ListItemButton } from '../../../node_modules/@mui/material/index';
import { useCalendarGetScheduleList, useMemoList } from 'store/module';
import axios from '../../../node_modules/axios/index';

export default function CalendarDepWorkList() {
  const { shereDataList } = useCalendarGetScheduleList();
  // eslint-disable-next-line no-unused-vars
  const { setMemoList, setScheduleNo, setLeaveNo } = useMemoList();
  const handleToggle = (e) => {
    console.log(e);
    axios.get(`/user-dep-schedulememo?schedule_no=${e}`).then((item) => {
      setMemoList(item.data);
    });
    setScheduleNo(e);
    setLeaveNo(0);
  };

  const currentDate = new Date();

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 260, overflow: 'auto' }}>
        {shereDataList
          .filter((value) => value.schedule_share == true)
          .sort((a, b) => new Date(a.schedule_startday) - new Date(b.schedule_startday))
          .map((value) => {
            console.log(value);
            const originalStartDateTime = value.schedule_startday; // 시작 날짜 및 시간
            const originalEndDateTime = value.schedule_endday; // 종료 날짜 및 시간

            // 시작 날짜 포맷
            const originalStartDate = new Date(originalStartDateTime.split('T')[0]);
            const formattedStartDate = `${originalStartDate.getFullYear()}-${(originalStartDate.getMonth() + 1)
              .toString()
              .padStart(2, '0')}-${originalStartDate.getDate().toString().padStart(2, '0')}`;

            // 종료 날짜 포맷
            const originalEndDate = new Date(originalEndDateTime.split('T')[0]);
            const formattedEndDate = `${originalEndDate.getFullYear()}-${(originalEndDate.getMonth() + 1)
              .toString()
              .padStart(2, '0')}-${originalEndDate.getDate().toString().padStart(2, '0')}`;

            const scheduleEndDay = new Date(originalEndDate);
            const scheduleStartDay = new Date(originalStartDate);

            if (
              scheduleEndDay > currentDate ||
              (scheduleEndDay.getFullYear() === currentDate.getFullYear() &&
                scheduleEndDay.getMonth() === currentDate.getMonth() &&
                scheduleStartDay.getDate() <= currentDate.getDate() &&
                currentDate.getDate() <= scheduleEndDay.getDate())
            ) {
              return (
                <>
                  <ListItem alignItems="flex-start" sx={{ p: 0.5 }}>
                    <ListItemButton role={undefined} onClick={() => handleToggle(value.schedule_no)} dense>
                      <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <Grid item xs={2} sx={{ ml: -1 }}>
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={value.user.user_profile} sx={{ width: 30, height: 30 }} />
                          </ListItemAvatar>
                        </Grid>
                        <Grid item xs={6} sx={{ ml: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          <ListItemText>
                            <Grid container direction="column" justifyContent="center" alignItems="flex-start" sx={{ ml: -1 }}>
                              <Typography component="span" variant="body2" color="text.primary">
                                {value.user.user_name}
                              </Typography>
                              <Typography component="span" variant="body3" color="text.primary">
                                {value.schedule_title}
                              </Typography>
                            </Grid>
                          </ListItemText>
                        </Grid>
                        <Grid item xs={4}>
                          <ListItemText>
                            <Grid container direction="column" justifyContent="space-between" alignItems="center" sx={{ ml: 1.5 }}>
                              <Typography component="span" variant="body2" color="text.primary">
                                {formattedStartDate}
                              </Typography>
                              <Typography component="span" variant="body2" color="text.primary">
                                {formattedEndDate}
                              </Typography>
                            </Grid>
                          </ListItemText>
                        </Grid>
                      </Grid>
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            }
          })}
      </List>
    </>
  );
}
