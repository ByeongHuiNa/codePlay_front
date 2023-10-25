import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, ListItemButton, TextField } from '../../../node_modules/@mui/material/index';
import { useCalendarMemoModal } from 'store/module';
import { Done } from '../../../node_modules/@mui/icons-material/index';

// eslint-disable-next-line react/prop-types
export default function CalendarDepWorkMemo() {
  const { setMemoView } = useCalendarMemoModal();
  const [value, setValue] = React.useState('');

  const handleOnChange = (e) => {
    setValue(e.target.value);
  }
  const handleIconClick = () => {
    
  }
  return (
    <>
      <List sx={{ width: '110%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {[0, 1, 2, 3].map((value) => {
          return (
            <>
              <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                <ListItem>
                  <ListItemButton role={undefined} onClick={() => setMemoView(true)} dense>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30 }} />
                    </ListItemAvatar>
                    <ListItemText>
                      <Grid container direction="column" justifyContent="center" alignItems="flex-start" sx={{ ml: -1 }}>
                        <Typography component="span" variant="body2" color="text.primary">
                          {`이름 ${value}`}
                        </Typography>
                        <Typography component="span" variant="body3" color="text.primary">
                          {`사용자가 남긴 메모 내역`}
                        </Typography>
                      </Grid>
                    </ListItemText>
                    <ListItemText primary={`9:0${value} AM`} sx={{ ml: 1, mr: -1 }} />
                  </ListItemButton>
                </ListItem>
              </Grid>
              {value !== 3 && <Divider variant="inset" component="li" />}
            </>
          );
        })}
      </List>
      <TextField
        id="standard-name"
        variant="outlined"
        value={value}
        onChange={handleOnChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton color="primary" onClick={handleIconClick} >
              <Done sx={{ml : 2}}/>
            </IconButton>
          )
        }}
        sx={{ ml: 2, mt: -1, mb: -0.5 }}
      />
    </>
  );
}
