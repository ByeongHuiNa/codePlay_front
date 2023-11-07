import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Chip } from '../../../node_modules/@mui/material/index';
import { useCalendarGetScheduleList } from 'store/module';

export default function CalendarList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const { dataList } = useCalendarGetScheduleList();

  dataList.sort((a, b) => {
    const dateA = new Date(a.schedule_startday);
    const dateB = new Date(b.schedule_startday);
    return dateA - dateB;
  });

  const currentDate = new Date();

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 267, overflow: 'auto' }}>
      {dataList.map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        const scheduleEndDay = new Date(value.schedule_endday);
        const scheduleStartDay = new Date(value.schedule_startday);

        if (
          scheduleEndDay > currentDate ||
          (scheduleEndDay.getFullYear() === currentDate.getFullYear() &&
            scheduleEndDay.getMonth() === currentDate.getMonth() &&
            scheduleStartDay.getDate() <= currentDate.getDate() &&
            currentDate.getDate() <= scheduleEndDay.getDate())
        ) {
          if (value.schedule_cardview) {
            return (
              <ListItem key={value.schedule_no} disablePadding>
                <ListItemButton role={undefined} onClick={handleToggle(value.schedule_no)} dense>
                  <ListItemIcon>
                    <Checkbox edge="start" tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.schedule_title} />
                  <Chip
                    label={
                      scheduleStartDay.getDate() <= currentDate.getDate() && currentDate.getDate() <= scheduleEndDay.getDate()
                        ? 'Today'
                        : `${scheduleStartDay.getDate() - currentDate.getDate()} day`
                    }
                    color="primary"
                    size="small"
                    variant={
                      scheduleStartDay.getDate() <= currentDate.getDate() && currentDate.getDate() <= scheduleEndDay.getDate()
                        ? ''
                        : 'outlined'
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          }
        }
      })}
    </List>
  );
}
