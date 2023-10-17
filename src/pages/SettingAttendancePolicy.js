// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import InputSeach from 'components/Input/InputSearch';
import { Grid } from '../../node_modules/@mui/material/index';

//icon import
import { useTabState, useTableListState } from 'store/module';
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
  const endPoints = ['http://localhost:8000/get_policy_number', 'http://localhost:8000/get_user_authority_list?role=ROLE_USER'];

  useEffect(() => {
    setIndex(0);
    async function get() {
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      setTab(result[0].data);
      setTableList(result[1].data);
    }
    get();
  }, []);

  return (
    <>
      <Typography variant="h2">정규 출/퇴근 정책</Typography>
      <Grid container xs={12} direction="row">
        <Grid item xs={8}>
          <MainCard>
            <Typography variant="h4">사용자명으로 검색</Typography>
            <InputSeach isPersonIcon={true}></InputSeach>
            <SettingTab></SettingTab>
            <SettingAttendancePolicyTable />
          </MainCard>
        </Grid>
        <Grid item xs={4}>
          <AttendancePolicyDetailCard></AttendancePolicyDetailCard>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingAttendancePolicy;
