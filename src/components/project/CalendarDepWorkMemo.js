import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid, ListItemButton, Pagination } from '../../../node_modules/@mui/material/index';
import { useCalendarMemoModal } from 'store/module';

// eslint-disable-next-line react/prop-types
export default function CalendarDepWorkMemo() {
  const { setMemoView } = useCalendarMemoModal();
  return (
    <>
      <List sx={{ width: '110%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {[0, 1, 2, 3].map((value) => {
          return (
            <>
              <ListItem alignItems="flex-start" sx={{ p: 0.5 }}>
                <ListItemButton role={undefined} onClick={() => setMemoView(true)} dense>
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30 }} />
                    </ListItemAvatar>
                    <ListItemText>
                      <Grid container direction="column" justifyContent="center" alignItems="flex-start" sx={{ ml: -1.5 }}>
                        <Typography component="span" variant="body2" color="text.primary">
                          {`이름 ${value}`}
                        </Typography>
                        <Typography component="span" variant="body3" color="text.primary" sx={{ textOverflow: 'ellipsis' }}>
                          {`사용자가 남긴 메모 내역`}
                        </Typography>
                      </Grid>
                    </ListItemText>
                    <ListItemText primary={`9:0${value} AM`} sx={{ ml: 2.5 }} />
                  </Grid>
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
      <Pagination count={5} variant="outlined" shape="rounded" />
    </>
  );
}
