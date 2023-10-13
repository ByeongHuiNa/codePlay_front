// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import InputSeach from 'components/Input/InputSearch';
import SettingAccessTable from 'components/Table/SettingAccessTable';
import { Box, Tab, Tabs } from '../../node_modules/@mui/material/index';
import { useTabState } from 'store/module';

// ==============================|| 관리자 접근관리 PAGE ||============================== //

const SettingAccess = () => {
  const { index, setIndex } = useTabState();
  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };

  let personNumber = {
    default: 1,
    custom: 2
  };

  return (
    <>
      <Typography variant="h2">접근관리</Typography>
      <MainCard>
        <Typography variant="h4">사용자명으로 검색</Typography>
        <InputSeach isPersonIcon={true}></InputSeach>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={index} onChange={handleChange} aria-label="basic tabs example">
            <Tab label={`기본(${personNumber.default})`} />
            <Tab label={`맞춤(${personNumber.custom})`} />
          </Tabs>
        </Box>
        <SettingAccessTable />
      </MainCard>
    </>
  );
};

export default SettingAccess;
