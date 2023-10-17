import MainCard from 'components/MainCard';
import { Avatar, MenuItem, Stack, TextField, Typography } from '../../../node_modules/@mui/material/index';
import { useTabState } from 'store/module';
import BasicTimePicker from 'components/DatePicker/BasicTimePicker';

const AttendancePolicyDetailCard = () => {
  const { tab } = useTabState();

  return (
    <MainCard>
      <Stack direction="column" spacing={2}>
        <TextField select defaultValue="eightToFive" size="normal" sx={{ width: 'auto' }}>
          {Object.keys(tab).length > 0 &&
            tab.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
        </TextField>
        <Stack direction="row" justifyContent="center" mb={3}>
          <Avatar src="https://picsum.photos/id/1/200/300" sx={{ width: 150, height: 150 }}></Avatar>
        </Stack>
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="h4">홍길동</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="body2">개발팀/연구원</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-around" spacing={2} alignItems="center">
          <BasicTimePicker label={'출근시간'} />
          <BasicTimePicker label={'퇴근시간'} />
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default AttendancePolicyDetailCard;
