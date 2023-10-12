// material-ui
import {
  Typography,
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { TreeItem, TreeView } from '../../node_modules/@mui/lab/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid } from '../../node_modules/@mui/material/index';
import QueryUserTable from 'components/Table/QueryUserTable';
import InputSeach from 'components/Input/InputSearch';

// ==============================|| 유저 정보 조회 PAGE ||============================== //

const QueryUserInformation = () => (
  <>
    <Typography variant="h2">조직도</Typography>
    <Grid container xs={12} direction="row">
      <Grid item xs={3}>
        <MainCard>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId="1" label="Applications">
              <TreeItem nodeId="2" label="Calendar" />
            </TreeItem>
            <TreeItem nodeId="5" label="Documents">
              <TreeItem nodeId="10" label="OSS" />
              <TreeItem nodeId="6" label="MUI">
                <TreeItem nodeId="8" label="index.js" />
              </TreeItem>
            </TreeItem>
          </TreeView>
        </MainCard>
      </Grid>
      <Grid item xs={9}>
        <MainCard>
          <Typography variant="h4">사용자명으로 검색</Typography>
          <InputSeach isPersonIcon={true}></InputSeach>
          <QueryUserTable></QueryUserTable>
        </MainCard>
      </Grid>
    </Grid>
  </>
);

export default QueryUserInformation;
