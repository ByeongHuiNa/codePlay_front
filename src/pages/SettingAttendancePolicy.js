/* eslint-disable no-unused-vars */
// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { Grid } from '../../node_modules/@mui/material/index';

//icon import
import { useCriteria, useDetailCardState, useTabState, useTableListState } from 'store/module';
import { useEffect, useState } from 'react';
import axios from '../../node_modules/axios/index';
import SettingAttendancePolicyTable from 'components/Table/SettingAttendancePolicyTable';
import SettingTab from 'components/tab/SettingTab';
import AttendancePolicyDetailCard from 'components/Card/AttendancePolicyDetailCard';
import InputSearch from 'components/Input/InputSearch';
import SuccessModal from 'components/Modal/SuccessModal';

//zustand import

// ==============================|| 관리자 출퇴근 정책관리 PAGE ||============================== //

const SettingAttendancePolicy = () => {
  const { setIndex, setTab, tab, index } = useTabState();
  const { setTableList } = useTableListState();
  const { view, setView } = useDetailCardState();
  const { setPage, setSearch, now_page, search, setTotalPage } = useCriteria();

  //화면 초기값 셋팅
  useEffect(() => {
    setIndex('');
    setIndex(0);
    const tabs = [];
    axios.get('/policy-count').then((res) => {
      for (let i of res.data) {
        const tab_temp = {
          id: i.policy_no,
          name: i.policy_name,
          number: i.count,
          total: Math.floor(i.count / 7) + (i.count % 7 == 0 ? 0 : 1)
        };
        tabs.push(tab_temp);
        setTab(tabs);
        setView(false);
        setSearch('');
      }
    });
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

  //TODO:사용자명으로 검색?
  async function search_user(search) {
    setPage(1);
    const result = await axios.get(`/user-policy-list?policy_no=${index + 1}&user_name=${search}&page=1&limit=7`);
    setTableList(result.data);
    setTotalPage(result.headers['x-total-count']);
  }

  // 모달창 1. 결재 대기중인 휴가 삭제 성공
  const [deleteModal, setDeleteModal] = useState(false);
  // 모달창 활성화 버튼
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
    setTimeout(() => {
      setDeleteModal(false);
    }, 1500);
  };
  // 모달창 취소 버튼
  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };

  return (
    <>
      <Typography variant="h2" mb={2}>
        정규 출/퇴근 정책
      </Typography>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={view == 1 ? 8 : 12}>
          <MainCard sx={{ pt: 2, pr: 3, pl: 3, ml: 2, mr: 2, height: '45rem' }} content={false}>
            {/* <Typography variant="h4">사용자명으로 검색</Typography>
            <InputSearch isPersonIcon={true} onClick={() => search_user(search)}></InputSearch> */}
            <SettingTab></SettingTab>
            <SettingAttendancePolicyTable />
            <SuccessModal
              open={deleteModal}
              handleClose={handleCloseDeleteModal}
              color="#52c41a"
              msg="사용자 출/퇴근 정책이 변경되었습니다."
            />
          </MainCard>
        </Grid>
        {view == 1 && (
          <Grid item xs={4}>
            <AttendancePolicyDetailCard handleOpenDeleteModal={handleOpenDeleteModal} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SettingAttendancePolicy;
