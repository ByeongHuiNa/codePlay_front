import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import BasicContainer from 'components/container/BasicContainer';
import MainCard from 'components/MainCard';
import { Avatar, Box, Button, Chip, Tab, Tabs } from '../../node_modules/@mui/material/index';
import BasicTab from 'components/tab/BasicTab';
import React, { useState } from 'react';
import RecentAttendTable from '../components/Table/RecentAttendTable';
import AttendChart from 'components/chart/AttendChart';

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
                <Box clone mx={1} pb={1}>
                    <Stack direction='row' justifyContent='flex-end' spacing={1}>
                        <Button variant="contained">수정요청</Button>
                    </Stack>
                </Box>
                <Box clone mx={1} pt={1}>
                    <BasicContainer>
                        <Grid container sx={{ mt: 2 }}>
                            <Grid item xs={3} sm={3} md={3} lg={3} >
                                <Grid sx={{ padding: 2.5 }} >
                                    <Typography align="center" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        사원정보
                                    </Typography>
                                    <Box clone my={2} align="center">
                                        <Avatar
                                            alt="프로필"
                                            src=""
                                            sx={{ width: 150, height: 150 }}
                                        />
                                    </Box>
                                    <Typography align="center" variant="h5" component="div" >
                                        이름
                                    </Typography>
                                    <Typography align="center" color="text.secondary">
                                        직책/부서
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <Typography align="center" variant="h5">오늘의 출/퇴근 기록</Typography>
                                <Box clone mt={4} mb={4} ml={6}>
                                    <Grid container justifyContent="center" spacing={1}>
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <Typography align="center" color="text.secondary">
                                                출근 시간
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={8} md={8} lg={8} sx={{ marginLeft: 2 }}>
                                            <Typography variant="text" sx={{ fontSize: 14 }} >
                                                2023년 10월 12일 목요일
                                            </Typography>
                                            <br />
                                            {/* <Typography variant="h4">
                                                오전 11 : 30 : 12
                                            </Typography> */}
                                            <Chip label="오전 11 : 30 : 12" variant="outlined" />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box clone my={4} ml={6}>
                                    <Grid container justifyContent="center" spacing={1}>
                                        <Grid item xs={3} sm={3} md={3} lg={3}>
                                            <Typography align="center" color="text.secondary">
                                                퇴근 시간
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} sm={8} md={8} lg={8} sx={{ marginLeft: 2 }}>
                                            <Typography variant="text" sx={{ fontSize: 14 }} >
                                                2023년 10월 12일 목요일
                                            </Typography>
                                            <br />
                                            {/* <Typography variant="h4">
                                                오전 11 : 30 : 12
                                            </Typography> */}
                                            <Chip label="오전 11 : 30 : 12" variant="outlined" />
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
                                <Typography align="center" variant="h5">금주 근무 시간</Typography>
                                <AttendChart
                                    chart={{
                                        labels: [
                                            '10/07',
                                            '10/08',
                                            '10/09',
                                            '10/10',
                                            '10/11',
                                            '10/12',
                                            '10/13',
                                        ],
                                        series: [
                                            {
                                                name: '정상근무',
                                                type: 'column',
                                                fill: 'solid',
                                                data: [0, 8, 10, 10, 4, 10, 0],
                                            },
                                            {
                                                name: '초과근무',
                                                type: 'column',
                                                fill: 'solid',
                                                data: [4, 0, 1, 1, 0, 1, 0],
                                            },
                                            {
                                                name: '휴가',
                                                type: 'column',
                                                fill: 'solid',
                                                data: [0, 0, 0, 0, 4, 0, 8],
                                            },
                                        ],
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </BasicContainer>
                </Box>
                <Box clone mx={1} my={1} pb={2}>
                    <BasicContainer>
                        <Grid item xs={12} md={7} lg={8}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h5">최근 출근 기록</Typography>
                                </Grid>
                                <Grid item />
                            </Grid>
                            <MainCard sx={{ mt: 2 }} content={false}>
                                <RecentAttendTable />
                            </MainCard>
                        </Grid>
                    </BasicContainer>
                </Box>
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
