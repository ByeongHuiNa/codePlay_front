import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid, ListItemButton, Pagination } from '../../../node_modules/@mui/material/index';

export default function CalendarDepWorkList() {
  // eslint-disable-next-line no-unused-vars
  const handleToggle = (value) => () => {
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];
    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }
    // setChecked(newChecked);
  };

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {[0, 1, 2, 3].map((value) => {
          return (
            <>
              <ListItem alignItems="flex-start" sx={{ p: 0.5 }}>
                <ListItemButton role={undefined} onClick={handleToggle()} dense>
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30 }} />
                    </ListItemAvatar>
                    <ListItemText primary={`이름 ${value}`} sx={{ ml: -1 }} />
                    <ListItemText primary={`일정 ${value}`} sx={{ ml: 1, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
                    <ListItemText>
                      <Grid container direction="column" justifyContent="space-between" alignItems="center" sx={{ ml: 1.5 }}>
                        <Typography component="span" variant="body2" color="text.primary">
                          {`2023-10-18 ~ `}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.primary">
                          {`2023-10-19`}
                        </Typography>
                      </Grid>
                    </ListItemText>
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
