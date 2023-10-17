// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import InputSeach from 'components/Input/InputSearch';
import { Box, Grid, Tab, Tabs } from '../../node_modules/@mui/material/index';

//icon import

import { useDetailCardState, useTabState, useTableListState } from 'store/module';
import { useEffect } from 'react';
import axios from '../../node_modules/axios/index';
import SettingAuthorityTable from 'components/Table/SettingAuthorityTable';
import AuthorityDetailCard from 'components/Card/AuthorityDetailCard';

//zustand import

// ==============================|| 관리자 권한관리 PAGE ||============================== //

const SettingAuthority = () => {
  //zustand로 관리할 값들
  const { index, setIndex, tabNum, setTabNum } = useTabState();
  const { setTableList } = useTableListState();
  const { view } = useDetailCardState();
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
      setTableList(result[1].data);
    }
    get();
  }, []);

  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };

  return (
    <>
      <Typography variant="h2">권한관리</Typography>
      <Grid container xs={12} direction="row">
        <Grid item xs={view == 1 ? 8 : 12}>
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
            <SettingAuthorityTable />
          </MainCard>
        </Grid>
        <Grid item xs={4} hidden={view == 1 ? '' : 'disable'}>
          <AuthorityDetailCard></AuthorityDetailCard>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingAuthority;
