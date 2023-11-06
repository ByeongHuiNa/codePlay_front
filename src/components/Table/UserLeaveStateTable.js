import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'leave_year',
    align: 'center',
    disablePadding: false,
    label: '기준연도'
  },
  {
    id: 'leave_total',
    align: 'center',
    disablePadding: false,
    label: '총연차'
  },
  {
    id: 'leave_use',
    align: 'center',
    disablePadding: false,
    label: '사용연차'
  },
  {
    id: 'leave_remain',
    align: 'center',
    disablePadding: false,
    label: '잔여연차'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ height: '30px', p: 1 }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

export default function UserLeaveStateTable({ data }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          height: `${Object.keys(data).length === 0 ? '47px' : '100px'}`,
          padding: '0px',
          '& td, & th': { whiteSpace: 'nowrap' },
          '&::-webkit-scrollbar': {
            width: 5
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'white'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray',
            borderRadius: 2
          }
        }}
      >
        <Table
          stickyHeader
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={data.leave_no}>
              {Object.keys(data).length > 0 && (
                <>
                  <TableCell component="th" scope="data" align="center">
                    {data.leave_year}년도
                  </TableCell>
                  <TableCell align="center">{data.leave_total}일</TableCell>
                  <TableCell align="center">{data.leave_use}일</TableCell>
                  <TableCell align="center">{data.leave_remain}일</TableCell>
                </>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
