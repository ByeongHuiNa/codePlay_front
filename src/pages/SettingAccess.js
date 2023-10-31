// project import
import MainCard from 'components/MainCard';
import { useAccessPage, useCriteria, useTabState } from 'store/module';
import { Box, Button, Grid, Stack, Tab, Tabs } from '../../node_modules/@mui/material/index';
import { useEffect, useState } from 'react';
import SettingAuthorityTable from 'components/Table/SettingAuthorityTable';
import AccessTab from 'components/tab/AccessTab';
import axios from '../../node_modules/axios/index';
import AccessCheckbox from 'components/Checkbox/AccessCheckbox';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

// ==============================|| 관리자 접근관리 PAGE ||============================== //

const SettingAccess = () => {
  const navigate = useNavigate();

  const [value, setVale] = useState(0);
  const handleChange = (event, newValue) => {
    setVale(newValue);
  };

  //zustand로 관리할 값들
  const { setIndex, setTab, index } = useTabState();
  const { setSearch } = useCriteria();
  const { setAccessPage } = useAccessPage();
  // const { setRoleAccessPage } = useRoleAccessPage();

  //화면 초기값 셋팅
  useEffect(() => {
    async function get() {
      const endPoints = ['/role-count', '/access-page-list'];
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
      // setAccessPage(
      //   result[1].data.reduce(
      //     (groups, item) => ({
      //       ...groups,
      //       [item.page_default_role_no]: [...(groups[item.page_default_role_no] || []), { ...item, checked: item.page_no == 1 }]
      //     }),
      //     {}
      //   )
      // );
      setIndex(0);
      setSearch('');
    }
    get();
  }, []);

  //index 값(탭) 변경시 테이블 변경 셋팅
  useEffect(() => {
    async function get() {
      const result = await axios.get(`/role-access-page?role_level=${index + 1}`);
      setAccessPage(
        result.data[0].access_page_list.reduce(
          (groups, item) => ({
            ...groups,
            [item.page_default_role_level]: [...(groups[item.page_default_role_level] || []), { ...item, checked: item.role_level != null }]
          }),
          {}
        )
      );
    }
    get();
  }, [index]);

  return (
    <>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="권한별" />
            <Tab label="개인 맞춤" />
          </Tabs>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">변경사항 저장</Button>
          <Button variant="contained" onClick={() => navigate(-1)}>
            변경취소
          </Button>
        </Stack>
      </Grid>
      <div role="tabpanel" hidden={value !== 0} id={`simple-tabpanel-${0}`} aria-labelledby={`simple-tab-${0}`} value={value}>
        <MainCard>
          <AccessTab />
          <AccessCheckbox />
        </MainCard>
      </div>
      <div role="tabpanel" hidden={value !== 1} id={`simple-tabpanel-${1}`} aria-labelledby={`simple-tab-${1}`} value={value}>
        <MainCard>
          {/* <Typography mt={2} variant="h4">
            사용자명으로 검색
          </Typography>
          <InputSeach isPersonIcon={true}></InputSeach> */}
          <SettingAuthorityTable />
        </MainCard>
      </div>
    </>
  );
};

export default SettingAccess;
