import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Grid } from '../../../node_modules/@mui/material/index';

export default function CalendarDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const list = () => (
    <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <Grid>폼 내용</Grid>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>right</Button>
      <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
