import MainCard from 'components/MainCard';
import { Avatar, Button, IconButton, MenuItem, Stack, TextField, Typography } from '../../../node_modules/@mui/material/index';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDetailCardState } from 'store/module';

const AuthorityDetailCard = () => {
  //권한 고정(사용자, 근태담당자, 관리자, 메인관리자 추가 불가능)
  const { setView } = useDetailCardState();

  const authority = [
    {
      value: 'user',
      label: '사용자'
    },
    {
      value: 'attendanceManager',
      label: '근태담당자'
    },
    {
      value: 'userManager',
      label: '관리자'
    },
    {
      value: 'mainManager',
      label: '메인관리자'
    }
  ];

  return (
    <MainCard>
      <Stack direction="row" justifyContent="center" mb={3}>
        <Avatar src="https://picsum.photos/id/1/200/300" sx={{ width: 150, height: 150 }}></Avatar>
      </Stack>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="h4">홍길동</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="body2">개발팀/연구원</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-around" alignItems="center">
          <TextField select size="normal" sx={{ width: '8rem' }} defaultValue="user">
            {authority.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" justifyContent="space-around" alignItems="center">
          <TextField select size="normal" sx={{ width: '8rem' }} defaultValue="user">
            {authority.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField select size="normal" sx={{ width: '8rem' }} defaultValue="1">
            <MenuItem value={1}>인사팀</MenuItem>
          </TextField>
          <IconButton>
            <RemoveIcon />
          </IconButton>
        </Stack>
        <Button onClick={() => setView(false)}>저장</Button>
      </Stack>
    </MainCard>
  );
};
export default AuthorityDetailCard;
