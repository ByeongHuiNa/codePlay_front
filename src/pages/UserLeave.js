import PropTypes from 'prop-types';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import BasicContainer from 'components/container/BasicContainer';
import MainCard from 'components/MainCard';
import { Box, Tab, Tabs } from '../../node_modules/@mui/material/index';
import BasicTab from 'components/tab/BasicTab';
import React, { useState } from 'react';
import { FileTextFilled, FileAddFilled, FileExcelFilled } from '@ant-design/icons';
import LeaveDonutChart from 'components/chart/LeaveDonutChart';
import RecentLeaveTable from 'components/Table/AppLeaveTable';

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

const UserLeave = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const requestCancel = () => {
        setValue(2)
    }

    return (
        <ComponentSkeleton>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="휴가조회" icon={<FileTextFilled />} />
                    <Tab label="휴가신청" icon={<FileAddFilled />} />
                    <Tab label="휴가취소신청" icon={<FileExcelFilled />} />
                </Tabs>
            </Box>
            <BasicTab value={value} index={0}>
                <Grid container spacing={1}>
                    <Grid item xs={4} sm={4} md={4} lg={4} >
                        <BasicContainer>
                            <LeaveDonutChart 
                                series={
                                    [12,4]
                                }/>
                        </BasicContainer>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                        <BasicContainer>
                        </BasicContainer>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <BasicContainer>
                        <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h5">최근 결재 완료 내역</Typography>
                                </Grid>
                            </Grid>
                            <RecentLeaveTable requestCancel={requestCancel}/>
                        </BasicContainer>
                    </Grid>
                </Grid>
            </BasicTab>
            <BasicTab value={value} index={1}>

            </BasicTab>
            <BasicTab value={value} index={2}>

            </BasicTab>
        </ComponentSkeleton>
    );
};

export default UserLeave;
