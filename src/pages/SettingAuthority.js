// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import InputSeach from 'components/Input/InputSearch';
import SettingAccessTable from 'components/Table/SettingAccessTable';
import { Avatar, Box, Grid, IconButton, MenuItem, Stack, Tab, Tabs, TextField } from '../../node_modules/@mui/material/index';
import { useState } from 'react';

//icon import
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// ==============================|| 관리자 권한관리 PAGE ||============================== //

const SettingAuthority = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let personNumber = {
    user: 200,
    attendanceManager: 20,
    userManager: 2,
    mainManager: 1,
    custom: 5
  };
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
        <Grid item xs={value == 1 ? 8 : 12}>
          <MainCard>
            <Typography variant="h4">사용자명으로 검색</Typography>
            <InputSeach isPersonIcon={true}></InputSeach>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={`사용자(${personNumber.user})`} />
                <Tab label={`근태담당자(${personNumber.attendanceManager})`} />
                <Tab label={`관리자(${personNumber.userManager})`} />
                <Tab label={`메인관리자(${personNumber.mainManager})`} />
                {personNumber.custom == 0 ? '' : <Tab label={`맞춤접근사용자(${personNumber.custom})`} />}
              </Tabs>
            </Box>
            <SettingAccessTable />
          </MainCard>
        </Grid>
        <Grid item xs={4} hidden={value == 1 ? '' : 'disable'}>
          <MainCard>
            <Stack direction="row" justifyContent="center" mb={3}>
              <Avatar sx={{ width: 150, height: 150 }}>프로필 사진</Avatar>
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
