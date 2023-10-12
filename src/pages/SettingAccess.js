// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import InputSeach from 'components/Input/InputSearch';
import SettingAccessTable from 'components/Table/SettingAccessTable';

// ==============================|| 관리자 접근관리 PAGE ||============================== //

const SettingAccess = () => (
  <>
    <Typography variant="h2">접근관리</Typography>
    <MainCard>
      <Typography variant="h4">사용자명으로 검색</Typography>
      <InputSeach isPersonIcon={true}></InputSeach>
      <SettingAccessTable />
    </MainCard>
  </>
);

export default SettingAccess;
