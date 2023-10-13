import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Grid } from '../../../node_modules/@mui/material/index';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function CalendarChart() {
  return (
    <>
      <Grid>차트</Grid>
      <Grid item mt={3}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Item>휴가일 12</Item>
          <Item>휴가일 12</Item>
          <Item>휴가일 12</Item>
        </Stack>
      </Grid>
    </>
  );
}
