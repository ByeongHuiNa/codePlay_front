/* eslint-disable no-unused-vars */
// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import InputSeach from 'components/Input/InputSearch';
import SettingAccessTable from 'components/Table/SettingAccessTable';
import { useCriteria, useTabState } from 'store/module';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import { Box, Checkbox, FormControlLabel, Stack, Tab, Tabs } from '../../node_modules/@mui/material/index';
import { useEffect, useState } from 'react';
import BasicTab from 'components/tab/BasicTab';
import SettingAuthorityTable from 'components/Table/SettingAuthorityTable';
import AccessTab from 'components/tab/AccessTab';
import axios from '../../node_modules/axios/index';

// ==============================|| 관리자 접근관리 PAGE ||============================== //

const SettingAccess = () => {
  const [value, setVale] = useState(0);
  const handleChange = (event, newValue) => {
    setVale(newValue);
  };

  //zustand로 관리할 값들
  const { setIndex, setTab } = useTabState();
  const { setSearch } = useCriteria();
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
      setSearch('');
    }
    get();
  }, []);

  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Stack direction="row">
      <FormControlLabel label="Child 1" control={<Checkbox checked={checked[0]} onChange={handleChange2} />} />
      <FormControlLabel label="Child 2" control={<Checkbox checked={checked[1]} onChange={handleChange3} />} />
    </Stack>
  );

  return (
    <ComponentSkeleton>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="권한별" />
          <Tab label="개인 맞춤" />
        </Tabs>
      </Box>
      <BasicTab value={value} index={0}>
        <MainCard>
          <AccessTab />
          <Typography mt={2} variant="h4">
            사용자 페이지
          </Typography>
          <Stack>
            <FormControlLabel
              label="Parent"
              control={<Checkbox checked={checked[0] && checked[1]} indeterminate={checked[0] !== checked[1]} onChange={handleChange1} />}
            />
            {children}
          </Stack>
        </MainCard>
      </BasicTab>
      <BasicTab value={value} index={1}>
        <MainCard>
          <Typography mt={2} variant="h4">
            사용자명으로 검색
          </Typography>
          <InputSeach isPersonIcon={true}></InputSeach>
          <SettingAuthorityTable />
        </MainCard>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default SettingAccess;
