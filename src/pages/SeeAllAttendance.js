import { Typography, Box, Grid, Tab, Tabs } from '@mui/material';
import ComponentSkeleton from './components-overview/ComponentSkeleton';
import { FormControl, IconButton, InputLabel, MenuItem, TextField } from '../../node_modules/@mui/material/index';
import Select from '@mui/material/Select';
import VacationCountTable from 'components/Table/VacationCountTable';

import BasicTab from 'components/tab/BasicTab';
import SearchIcon from '@mui/icons-material/Search';

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
        
        <Grid item xs={12} sm={6} md={5} lg={7}>
        <MainCard title={<Typography variant="h5" sx={{ textAlign: 'center' }}>{dept ? `${dept} 부서 휴가보유 현황` : '00부서 휴가보유 현황'}</Typography>}>

            <FormControl sx={{ minWidth: 100, }}>
              <InputLabel id="demo-simple-select-label">부서</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={dept} label="month" onChange={handleChange2}>
                <MenuItem value={'개발'}>개발</MenuItem>
                <MenuItem value={'인사'}>인사</MenuItem>
                <MenuItem value={'회계'}>회계</MenuItem>
              </Select>
            </FormControl>
            
            <TextField id="outlined-basic" label="직책명" variant="outlined" />
            <TextField id="outlined-basic" label="사원명" variant="outlined" />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <VacationCountTable />
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
