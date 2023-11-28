// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { Grid } from '../../node_modules/@mui/material/index';

//icon import

import { useCriteria, useDeptListState, useDetailCardState, useTabState, useTableListState } from 'store/module';
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
  const { setPage, setSearch, now_page, setTotalPage } = useCriteria();
  const { setDeptList } = useDeptListState();

  //화면 초기값 셋팅
  useEffect(() => {
    setIndex('');
    setIndex(0);
    axios.get('/dept-list').then((res) => setDeptList(res.data));
    const tabs = [];
    axios.get('/role-count').then((res) => {
      for (let i of res.data) {
        const tab_temp = {
          id: i.role_level,
          name: i.role_name,
          number: i.count,
          total: Math.floor(i.count / 7) + (i.count % 7) == 0 ? 0 : 1
        };
        tabs.push(tab_temp);
      }
      setTab(tabs);
    });
    setView(false);
    setSearch('');
  }, []);

  //index 값(탭) 변경시 테이블 변경 셋팅
  useEffect(() => {
    async function get() {
      setPage(1);
      const result = await axios.get(`/role-query-list?role_level=${index + 1}&page=1&limit=7`);
      setTableList(result.data);
      setView(false);
      if (Object.keys(tab).length > 0) {
        setTotalPage(tab[index].total);
      }
    }
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  //index 값(탭) 변경시 테이블 변경 셋팅
  useEffect(() => {
    async function get() {
      const result = await axios.get(`/role-query-list?role_level=${index + 1}&page=${(now_page - 1) * 7 + 1}&limit=7`);
      setTableList(result.data);
      setView(false);
    }
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now_page]);

  return (
    <>
      <Typography variant="h2" mb={2}>
        권한관리
      </Typography>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={view == 1 ? 8 : 12}>
          <MainCard sx={{ pt: 2, pr: 3, pl: 3, ml: 2, mr: 2, height: '45rem' }} content={false}>
            {/*TODO: 추가 기능 구현예정 <Typography variant="h4">사용자명으로 검색</Typography>
            <InputSeach isPersonIcon={true}></InputSeach> */}
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
