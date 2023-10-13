import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import GroupsIcon from '@mui/icons-material/Groups';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalendarShared from 'components/project/CalendarShared';

// ==============================|| SAMPLE PAGE ||============================== //

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Calendar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
          <Tab icon={<PermContactCalendarIcon />} label="개인 캘린더" {...a11yProps(0)} />
          <Tab icon={<GroupsIcon />} label="공용 캘린더" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* 개인 캘린더 컴포넌트 */}
        <CalendarShared />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* 공용 캘린더 컴포넌트 */}
        <CalendarShared />
      </CustomTabPanel>
    </Box>
  );
};

export default Calendar;
