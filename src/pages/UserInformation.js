// material-ui
import { Typography, Button, Grid, Avatar } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| 유저 정보 PAGE ||============================== //

const UserInformation = () => (
  <>
    <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
      <Typography variant="h2">프로필</Typography>
      <Button variant="contained">사용자 정보 변경</Button>
    </Grid>
    <MainCard>
      <Grid container direction="column" xs={12}>
        <Grid item container direction="row" xs={12}>
          <Grid item xs={5}>
            <Avatar sx={{ width: 250, height: 250, margin: 'auto' }}>프로필 사진</Avatar>
          </Grid>
          <Grid item container direction="column" justifyContent="space-around" xs={7}>
            <Grid item container direction="row">
              <Grid item xs={3}>
                <Typography variant="body2">이름</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">홍길동</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">생년월일</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">2023-10-12</Typography>
              </Grid>
            </Grid>
            <Grid item container direction="row">
              <Grid item xs={3}>
                <Typography variant="body2">부서</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">개발팀</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">직책</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">연구원</Typography>
              </Grid>
            </Grid>
            <Grid item container direction="row">
              <Grid item xs={3}>
                <Typography variant="body2">이메일주소</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body2">honggildong@douzon.com</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body2">전화번호</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">010-0000-0000</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">주소</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">서울특별시 종로구 창경궁로 254</Typography>
        </Grid>
      </Grid>
    </MainCard>
  </>
);

export default UserInformation;
