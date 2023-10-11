

import { Box, Paper } from "../../node_modules/@mui/material/index";

// ==============================|| SAMPLE PAGE ||============================== //

const Calendar = () => (
    <>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 128,
                height: 128,
                },
            }}
        >
  <Paper></Paper>
  </Box>
  <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 128,
                height: 128,
                },
            }}
        >
  <Paper></Paper>
  </Box>
    </>

  
);

export default Calendar;