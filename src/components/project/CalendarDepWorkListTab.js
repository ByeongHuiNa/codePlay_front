import { Box, Tab, Tabs } from '../../../node_modules/@mui/material/index';
import CalendarDepWorkList from './CalendarDepWorkList';
import CalendarDepLeaveList from './CalendarDepLeaveList';
import { useCalendarDepWorkListTab } from 'store/module';

function CustomTabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const CalendarDepWorkListTab = () => {
  const { value, setValue } = useCalendarDepWorkListTab();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="일정 목록" {...a11yProps(0)} />
          <Tab label="휴가 목록" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CalendarDepWorkList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CalendarDepLeaveList />
      </CustomTabPanel>
    </Box>
  );
};
export default CalendarDepWorkListTab;
