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
import SettingAttendancePolicyTable from 'components/Table/SettingAttendancePolicyTable';
import SettingTab from 'components/tab/SettingTab';
import AttendancePolicyDetailCard from 'components/Card/AttendancePolicyDetailCard';

//zustand import

// ==============================|| 관리자 권한관리 PAGE ||============================== //

const SettingAttendancePolicy = () => {
  const { setIndex, setTab } = useTabState();
  const { setTableList } = useTableListState();
  const { view, setView } = useDetailCardState();
  const { setSearch } = useCriteria();

  //화면 초기값 셋팅
  useEffect(() => {
    setIndex(0);
    async function get() {
      const endPoints = ['http://localhost:8000/policy_count', 'http://localhost:8000/role_query_list'];
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      const tabs = [];
      for (let i of result[0].data) {
        const tab_temp = {
          id: i.policy_no,
          name: i.policy_name,
          number: i.count
        };
        tabs.push(tab_temp);
      }
      setTab(tabs);
      setTableList(result[1].data);
      setView(false);
      setSearch('');
    }
    get();
  }, []);

  return (
    <>
      <Typography variant="h2">정규 출/퇴근 정책</Typography>
      <Grid container direction="row">
        <Grid item xs={view == 1 ? 8 : 12}>
          <MainCard>
            <Typography variant="h4">사용자명으로 검색</Typography>
            <InputSeach isPersonIcon={true}></InputSeach>
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
