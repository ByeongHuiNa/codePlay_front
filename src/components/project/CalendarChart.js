import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const data = [
    { label: 'Group A', value: 400 },
    { label: 'Group B', value: 300 },
    { label: 'Group C', value: 300 },
    { label: 'Group D', value: 200 },
];

const size = {
  width: 370,
  height: 200,
};


export default function CalendarChart() {
  return (
    <>
    <PieChart series={[{ data, innerRadius: 60 }]} {...size} legend={{ hidden: true }}/>
    <div>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Item>휴가일 12</Item>
        <Item>휴가일 12</Item>
        <Item>휴가일 12</Item>
      </Stack>
    </div>
        </>
  );
}