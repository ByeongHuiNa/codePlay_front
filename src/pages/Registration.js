import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import RegistratrionForm from '../components/Form/RegistrationForm';
import AuthWrapper from '../components/Layout/AuthWrapper';

// ================================|| REGISTER ||================================ //

const Registration = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">회원 가입</Typography>
          <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
            이미 계정을 가지고 있으신가요?
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <RegistratrionForm />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Registration;
