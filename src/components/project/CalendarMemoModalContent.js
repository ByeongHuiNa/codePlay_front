import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useCalendarMemoModal, useMemoDetail, useMemoList } from 'store/module';
import { Avatar, Divider, ListItemAvatar, ListItemText, TextField, Typography } from '../../../node_modules/@mui/material/index';
import axios from '../../../node_modules/axios/index';
import { jwtDecode } from '../../../node_modules/jwt-decode/build/cjs/index';

// eslint-disable-next-line react/prop-types
export default function CalendarMemoModalContent() {
  const token = jwtDecode(localStorage.getItem('token').slice(7));
  const { setMemoView } = useCalendarMemoModal();
  const { memoDetail } = useMemoDetail();
  const { setMemoList, scheduleNo, leaveNo } = useMemoList();
  const [textValue, setTextValue] = React.useState('');

  const handleTextFieldChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSave = () => {
    const memoVo = {
      schedule_no: scheduleNo == 0 ? null : scheduleNo,
      leaveapp_no: leaveNo == 0 ? null : leaveNo,
      schedule_memo_writer: token.user_no,
      schedule_memo_content: textValue,
      schedule_memo_no: memoDetail.schedule_memo_no
    };
    axios.patch(`/user-dep-memo`, memoVo).then(() => {
      if (scheduleNo != 0) {
        axios.get(`/user-dep-schedulememo?schedule_no=${scheduleNo}`).then((item) => {
          setMemoList(item.data);
        });
      } else {
        axios.get(`/user-dep-leavememo?leave_no=${leaveNo}`).then((item) => {
          setMemoList(item.data);
        });
      }
    });
    setMemoView(false);
  };

  const handleDelete = () => {
    axios.post(`/user-dep-memo-delete?memo_no=${memoDetail.schedule_memo_no}`).then(() => {
      if (scheduleNo != 0) {
        axios.get(`/user-dep-schedulememo?schedule_no=${scheduleNo}`).then((item) => {
          setMemoList(item.data);
        });
      } else {
        axios.get(`/user-dep-leavememo?leave_no=${leaveNo}`).then((item) => {
          setMemoList(item.data);
        });
      }
    });
    setMemoView(false);
  };

  React.useEffect(() => {
    setTextValue(memoDetail.schedule_memo_content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Divider />
      <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{ mt: 3 }}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={memoDetail.user.user_profile} sx={{ width: 40, height: 40, ml: 2 }} />
        </ListItemAvatar>
        <ListItemText>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start" sx={{ ml: 2 }}>
            <Typography component="span" variant="body2" color="text.primary">
              {memoDetail.user.user_position}
            </Typography>
            <Typography component="span" variant="body1" color="text.primary">
              {memoDetail.user.user_name}
            </Typography>
          </Grid>
        </ListItemText>
      </Grid>

      <TextField
        InputProps={{
          readOnly: memoDetail.schedule_memo_writer != token.user_no
        }}
        value={textValue}
        onChange={handleTextFieldChange}
        variant="outlined"
        multiline
        rows={10}
        sx={{ mt: 4, ml: 2, mr: 2, width: '95%', height: '50%' }}
      />

      <Grid container direction="row" justifyContent="flex-end" alignItems="center">
        <Button
          size="large"
          disabled={memoDetail.schedule_memo_writer != token.user_no}
          variant="contained"
          color="error" // 확인 버튼은 primary 스타일
          onClick={() => handleDelete()} // handleConfirm 함수를 호출하도록 설정
          sx={{ mt: 3, mr: 65 }} // 상단 여백 및 우측 여백 설정
        >
          삭제
        </Button>
        <Button
          size="large"
          disabled={memoDetail.schedule_memo_content == textValue}
          variant="contained"
          color="primary" // 확인 버튼은 primary 스타일
          onClick={() => handleSave()} // handleConfirm 함수를 호출하도록 설정
          sx={{ mt: 3, mr: 2 }} // 상단 여백 및 우측 여백 설정
        >
          저장
        </Button>
        <Button
          size="large"
          variant="contained"
          color="inherit" // 취소 버튼은 회색 스타일 (기본 스타일)
          onClick={() => setMemoView(false)} // handleCancel 함수를 호출하도록 설정
          sx={{ mt: 3, mr: 2 }} // 상단 여백 설정
        >
          취소
        </Button>
      </Grid>
    </>
  );
}
