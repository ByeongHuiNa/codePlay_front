// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import InputSeach from 'components/Input/InputSearch';
import { Grid } from '../../node_modules/@mui/material/index';

//icon import

import { useCriteria, useDetailCardState, useTabState, useTableListState } from 'store/module';
import { useEffect } from 'react';
import axios from '../../node_modules/axios/index';
import SettingAuthorityTable from 'components/Table/SettingAuthorityTable';
import SettingTab from 'components/tab/SettingTab';

import AuthorityDetailCard from 'components/Card/AuthorityDetailCard';

//zustand import

// ==============================|| 관리자 권한관리 PAGE ||============================== //

const SettingAuthority = () => {
  //zustand로 관리할 값들
  const { setIndex, setTab, index } = useTabState();
  const { setTableList } = useTableListState();
  const { view, setView } = useDetailCardState();
  const { setPage, setSearch } = useCriteria();
  //화면 초기값 셋팅
  useEffect(() => {
    setIndex(0);
    async function get() {
      const endPoints = ['http://localhost:8000/role_count'];
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      const tabs = [];
      for (let i of result[0].data) {
        const tab_temp = {
          id: i.role_level,
          name: i.role_name,
          number: i.count
        };
        tabs.push(tab_temp);
      }
      setTab(tabs);
      setView(false);
      setSearch('');
    }
    get();
  }, []);

  //index 값(탭) 변경시 테이블 변경 셋팅
  useEffect(() => {
    async function get() {
      setPage(1);
      const result = await axios.get(`http://localhost:8000/role_query_list?role_level=${index}&_page=1&_limit=7`);
      setTableList(result.data);
      setView(false);
    }
    get();
  }, [index]);

  return (
    <>
      <Typography variant="h2">권한관리</Typography>
      <Grid container direction="row">
        <Grid item xs={view == 1 ? 8 : 12}>
          <MainCard>
            <Typography variant="h4">사용자명으로 검색</Typography>
            <InputSeach isPersonIcon={true} onClick={() => console.log('test')}></InputSeach>
            <SettingTab />
            <SettingAuthorityTable />
          </MainCard>
        </Grid>
        {view == 1 && (
          <Grid item xs={4}>
            <AuthorityDetailCard></AuthorityDetailCard>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SettingAuthority;
