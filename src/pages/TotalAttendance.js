// material-ui
import { Typography, Grid } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const TotalAttendancePage = () => (
  <>
  <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">근태현황조회페이지</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={8}>
        <MainCard title="결재진행중">
          <Typography variant="body2">
            2023.10.23 연차
          </Typography>
        </MainCard>
      </Grid>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={8}>
        <MainCard title="결재진행중">
          <Typography variant="body2">
            2023.10.23 연차
          </Typography>
        </MainCard>
      </Grid>
      
      
  </Grid>
  

  
</>
  
);

export default TotalAttendancePage;
