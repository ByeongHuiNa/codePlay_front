import { Typography, Box, Grid, Tab, Tabs } from '@mui/material';
import ComponentSkeleton from './components-overview/ComponentSkeleton';





import BasicTab from 'components/tab/BasicTab';



import MainCard from 'components/MainCard';
import { useState } from 'react';

const SeeUserAttendance = () => {
 
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);

 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange3 = (event, newValue) => {
    setValue2(newValue);
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
        <Grid item xs={12} sm={6} md={5} lg={7}>
          <MainCard
            title={
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                
              </Typography>
            }
          >
            

            
          </MainCard>
        </Grid>
      </BasicTab>

      <BasicTab value={value} index={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value2} onChange={handleChange3} aria-label="basic tabs example">
            <Tab label="일별" />
            <Tab label="주간" />
          </Tabs>
        </Box>
        <BasicTab value={value2} index={0}>
          <Grid item xs={12} sm={6} md={5} lg={7}>
            <MainCard>
              
            </MainCard>
          </Grid>
        </BasicTab>
        <BasicTab value={value2} index={1}>
        <Grid item xs={12} sm={6} md={5} lg={7}>
            <MainCard>
              
            </MainCard>
          </Grid>
        </BasicTab>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default SeeUserAttendance;
