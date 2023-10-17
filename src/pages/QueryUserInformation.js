// material-ui
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { TreeItem, TreeView } from '../../node_modules/@mui/lab/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid } from '../../node_modules/@mui/material/index';
import QueryUserTable from 'components/Table/QueryUserTable';
import InputSeach from 'components/Input/InputSearch';
import { useCriteria, useOrganizationChartState, useUserTableListState } from 'store/module';
import { useEffect } from 'react';
import axios from '../../node_modules/axios/index';

// ==============================|| 관리자 유저정보조회 PAGE ||============================== //

const QueryUserInformation = () => {
  const { setTableList } = useUserTableListState();
  const { OrganizationChart, setOrganizationChartList } = useOrganizationChartState();
  const { search, limit, setPage } = useCriteria();

  useEffect(() => {
    async function get() {
      const result = await axios.get('http://localhost:8000/get_query_user');
      const groups = result.data.reduce(
        (groups, item) => ({
          ...groups,
          [item.dept]: [...(groups[item.dept] || []), item]
        }),
        {}
      );
      setOrganizationChartList(groups);
    }
    get();
  }, []);

  async function search_user(search, limit) {
    setPage(1);
    const result = await axios.get(`http://localhost:8000/get_query_user?name=${search}&_page=1&_limit=${limit}`);
    setTableList(result.data);
  }

  return (
    <>
      {/* 조직도 내 직책별 정렬 필요 */}
      <Typography variant="h2">조직도</Typography>
      <Grid container xs={12} direction="row" spacing={3}>
        <Grid item xs={2}>
          <MainCard>
            <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
              {Object.keys(OrganizationChart).map((dept, index) => {
                return (
                  <TreeItem key={index} nodeId={index} label={dept}>
                    {OrganizationChart[dept] &&
                      OrganizationChart[dept].map((value, index) => {
                        return <TreeItem key={dept + index} nodeId={dept + index} label={value.name + ' ' + value.position}></TreeItem>;
                      })}
                  </TreeItem>
                );
              })}
            </TreeView>
          </MainCard>
        </Grid>
        <Grid item xs={10}>
          <MainCard>
            <Typography variant="h4">사용자명으로 검색</Typography>
            <InputSeach isPersonIcon={true} onClick={() => search_user(search, limit)}></InputSeach>
            <QueryUserTable></QueryUserTable>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default QueryUserInformation;
