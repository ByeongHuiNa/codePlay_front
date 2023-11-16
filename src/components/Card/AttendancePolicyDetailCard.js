import MainCard from 'components/MainCard';
import { Avatar, Button, MenuItem, Stack, TextField, Typography } from '../../../node_modules/@mui/material/index';
import { useDetailCardState, useTabState } from 'store/module';
import BasicTimePicker from 'components/DatePicker/BasicTimePicker';
import dayjs from 'dayjs';
import axios from '../../../node_modules/axios/index';

const AttendancePolicyDetailCard = () => {
  const { tab } = useTabState();
  const { content, setView, setContent } = useDetailCardState();

  const changeTime = (value, type) => {
    const temp = { ...content };
    temp[`standard_${type}_time`] = value.format('H:mm');
    setContent(temp);
  };

  const changeInput = (value) => {
    const temp = { ...content };
    temp.policy_no = value;
    temp[`standard_start_time`] = dayjs(`0000T${7 + Number(value)}`);
    temp[`standard_end_time`] = dayjs(`0000T${16 + Number(value)}`);
    setContent(temp);
  };
  const savePolice = () => {
    axios.post('/user-policy-detail', content);
    //TODO: post이후 rerendering 안됨.(위의 숫자라도 바뀌게끔)
  };

  return (
    <MainCard sx={{ pt: 2, pr: 3, pl: 3, borderRadius: 0, height: '45rem' }} content={false}>
      <Stack direction="column" spacing={2}>
        {Object.keys(content).length > 0 && (
          <>
            <TextField select value={content.policy_no} size="normal" sx={{ width: 'auto' }} onChange={(e) => changeInput(e.target.value)}>
              {Object.keys(tab).length > 0 &&
                tab.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
            <Stack direction="row" justifyContent="center" mb={3}>
              <Avatar src={content.user_profile} sx={{ width: 150, height: 150 }}></Avatar>
            </Stack>
            <Stack direction="row" justifyContent="space-around">
              <Typography variant="h4">{content.user_name}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-around">
              <Typography variant="body2"> {`${content.dept_name}/${content.user_position}`}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-around" spacing={2} alignItems="center">
              <BasicTimePicker
                label={'출근시간'}
                value={dayjs(content.standard_start_time)}
                onChange={(newValue) => changeTime(newValue, 'start')}
              />
              <BasicTimePicker
                label={'퇴근시간'}
                value={dayjs(content.standard_end_time)}
                onChange={(newValue) => changeTime(newValue, 'end')}
              />
            </Stack>
          </>
        )}
        <Button
          onClick={() => {
            setView(false);
            savePolice();
          }}
        >
          저장
        </Button>
      </Stack>
    </MainCard>
  );
};

export default AttendancePolicyDetailCard;
