// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { Grid } from '../../node_modules/@mui/material/index';

//icon import
import { useCriteria, useDetailCardState, useTabState, useTableListState } from 'store/module';
import { useEffect } from 'react';
import axios from '../../node_modules/axios/index';
import SettingAttendancePolicyTable from 'components/Table/SettingAttendancePolicyTable';
import SettingTab from 'components/tab/SettingTab';
import AttendancePolicyDetailCard from 'components/Card/AttendancePolicyDetailCard';
import InputSearch from 'components/Input/InputSearch';

//zustand import

// ==============================|| 관리자 출퇴근 정책관리 PAGE ||============================== //

const SettingAttendancePolicy = () => {
  const { setIndex, setTab, tab, index } = useTabState();
  const { setTableList } = useTableListState();
  const { view, setView } = useDetailCardState();
  const { setPage, setSearch, now_page, search, setTotalPage } = useCriteria();

  //화면 초기값 셋팅
  useEffect(() => {
    get();
    async function get() {
      const endPoints = ['/policy-count'];
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      const tabs = [];
      for (let i of result[0].data) {
        const tab_temp = {
          id: i.policy_no,
          name: i.policy_name,
          number: i.count,
          total: Math.floor(i.count / 7) + (i.count % 7 == 0 ? 0 : 1)
        };
        tabs.push(tab_temp);
      }
      setTab(tabs);
      setView(false);
      setSearch('');
    }
    setIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function get() {
      setPage(1);
      const result = await axios.get(`/user-policy-list?policy_no=${index + 1}&page=1&limit=7`);
      setTableList(result.data);
      setView(false);
      if (Object.keys(tab).length > 0) {
        setTotalPage(tab[index].total);
      }
    }
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    async function get() {
      const result = await axios.get(`/user-policy-list?policy_no=${index + 1}&page=${(now_page - 1) * 7 + 1}&limit=7`);
      setTableList(result.data);
      setView(false);
    }
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now_page]);

  async function search_user(search) {
    setPage(1);
    const result = await axios.get(`/user-policy-list?policy_no=${index + 1}&user_name=${search}&page=1&limit=7`);
    setTableList(result.data);
    setTotalPage(result.headers['x-total-count']);
  }

  return (
    <>
      <Typography variant="h2">정규 출/퇴근 정책</Typography>
      <Grid container direction="row">
        <Grid item xs={view == 1 ? 8 : 12}>
          <MainCard>
            <Typography variant="h4">사용자명으로 검색</Typography>
            <InputSearch isPersonIcon={true} onClick={() => search_user(search)}></InputSearch>
            <SettingTab></SettingTab>
            <SettingAttendancePolicyTable />
          </MainCard>
        </Grid>
        {view == 1 && (
          <Grid item xs={4}>
            <AttendancePolicyDetailCard></AttendancePolicyDetailCard>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SettingAttendancePolicy;
