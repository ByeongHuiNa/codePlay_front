import MainCard from 'components/MainCard';
// eslint-disable-next-line no-unused-vars
import { Avatar, Button, IconButton, MenuItem, Stack, TextField, Typography } from '../../../node_modules/@mui/material/index';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDeptListState, useDetailCardState, useTabState, useTableListState } from 'store/module';
import { v4 as uuidv4 } from 'uuid';
import axios from '../../../node_modules/axios/index';

const AuthorityDetailCard = () => {
  //권한 고정(사용자, 근태담당자, 관리자, 메인관리자 추가 불가능)
  const { setView, content, setContent, id } = useDetailCardState();
  const { tableContentList } = useTableListState();
  const { tab } = useTabState();
  const { deptList } = useDeptListState();
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
  //TODO:Attend_ma 로 변경시 객체에 내용 수정필요
  // const changeAttend_ma = (value) => {
  //   const temp = { ...content };
  //   attend_ma = [{ ...attend_ma, dept_no: value }];
  //   temp.attend_ma = attend_ma;
  //   setContent(temp);
  // };

  async function save() {
    const RoleQueryUserDetailRequestVo = {
      user_no: id,
      role: content
    };
    await axios.post(`/role-save`, RoleQueryUserDetailRequestVo);
  }

  return (
    <MainCard>
      <Stack direction="row" justifyContent="center" mb={3}>
        <Avatar src={tableContentList.find((e) => e.user_no == id).user_profile} sx={{ width: 150, height: 150 }}></Avatar>
      </Stack>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="h4">{tableContentList.find((e) => e.user_no == id).user_name}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="body2">
            {`${tableContentList.find((e) => e.user_no == id).dept_name}/${tableContentList.find((e) => e.user_no == id).user_position}`}
          </Typography>
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
                {value.role_level == 2 ? (
                  //TODO:여러개의 담당부서를 가질시 아래 컴포넌트 수정해야함.
                  <TextField
                    select
                    size="normal"
                    sx={{ width: '8rem' }}
                    value={content.attend_ma == null ? 1 : content.attend_ma[0].dept_no}
                  >
                    {Object.keys(deptList).length > 0 &&
                      deptList.map((dept) => {
                        return (
                          <MenuItem key={dept.dept_no} value={dept.dept_no}>
                            {dept.dept_name}
                          </MenuItem>
                        );
                      })}
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
        <Button
          onClick={() => {
            setView(false);
            save();
          }}
        >
          저장
        </Button>
      </Stack>
    </MainCard>
  );
};
export default AuthorityDetailCard;
