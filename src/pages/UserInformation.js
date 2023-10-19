// material-ui
import { Typography, Button, Grid } from '@mui/material';

// project import
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';
import MainCard from 'components/MainCard';
import { Avatar } from '../../node_modules/@mui/material/index';
import { useProfileState } from 'store/module';

// ==============================|| 유저 정보 PAGE ||============================== //

const UserInformation = () => {
  //사용자 정보 변경 버튼 눌렀을때 변경 처리
  let navigate = useNavigate();
  function modifiyClick() {
    navigate('/userInformationModify');
  }

  //화면 초기값 셋팅
  const { profile } = useProfileState();

  return (
    <>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
        <Typography variant="h2">프로필</Typography>
        <Button variant="contained" onClick={modifiyClick}>
          사용자 정보 변경
        </Button>
      </Grid>
      {Object.keys(profile).length > 0 && (
        <MainCard>
          <Grid container direction="column">
            <Grid item container direction="row" xs={12}>
              <Grid item xs={5}>
                <Avatar sx={{ width: 250, height: 250, margin: 'auto' }} src={profile.user_profile}></Avatar>
              </Grid>
              <Grid item container direction="column" justifyContent="space-around" xs={7}>
                <Grid item container direction="row">
                  <Grid item xs={3}>
                    <Typography variant="h4">이름</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h4">{profile.user_name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h4">생년월일</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h4">{profile.user_birth_date}</Typography>
                  </Grid>
                </Grid>
                <Grid item container direction="row">
                  <Grid item xs={3}>
                    <Typography variant="h4">부서</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h4">{profile.dept_name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h4">직책</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="h4">{profile.user_position}</Typography>
                  </Grid>
                </Grid>
                <Grid item container direction="row">
                  <Grid item xs={3}>
                    <Typography variant="h4">이메일주소</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h4">{profile.email}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item mt={3}>
              <Typography variant="h4">전화번호</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">{profile.user_phone}</Typography>
            </Grid>
            <Grid item mt={3}>
              <Typography variant="h4">주소</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">{profile.user_address}</Typography>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default UserInformation;
