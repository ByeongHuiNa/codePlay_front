// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import ForgotPasswordForm from '../components/Form/ForgetPasswordForm';
import AuthWrapper from '../components/Layout/AuthWrapper';

const ForgotPassword = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h5">비밀번호를 찾을 사용자의 이메일을 입력하세요</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <ForgotPasswordForm />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default ForgotPassword;
