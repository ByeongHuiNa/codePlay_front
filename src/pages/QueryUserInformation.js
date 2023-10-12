// material-ui
import {
  Typography,
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { TreeItem, TreeView } from '../../node_modules/@mui/lab/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Grid, InputAdornment, Pagination, TextField } from '../../node_modules/@mui/material/index';

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
          <TextField id="outlined-search" type="search" size="normal" margin = "normal" InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AccountCircle onClick={()=>console.log('test')}/>
            </InputAdornment>
          ),
        }}/>
          <Typography variant="h4">데이터 그리드 만들기</Typography>          
          <Pagination count={10} variant="outlined" shape="rounded" />
        </MainCard>
      </Grid>
    </Grid>
  </>
);

export default QueryUserInformation;
