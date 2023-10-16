// material-ui
import { Typography, Button, Grid, Avatar } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { Stack, TextField } from '../../node_modules/@mui/material/index';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';

// ==============================|| 유저정보 수정 PAGE ||============================== //
let url = 'null';

const UserInformationModify = () => {
  let navigate = useNavigate();
  function cancelClick() {
    navigate('/userInformation');
  }
  return (
    <>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-end">
        <Typography variant="h2">프로필</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">변경사항 저장</Button>
          <Button variant="contained" onClick={cancelClick}>
            변경취소
          </Button>
        </Stack>
      </Grid>
      <MainCard>
        <Grid container direction="column" xs={12}>
          <Grid item container direction="row" xs={12} justifyContent="space-between">
            <Grid item>
              <Stack direction="row" spacing={4}>
                <Avatar sx={{ width: 150, height: 150, margin: 'auto' }}>프로필 사진</Avatar>
                <Grid container direction="column" justifyContent="center">
                  <Grid item>
                    {url == null ? (
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
          <Grid item mt={3}>
            <TextField label="전화번호" variant="filled" value="010-0000-0000" size="small"></TextField>
          </Grid>
          <Grid item mt={3}>
            <TextField label="주소" fullWidth variant="filled" value="서울특별시 종로구 창경궁로 254" size="small"></TextField>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};
export default UserInformationModify;
