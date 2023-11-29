import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, ListItemButton, TextField } from '../../../node_modules/@mui/material/index';
import { useCalendarMemoModal, useMemoDetail, useMemoList } from 'store/module';
import { Done } from '../../../node_modules/@mui/icons-material/index';
import axios from '../../../node_modules/axios/index';
import { jwtDecode } from '../../../node_modules/jwt-decode/build/cjs/index';

// eslint-disable-next-line react/prop-types
export default function CalendarDepWorkMemo() {
  const token = jwtDecode(localStorage.getItem('token').slice(7));
  const { setMemoView } = useCalendarMemoModal();
  const { setMemoList, memoList, scheduleNo, leaveNo } = useMemoList();
  const { setMemoDetail } = useMemoDetail();
  const [value, setValue] = React.useState('');
  console.log(memoList);

  React.useEffect(() => {
    setValue('');
  }, [memoList]);

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  const handleToggle = (value) => {
    console.log(value);
    setMemoDetail(value);
    setMemoView(true);
  };

  const handleIconClick = () => {
    console.log(scheduleNo);
    const memoVo = {
      schedule_no: scheduleNo == 0 ? null : scheduleNo,
      schedule_memo_writer: token.user_no,
      schedule_memo_content: value,
      leaveapp_no: leaveNo == 0 ? null : leaveNo
    };
    axios.post(`/user-dep-memo`, memoVo).then(() => {
      if (scheduleNo != 0) {
        axios.get(`/user-dep-schedulememo?schedule_no=${scheduleNo}`).then((item) => {
          setMemoList(item.data);
        });
      } else {
        axios.get(`/user-dep-leavememo?leave_no=${leaveNo}`).then((item) => {
          setMemoList(item.data);
        });
      }
      setValue('');
    });
  };
  return (
    <>
      <List sx={{ width: '90%', maxWidth: 360, bgcolor: 'background.paper', height: 280, maxHeight: 280, overflow: 'auto' }}>
        {Object.keys(memoList).length > 0 &&
          memoList
            .sort((a, b) => new Date(b.schedule_memo_create) - new Date(a.schedule_memo_create))
            .map((value) => {
              // 메모를 생성한 시간 (예: '2023-11-13T14:27:39.303')
              const memoCreateTime = new Date(value.schedule_memo_create);

              // 현재 시간을 얻기
              const now = new Date();

              // 두 날짜의 차이 (밀리초 단위)
              const timeDifference = now - memoCreateTime;

              // 차이를 초 단위로 변환
              const secondsDifference = Math.floor(timeDifference / 1000);

              var displayText = '';

              // 초 단위에 따라 다른 메시지 설정
              if (secondsDifference < 60) {
                displayText = '1분 미만';
              } else if (secondsDifference < 3600) {
                const minutes = Math.floor(secondsDifference / 60);
                displayText = `${minutes}분 전`;
              } else if (secondsDifference < 86400) {
                const hours = Math.floor(secondsDifference / 3600);
                displayText = `${hours}시간 전`;
              } else {
                const days = Math.floor(secondsDifference / 86400);
                displayText = `${days}일 전`;
              }
              return (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemButton role={undefined} onClick={() => handleToggle(value)} dense sx={{ mr: -1.5 }}>
                      <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <Grid item xs={2} sx={{ ml: -0.5 }}>
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={value.user.user_profile} sx={{ width: 30, height: 30 }} />
                          </ListItemAvatar>
                        </Grid>
                        <Grid item xs={7} sx={{ ml: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          <ListItemText>
                            <Grid container direction="column" justifyContent="center" alignItems="flex-start" sx={{ ml: -1 }}>
                              <Typography component="span" variant="body2" color="text.primary">
                                {value.user.user_name}
                              </Typography>
                              <Typography component="span" variant="body3" color="text.primary">
                                {value.schedule_memo_content}
                              </Typography>
                            </Grid>
                          </ListItemText>
                        </Grid>
                        <Grid item xs={3} sx={{ mr: -1 }}>
                          <ListItemText primary={displayText} />
                        </Grid>
                      </Grid>
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
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
            <IconButton color="primary" onClick={() => handleIconClick()} sx={{ mr: -1 }}>
              <Done />
            </IconButton>
          )
        }}
        sx={{ width: 290, ml: 1.7, mt: 1.5, mb: -0.5 }}
      />
    </>
  );
}
