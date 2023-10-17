// material-ui
//import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { Avatar, Box, Button, Grid, Typography } from '../../node_modules/@mui/material/index';
import VacationDonutChart from 'components/chart/VacationDonutChart';
import AttendChart from 'components/chart/AttendChart';


// ==============================|| SAMPLE PAGE ||============================== //

const Main = () => (
  <Grid container xs={12} spacing={2}>
    <Grid item xs={12}>
      <MainCard>
      <Grid container sx={{ mt: 2 }}>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                <Grid sx={{ padding: 2.5 }}>
                  <Box clone my={2} align="center">
                    <Avatar alt="프로필" src="" sx={{ width: 150, height: 150 }} />
                  </Box>
                  <Typography align="center" variant="h5" component="div">
                    홍길동
                  </Typography>
                  <Typography align="center" color="text.secondary">
                    개발팀/연구원
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Typography align="center" variant="h5">
                  오늘의 출/퇴근 기록
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
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5}>
                <Typography align="center" variant="h5">
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
              </Grid>
            </Grid>
      
      </MainCard>
    </Grid>

    
    <Grid item xs={8}>
      <MainCard title="휴가신청목록"></MainCard>
    </Grid>
    
    <Grid item xs={4}>
      <MainCard title="휴가현황">
      <VacationDonutChart />
      </MainCard>
    </Grid>
  </Grid>
);

export default Main;
