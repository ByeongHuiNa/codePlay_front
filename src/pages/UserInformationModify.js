// material-ui
import { Typography, Button, Grid, Avatar } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { Stack, TextField } from '../../node_modules/@mui/material/index';
import { useLocation, useNavigate } from '../../node_modules/react-router-dom/dist/index';
import { useHasDrity, useMangerProfileState } from 'store/module';
import { useEffect } from 'react';
import axios from '../../node_modules/axios/index';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';

// ==============================|| 유저정보 수정 PAGE ||============================== //

const UserInformationModify = () => {
  let navigate = useNavigate();
  function cancelClick() {
    navigate('/userInformation');
  }
  const location = useLocation();

  const { profile, setProfile } = useMangerProfileState();
  const { setHasDrity } = useHasDrity();
  //TODO: ismodifyed 를 이용하여 unstable_usePrompt 로 변경이 됬는데, 주소를 옮길시 화면전환이 안되게 만들기

  useEffect(() => {
    const endPoints = [];
    console.log(location);
    if (location.state == null) {
      //token 값을 decode해주는 코드
      const token = jwtDecode(localStorage.getItem('token').slice(7));
      endPoints.push(`/user-information?user_no=${token.user_no}`);
    } else {
      endPoints.push(`/user-information?user_no=${location.state.user_no}`);
    }
    async function get() {
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      setProfile(result[0].data[0]);
      setHasDrity(false);
    }
    get();
  }, []);

  function changePhone(new_user_phone) {
    const temp = { ...profile };
    temp.user_phone = new_user_phone;
    setProfile(temp);
    setHasDrity(true);
  }

  function changeAddress(new_user_address) {
    const temp = { ...profile };
    temp.user_address = new_user_address;
    setProfile(temp);
    setHasDrity(true);
  }

  function saveUserInformationModify() {
    if (location.state == null) {
      const token = jwtDecode(localStorage.getItem('token').slice(7));
      axios.patch(`/user-information?user_no=${token.user_no}`, profile).then(() => {
        setHasDrity(false);
        cancelClick();
      });
    } else {
      axios.patch(`/user-information?user_no=${location.state.user_no}`, profile).then(() => {
        setHasDrity(false);
        cancelClick();
      });
    }
  }

  return (
    <>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
        <Typography variant="h2">프로필</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={saveUserInformationModify}>
            변경사항 저장
          </Button>
          <Button variant="contained" onClick={cancelClick}>
            변경취소
          </Button>
        </Stack>
      </Grid>
      {Object.keys(profile).length > 0 && (
        <MainCard>
          <Grid container direction="column">
            <Grid item container direction="row" xs={12} justifyContent="space-around">
              <Grid item>
                <Stack direction="row" spacing={4}>
                  {profile.user_profile == null ? (
                    <Avatar sx={{ width: 150, height: 150, margin: 'auto' }}> 프로필 사진 </Avatar>
                  ) : (
                    <Avatar sx={{ width: 150, height: 150, margin: 'auto' }} src={profile.user_profile}></Avatar>
                  )}
                  <Grid container direction="column" justifyContent="center">
                    <Grid item>
                      {/* TODO: 프로필 사진 관련 url 추후 기능추가예정*/}
                      {profile.user_profile == null ? (
                        <Button variant="contained">프로필 사진 추가</Button>
                      ) : (
                        <Stack spacing={4}>
                          <Button variant="contained">프로필 사진 변경</Button>
                          <Button variant="contained">프로필 사진 삭제</Button>
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Stack>
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
                    <Typography variant="h4">{profile.user_email}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item mt={3}>
              <TextField
                label="전화번호"
                variant="filled"
                value={profile.user_phone}
                size="small"
                onChange={(e) => changePhone(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item mt={3}>
              <TextField
                label="주소"
                fullWidth
                variant="filled"
                value={profile.user_address}
                size="small"
                onChange={(e) => changeAddress(e.target.value)}
              ></TextField>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};
export default UserInformationModify;
