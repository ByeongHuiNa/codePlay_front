
import { Typography, Box, Grid, Tab, Tabs } from '@mui/material';
import ComponentSkeleton from './components-overview/ComponentSkeleton';

import BasicTab from 'components/tab/BasicTab';


import {  useState } from 'react';
import MainCard from 'components/MainCard';


const SeeAllAttendance = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

  return (
    <ComponentSkeleton>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="휴가" />
          <Tab label="출/퇴근" />
        </Tabs>
      </Box>

      <BasicTab value={value} index={0}>
      
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Typography variant="h5">휴가현황조회페이지</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={7}>
            <MainCard title="휴가보유 현황">
                
            </MainCard>

        </Grid>
       
        </BasicTab>

        <BasicTab value={value} index={1}>
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Typography variant="h5">휴가현황조회페이지</Typography>
        </Grid>
        </BasicTab>
    </ComponentSkeleton>
  );
};

export default SeeAllAttendance;
