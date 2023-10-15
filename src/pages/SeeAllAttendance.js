import { Typography, Box, Grid, Tab, Tabs } from '@mui/material';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import { FormControl, InputLabel, MenuItem } from '../../node_modules/@mui/material/index';
import Select from '@mui/material/Select';

import BasicTab from 'components/tab/BasicTab';

import { useState } from 'react';
import MainCard from 'components/MainCard';

const SeeAllAttendance = () => {
  const [dept, setDept] = useState('');
  const handleChange2 = (event) => {
    setDept(event.target.value);
  };
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
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Typography variant="h5">휴가현황조회페이지</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={7}>
          <MainCard title="00부서 휴가보유 현황" style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="demo-simple-select-label">부서</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={dept} label="month" onChange={handleChange2}>
                <MenuItem value={10}>개발</MenuItem>
                <MenuItem value={9}>인사</MenuItem>
                <MenuItem value={8}>회계</MenuItem>
              </Select>
            </FormControl>
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
            <MainCard title="2023.10.10 출/퇴근 현황" style={{ display: 'flex', justifyContent: 'center' }}>
              <FormControl sx={{ minWidth: 100 }}>
                <InputLabel id="demo-simple-select-label">부서</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={dept} label="month" onChange={handleChange2}>
                  <MenuItem value={10}>개발</MenuItem>
                  <MenuItem value={9}>인사</MenuItem>
                  <MenuItem value={8}>회계</MenuItem>
                </Select>
              </FormControl>
            </MainCard>
          </Grid>
        </BasicTab>
        <BasicTab value={value2} index={1}>
        <Grid item xs={12} sm={6} md={5} lg={7}>
            <MainCard title="2023.10월 첫째주" style={{ display: 'flex', justifyContent: 'center' }}>
              <FormControl sx={{ minWidth: 100 }}>
                <InputLabel id="demo-simple-select-label" >부서</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={dept} label="month" onChange={handleChange2}>
                  <MenuItem value={10}>개발</MenuItem>
                  <MenuItem value={9}>인사</MenuItem>
                  <MenuItem value={8}>회계</MenuItem>
                </Select>
              </FormControl>
              
             
                
            </MainCard>

        </Grid>
        </BasicTab>
      </BasicTab>
    </ComponentSkeleton>
  );
};

export default SeeAllAttendance;
