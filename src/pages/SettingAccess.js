// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import InputSeach from 'components/Input/InputSearch';
import { useAccessPage, useCriteria, useTabState } from 'store/module';
import { Box, Tab, Tabs } from '../../node_modules/@mui/material/index';
import { useEffect, useState } from 'react';
import SettingAuthorityTable from 'components/Table/SettingAuthorityTable';
import AccessTab from 'components/tab/AccessTab';
import axios from '../../node_modules/axios/index';
import AccessCheckbox from 'components/Checkbox/AccessCheckbox';

// ==============================|| 관리자 접근관리 PAGE ||============================== //

const SettingAccess = () => {
  const [value, setVale] = useState(0);
  const handleChange = (event, newValue) => {
    setVale(newValue);
  };

  //zustand로 관리할 값들
  const { setIndex, setTab } = useTabState();
  const { setSearch } = useCriteria();
  const { setAccessPage } = useAccessPage();
  // const { setRoleAccessPage } = useRoleAccessPage();

  //화면 초기값 셋팅
  useEffect(() => {
    async function get() {
      const endPoints = ['http://localhost:8000/role_count', 'http://localhost:8000/access_page_list'];
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
      setAccessPage(
        result[1].data.reduce(
          (groups, item) => ({
            ...groups,
            [item.page_default_role_no]: [...(groups[item.page_default_role_no] || []), { ...item, checked: item.page_no == 1 }]
          }),
          {}
        )
      );
      setIndex(0);
      setSearch('');
    }
    get();
  }, []);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="권한별" />
          <Tab label="개인 맞춤" />
        </Tabs>
      </Box>
      <div role="tabpanel" hidden={value !== 0} id={`simple-tabpanel-${0}`} aria-labelledby={`simple-tab-${0}`} value={value}>
        <MainCard>
          <AccessTab />
          <AccessCheckbox />
        </MainCard>
      </div>
      <div role="tabpanel" hidden={value !== 1} id={`simple-tabpanel-${1}`} aria-labelledby={`simple-tab-${1}`} value={value}>
        <MainCard>
          <Typography mt={2} variant="h4">
            사용자명으로 검색
          </Typography>
          <InputSeach isPersonIcon={true}></InputSeach>
          <SettingAuthorityTable />
        </MainCard>
      </div>
    </>
  );
};

export default SettingAccess;
