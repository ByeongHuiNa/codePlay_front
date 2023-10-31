import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useCalendarMemoModal } from 'store/module';
import { Avatar, Divider, ListItemAvatar, ListItemText, TextField, Typography } from '../../../node_modules/@mui/material/index';

// eslint-disable-next-line react/prop-types
export default function CalendarMemoModalContent() {
  const { setMemoView } = useCalendarMemoModal();
  const [textValue, setTextValue] = React.useState('');

  const handleTextFieldChange = (event) => {
    setTextValue(event.target.value);
  };

  return (
    <>
      <Divider />
      <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{ mt: 3 }}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://picsum.photos/200" sx={{ width: 40, height: 40, ml: 2 }} />
        </ListItemAvatar>
        <ListItemText>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start" sx={{ ml: 2 }}>
            <Typography component="span" variant="body1" color="text.primary">
              {`이름`}
            </Typography>
            <Typography component="span" variant="body2" color="text.primary">
              {`직급 및 팀명`}
            </Typography>
          </Grid>
        </ListItemText>
      </Grid>

      <TextField
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
          variant="contained"
          color="error" // 확인 버튼은 primary 스타일
          onClick={() => setMemoView(false)} // handleConfirm 함수를 호출하도록 설정
          sx={{ mt: 3, mr: 65 }} // 상단 여백 및 우측 여백 설정
        >
          삭제
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary" // 확인 버튼은 primary 스타일
          onClick={() => setMemoView(false)} // handleConfirm 함수를 호출하도록 설정
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
