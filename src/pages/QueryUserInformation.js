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
  const { search, limit, setPage, setSearch } = useCriteria();

  useEffect(() => {
    async function get() {
      const result = await axios.get('http://localhost:8000/user_query_list');
      const groups = result.data.reduce(
        (groups, item) => ({
          ...groups,
          [item.dept_name]: [...(groups[item.dept_name] || []), item]
        }),
        {}
      );
      setOrganizationChartList(groups);
      setPage(1);
      setSearch('');
    }
    get();
  }, []);

  async function search_user(search) {
    setPage(1);
    const result = await axios.get(`http://localhost:8000/user_query?user_name=${search}&_page=1&_limit=${limit}`);
    setTableList(result.data);
  }

  async function clickTreeItem(user_name) {
    setPage(1);
    setSearch(user_name);
    search_user(user_name);
  }

  return (
    <>
      {/* 조직도 내 직책별 정렬 필요 */}
      <Typography variant="h2">조직도</Typography>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={2}>
          <MainCard>
            <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
              {Object.keys(OrganizationChart).map((dept, index) => {
                return (
                  <TreeItem key={index + ''} nodeId={index + ''} label={dept}>
                    {OrganizationChart[dept] &&
                      OrganizationChart[dept].map((value, index) => {
                        return (
                          <TreeItem
                            key={dept + index}
                            nodeId={dept + index}
                            label={value.user_name + ' ' + value.user_position}
                            onClick={() => {
                              clickTreeItem(value.user_name);
                            }}
                          ></TreeItem>
                        );
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
            <InputSeach isPersonIcon={true} onClick={() => search_user(search)}></InputSeach>
            <QueryUserTable></QueryUserTable>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default QueryUserInformation;
