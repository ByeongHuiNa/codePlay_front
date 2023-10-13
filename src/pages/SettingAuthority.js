// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import InputSeach from 'components/Input/InputSearch';
import SettingAccessTable from 'components/Table/SettingAccessTable';
import { Avatar, Box, Grid, IconButton, MenuItem, Stack, Tab, Tabs, TextField } from '../../node_modules/@mui/material/index';

//icon import
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTabState, useTableListState } from 'store/module';
import { useEffect } from 'react';
import axios from '../../node_modules/axios/index';

//zustand import

// ==============================|| 관리자 권한관리 PAGE ||============================== //

const SettingAuthority = () => {
  const { index, setIndex, tabNum, setTabNum } = useTabState();
  const { setTableList } = useTableListState();
  const endPoints = ['http://localhost:8000/get_authority_number', 'http://localhost:8000/get_user_authority_list?role=ROLE_USER'];

  useEffect(() => {
    setIndex(0);
    async function get() {
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      const temptabNum = {};
      for (let i of result[0].data) {
        temptabNum[i.id] = i.number;
      }
      setTabNum(temptabNum);
      console.log(result[1]);
      setTableList(result[1].data);
    }
    get();
  }, []);

  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };

  //권한 고정(사용자, 근태담당자, 관리자, 메인관리자 추가 불가능)
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
    <>
      <Typography variant="h2">권한관리</Typography>
      <Grid container xs={12} direction="row">
        <Grid item xs={index == 1 ? 8 : 12}>
          <MainCard>
            <Typography variant="h4">사용자명으로 검색</Typography>
            <InputSeach isPersonIcon={true}></InputSeach>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={index} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={`사용자(${tabNum.user})`} />
                <Tab label={`근태담당자(${tabNum.attendanceManager})`} />
                <Tab label={`관리자(${tabNum.userManager})`} />
                <Tab label={`메인관리자(${tabNum.mainManager})`} />
                {tabNum.custom == 0 ? '' : <Tab label={`맞춤접근사용자(${tabNum.custom})`} />}
              </Tabs>
            </Box>
            <SettingAccessTable />
          </MainCard>
        </Grid>
        <Grid item xs={4} hidden={index == 1 ? '' : 'disable'}>
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
                <TextField select size="normal" sx={{ width: '8rem' }}>
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
                <TextField select size="normal" sx={{ width: '8rem' }}>
                  {authority.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <IconButton>
                  <RemoveIcon />
                </IconButton>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingAuthority;
