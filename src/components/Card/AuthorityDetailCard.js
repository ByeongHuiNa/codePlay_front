import MainCard from 'components/MainCard';
import { Avatar, Button, IconButton, MenuItem, Stack, TextField, Typography } from '../../../node_modules/@mui/material/index';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDetailCardState, useTabState } from 'store/module';
import { v4 as uuidv4 } from 'uuid';

const AuthorityDetailCard = () => {
  //권한 고정(사용자, 근태담당자, 관리자, 메인관리자 추가 불가능)
  const { setView, content, setContent } = useDetailCardState();
  const { tab } = useTabState();

  function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (1 + date.getMonth())).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
  }

  const addRole = () => {
    const temp = { ...content };
    temp.role.push({ id: uuidv4(), role_level: 1, role_designated_date: getToday() });
    setContent(temp);
  };

  const removeRole = (id) => {
    const temp = { ...content };
    temp.role = temp.role.filter((role) => role.id !== id);
    setContent(temp);
  };

  const changeRole = (value, role) => {
    const temp = { ...content };
    role = { ...role, role_level: value, role_name: 'test' };
    temp.role = temp.role.filter((pre) => pre.id !== role.id);
    temp.role.push(role);
    setContent(temp);
  };
  return (
    <MainCard>
      <Stack direction="row" justifyContent="center" mb={3}>
        <Avatar src={content.user_profile} sx={{ width: 150, height: 150 }}></Avatar>
      </Stack>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="h4">{content.user_name}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="body2"> {`${content.dept_name}/${content.user_position}`}</Typography>
        </Stack>
        {Object.keys(content).length > 0 &&
          content.role.map((value, index) => {
            return (
              <Stack direction="row" justifyContent="space-around" alignItems="center" key={index}>
                <TextField
                  select
                  size="normal"
                  sx={{ width: '8rem' }}
                  value={value.role_level}
                  onChange={(e) => changeRole(e.target.value, value)}
                  inputProps={index == 0 ? { readOnly: true } : {}}
                >
                  {Object.keys(tab).length > 0 &&
                    tab
                      .filter((value) => value.id != 4)
                      .map((tabItem) => (
                        <MenuItem key={tabItem.id} value={tabItem.id}>
                          {tabItem.name}
                        </MenuItem>
                      ))}
                </TextField>
                {value.role_level == 1 ? (
                  <TextField select size="normal" sx={{ width: '8rem' }} defaultValue="1">
                    <MenuItem value={1}>인사팀</MenuItem>
                  </TextField>
                ) : (
                  ''
                )}
                <IconButton onClick={index == 0 ? () => addRole() : () => removeRole(value.id)}>
                  {index == 0 ? <AddIcon /> : <RemoveIcon />}
                </IconButton>
              </Stack>
            );
          })}
        <Button onClick={() => setView(false)}>저장</Button>
      </Stack>
    </MainCard>
  );
};
export default AuthorityDetailCard;
