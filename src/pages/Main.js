// material-ui
//import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { Avatar, Box, Button, Grid, Link, Typography } from '../../node_modules/@mui/material/index';
import VacationDonutChart from 'components/chart/VacationDonutChart';
import AttendChart from 'components/chart/AttendChart';
import UserLeaveTable from 'components/Table/UserLeaveTable';

// ==============================|| SAMPLE PAGE ||============================== //

const Main = () => (
  <Grid container xs={12} spacing={2}>
    <Grid item xs={4} sm={4} md={4} lg={4}>
      <MainCard sx={{ height: '350px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
        <Typography align="left" variant="h5">
          내 정보
        </Typography>
        <Link href="/userInformation" variant="h5">더보기</Link>
        </div>
        <Box clone my={2} align="center" sx={{ marginBottom: 5 }}>
          <Avatar alt="프로필" src="" sx={{ width: 150, height: 150 }} />
        </Box>
        <Typography align="center" variant="h5" component="div">
          홍길동
        </Typography>
        <Typography align="center" color="text.secondary">
          개발팀/연구원
        </Typography>
      </MainCard>
    </Grid>
    <Grid item xs={4} sm={4} md={4} lg={4}>
      <MainCard sx={{ height: '350px' }}>
        <Typography align="left" variant="h5">
          출/퇴근
        </Typography>
        <Box clone mt={4} mb={4} ml={3}>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <Typography align="center" color="text.secondary">
                출근 시간
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8} sx={{ paddingRight: 5 }} align="right">
              <Typography variant="text" align="right" sx={{ fontSize: 15 }}>
                2023년 10월 12일 목요일
                <br />
                오전 11 : 30 : 12
              </Typography>
              {/* <Chip label="오전 11 : 30 : 12" variant="outlined" /> */}
            </Grid>
          </Grid>
        </Box>
        <Box clone my={4} ml={3}>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <Typography align="center" color="text.secondary">
                퇴근 시간
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8} lg={8} sx={{ paddingRight: 5 }} align="right">
              <Typography variant="text" sx={{ fontSize: 15 }}>
                2023년 10월 12일 목요일
                <br />
                오전 11 : 30 : 12
              </Typography>
              {/* <Chip label="오전 11 : 30 : 12" variant="outlined" /> */}
            </Grid>
          </Grid>
        </Box>
        <Box clone mb={2}>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item>
              <Button variant="outlined" size="large">
                <Box clone mx={6}>
                  출근
                </Box>
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" size="large">
                <Box clone mx={6}>
                  퇴근
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </Grid>
    <Grid item xs={4} sm={4} md={4} lg={4}>
      <MainCard>
        <Typography align="left" variant="h5">
          금주 근무 시간
        </Typography>
        <AttendChart
          chart={{
            labels: ['10/07', '10/08', '10/09', '10/10', '10/11', '10/12', '10/13'],
            series: [
              {
                name: '정상근무',
                type: 'column',
                fill: 'solid',
                data: [0, 8, 10, 10, 4, 10, 0]
              },
              {
                name: '초과근무',
                type: 'column',
                fill: 'solid',
                data: [4, 0, 1, 1, 0, 1, 0]
              },
              {
                name: '휴가',
                type: 'column',
                fill: 'solid',
                data: [0, 0, 0, 0, 4, 0, 8]
              }
            ]
          }}
        />
      </MainCard>
    </Grid>

    <Grid item xs={4}>
      <MainCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
        <Typography align="left" variant="h5">
          휴가신청목록
        </Typography>
        <Link href="/userleave" variant="h5">더보기</Link>
        </div>
        <UserLeaveTable />
      </MainCard>
    </Grid>

    <Grid item xs={4}>
      <MainCard sx={{ height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' , marginBottom: '30px'}}>
        <Typography align="left" variant="h5" >
          휴가현황
        </Typography>
        <Link href="/userleave" variant="h5">더보기</Link>
        </div>
        <VacationDonutChart />
      </MainCard>
    </Grid>
  </Grid>
);

export default Main;
