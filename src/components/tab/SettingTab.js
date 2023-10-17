import { useTabState } from 'store/module';
import { Box, Tab, Tabs } from '../../../node_modules/@mui/material/index';

const SettingTab = () => {
  const { index, setIndex, tab } = useTabState();

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={index} onChange={(e, v) => setIndex(v)} aria-label="basic tabs example">
        {Object.keys(tab).length > 0 &&
          tab.map((tabItem) => {
            return <Tab key={tabItem.id} label={`${tabItem.name} (${tabItem.number})`} />;
          })}
      </Tabs>
    </Box>
  );
};

export default SettingTab;
