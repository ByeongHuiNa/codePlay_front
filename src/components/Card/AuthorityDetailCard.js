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
  const { tab, setTab, setIndex } = useTabState();
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
    if (temp.attend_ma == null) {
      temp.attend_ma = [{ dept_no: 1 }];
    }
    setContent(temp);
  };

  const removeRole = (id) => {
    const temp = { ...content };
    console.log(temp);
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

  const changeAttend_ma = (value) => {
    const temp = { ...content };
    const attend_ma = [{ dept_no: value }];
    temp.attend_ma = attend_ma;
    setContent(temp);
  };

  async function save() {
    const RoleQueryUserDetailRequestVo = {
      user_no: id,
      role: content
    };
    await axios.post(`/role-save`, RoleQueryUserDetailRequestVo).then((res) => {
      for (let i of res.data.preRoleLevel) {
        const temp = tab.filter((item) => item.id == i);
        for (let j of temp) {
          j.number = j.number - 1;
        }
      }
      for (let i of res.data.postRoleLevel) {
        const temp = tab.filter((item) => item.id == i);
        for (let j of temp) {
          j.number = j.number + 1;
        }
      }
      setTab(tab);
      setIndex(res.data.postRoleLevel[0] - 1);
    });
    alert('권한변경 되었습니다.');
  }

  return (
    <MainCard sx={{ pt: 2, pr: 3, pl: 3, borderRadius: 0, height: '45rem' }} content={false}>
      <Stack direction="row" justifyContent="center" mb={3} mt="4rem">
        <Avatar src={tableContentList.find((e) => e.user_no == id).user_profile} sx={{ width: 150, height: 150 }}></Avatar>
      </Stack>
      <Stack direction="column" spacing={1} mb={3}>
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="h4">{tableContentList.find((e) => e.user_no == id).user_name}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-around">
          <Typography variant="body2">
            {`${tableContentList.find((e) => e.user_no == id).dept_name}/${tableContentList.find((e) => e.user_no == id).user_position}`}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="column" spacing={3}>
        {Object.keys(content).length > 0 &&
          content.role.map((value, index) => {
            return (
              <Stack direction="row" justifyContent="space-between" alignItems="center" key={index} sx={{ pl: 3, pr: 3 }}>
                <TextField
                  select
                  size="normal"
                  sx={value.role_level == 2 ? { width: '8rem' } : { width: '18rem' }}
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
                    value={content.attend_ma[0].dept_no}
                    onChange={(e) => changeAttend_ma(e.target.value)}
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
        <Stack direction="row" justifyContent="space-around">
          <Button
            variant="contained"
            sx={{ width: '23rem' }}
            onClick={() => {
              setView(false);
              save();
            }}
          >
            저장
          </Button>
        </Stack>
      </Stack>
    </MainCard>
  );
};
export default AuthorityDetailCard;
