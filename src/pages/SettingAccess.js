// project import
import MainCard from 'components/MainCard';
import { useAccessPage, useCriteria, useDetailCardState, useTabState, useTableListState } from 'store/module';
import { Avatar, Box, Button, Grid, Stack, Tab, Tabs, Typography } from '../../node_modules/@mui/material/index';
import { useEffect, useState } from 'react';
import AccessTab from 'components/tab/AccessTab';
import axios from '../../node_modules/axios/index';
import AccessCheckbox from 'components/Checkbox/AccessCheckbox';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';
import SettingAccessTable from 'components/Table/SettingAccessTable';
import InputSearch from 'components/Input/InputSearch';

// ==============================|| 관리자 접근관리 PAGE ||============================== //

const SettingAccess = () => {
  const navigate = useNavigate();

  const [value, setVale] = useState(0);
  const [customUser, setCustomUser] = useState(0);
  const handleChange = (event, newValue) => {
    setVale(newValue);
    if (newValue == 0) {
      setIndex(0);
      setView(false);
    } else {
      setIndex(1);
      setView(false);
    }
  };

  //zustand로 관리할 값들
  const { setIndex, setTab, index } = useTabState();
  const { setTableList, tableContentList } = useTableListState();
  const { setSearch, setPage } = useCriteria();
  const { setAccessPage } = useAccessPage();
  const { setView, view, id } = useDetailCardState();

  //화면 초기값 셋팅
  useEffect(() => {
    async function get() {
      const endPoints = ['/role-count', '/custom-access-count'];
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
      setCustomUser(result[1].data[0].count);
      setIndex(0);
      setSearch('');
    }
    get();
  }, []);
  //value 값(맞춤 접근탭) 변경시 테이블 변경 셋팅
  useEffect(() => {
    async function get() {
      setPage(1);
      const result = await axios.get(`/custom-user-list?&page=1&limit=7`);
      setTableList(result.data);
    }
    get();
  }, [value]);

  //index 값(권한별탭) 변경시 테이블 변경 셋팅
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={3}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="권한별" />
            <Tab label={`개인 맞춤 (${customUser})`} />
          </Tabs>
        </Box>
        <Stack direction="row" spacing={2} mb={3}>
          <Button variant="contained">변경사항 저장</Button>
          <Button variant="contained" onClick={() => navigate(-1)}>
            변경취소
          </Button>
        </Stack>
      </Grid>
      <div role="tabpanel" hidden={value !== 0} id={`simple-tabpanel-${0}`} aria-labelledby={`simple-tab-${0}`} value={value}>
        <MainCard sx={{ pt: 2, pr: 3, pl: 3, ml: 2, mr: 2, height: '45rem' }} content={false}>
          <AccessTab />
          <Stack direction="row" spacing={12} mt={2}>
            <AccessCheckbox />
          </Stack>
        </MainCard>
      </div>
      <div role="tabpanel" hidden={value !== 1} id={`simple-tabpanel-${1}`} aria-labelledby={`simple-tab-${1}`} value={value}>
        <MainCard sx={{ pt: 2, pr: 3, pl: 3, ml: 2, mr: 2, height: '45rem' }} content={false}>
          <Typography mt={2} variant="h4">
            사용자명으로 검색
          </Typography>
          <InputSearch isPersonIcon={true}></InputSearch>
          {view ? (
            <>
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={3} mb={3}>
                <Avatar src={tableContentList.find((e) => e.user_no == id).user_profile} sx={{ width: 50, height: 50 }}></Avatar>
                <Typography variant="h4">
                  {`${tableContentList.find((e) => e.user_no == id).dept_name}/${
                    tableContentList.find((e) => e.user_no == id).user_position
                  }`}
                </Typography>
                <Typography variant="h4">{tableContentList.find((e) => e.user_no == id).user_name}</Typography>
                <Typography variant="h4">접근 관리</Typography>
              </Stack>
              <Stack direction="row" spacing={9} mt={2}>
                <AccessCheckbox />
              </Stack>
            </>
          ) : (
            <SettingAccessTable />
          )}
        </MainCard>
      </div>
    </>
  );
};

export default SettingAccess;
