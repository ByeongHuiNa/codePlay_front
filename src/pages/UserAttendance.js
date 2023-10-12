import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import BasicContainer from 'components/container/BasicContainer';
import MainCard from 'components/MainCard';
import { Box, Button, Tab, Tabs } from '../../node_modules/@mui/material/index';
import BasicTab from 'components/tab/BasicTab';
import { useState } from 'react';

// ===============================|| Shadow-Box ||=============================== //

function ShadowBox({ shadow, label, color, bgcolor }) {
  return (
    <MainCard border={false} sx={{ bgcolor: bgcolor || 'inherit', boxShadow: shadow }}>
      <Stack spacing={1} justifyContent="center" alignItems="center">
        <Typography variant="subtitle1" color={color}>
          {label}
        </Typography>
      </Stack>
    </MainCard>
  );
}

ShadowBox.propTypes = {
  shadow: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  bgcolor: PropTypes.string
};

// ============================|| COMPONENT - SHADOW ||============================ //

const UserAttendance = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <ComponentSkeleton>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="출/퇴근 기록" />
                <Tab label="정정 요청 목록" />
            </Tabs>
        </Box>
        <BasicTab value={value} index={0}>
        {/* <Container maxWidth="lg"> */}
            <Box clone mx={1} my={1} pb={1}>
                <Stack direction='row' justifyContent='flex-end' spacing={1}>
                    <Button variant="contained">수정요청</Button>
                </Stack>
            </Box>
            <Box clone mx={1} my={1}>
                <BasicContainer>
                    <Grid container spacing={3}>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <ShadowBox shadow={theme.customShadows.z1} label="z1" color="inherit" />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <ShadowBox shadow={theme.customShadows.z1} label="z1" color="inherit" />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <ShadowBox shadow={theme.customShadows.z1} label="z1" color="inherit" />
                        </Grid>
                    </Grid>
                </BasicContainer>
            </Box>
            <Box clone mx={1} my={1} pb={2}>
                <BasicContainer title="최근출근기록" codeHighlight>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ShadowBox shadow={theme.customShadows.z1} label="z1" color="inherit" />
                        </Grid>
                    </Grid>
                </BasicContainer>
            </Box>
        {/* </Container> */}
        </BasicTab>
        <BasicTab value={value} index={1}>
        {/* <Container maxWidth="lg"> */}
            <Box clone mx={1} my={1} pb={1}>
                <Stack direction='row' justifyContent='flex-end' spacing={1}>
                    <Button variant="contained">수정요청</Button>
                </Stack>
            </Box>
            <Box clone mx={1} my={1} pb={2}>
                <BasicContainer title="정정요청목록" codeHighlight>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <ShadowBox shadow={theme.customShadows.z1} label="z1" color="inherit" />
                        </Grid>
                    </Grid>
                </BasicContainer>
            </Box>
        {/* </Container> */}
        </BasicTab>
    </ComponentSkeleton>
  );
};

export default UserAttendance;
