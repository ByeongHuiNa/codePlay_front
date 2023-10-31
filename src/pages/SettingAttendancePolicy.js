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

//zustand import

// ==============================|| 관리자 출퇴근 정책관리 PAGE ||============================== //

const SettingAttendancePolicy = () => {
  const { setIndex, setTab, index } = useTabState();
  const { setTableList } = useTableListState();
  const { view, setView } = useDetailCardState();
  const { setPage, setSearch, now_page } = useCriteria();

  //화면 초기값 셋팅
  useEffect(() => {
    setIndex(1);
    setIndex(0);
    async function get() {
      const endPoints = ['/policy-count'];
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      const tabs = [];
      for (let i of result[0].data) {
        const tab_temp = {
          id: i.policy_no,
          name: i.policy_name,
          number: i.count,
          total: Math.floor(i.count / 7) + (i.count % 7) == 0 ? 0 : 1
        };
        tabs.push(tab_temp);
      }
      setTab(tabs);
      setView(false);
      setSearch('');
    }
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function get() {
      setPage(1);
      const result = await axios.get(`/user-policy-list?policy_no=${index + 1}&page=1&limit=7`);
      setTableList(result.data);
      setView(false);
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

  //TODO:user_name으로 검색되게
  // async function search_user(search) {
  //   setPage(1);
  //   const result = await axios.get(`/user-policy-list?user_name=${search}&page=1&limit=${limit}`);
  //   setTableList(result.data);
  // }

  return (
    <>
      <Typography variant="h2">정규 출/퇴근 정책</Typography>
      <Grid container direction="row">
        <Grid item xs={view == 1 ? 8 : 12}>
          <MainCard>
            {/* TODO: 추후 기능 구현 
            <Typography variant="h4">사용자명으로 검색</Typography>
            <InputSeach isPersonIcon={true} onClick={() => search_user(search)}></InputSeach> */}
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
