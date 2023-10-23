import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Stack, Typography } from '../../../node_modules/@mui/material/index';
import Dot from 'components/@extended/Dot';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'date',
    align: 'center',
    disablePadding: false,
    label: '날짜'
  },
  {
    id: 'startTime',
    align: 'center',
    disablePadding: false,
    label: '출근시간'
  },
  {
    id: 'endTime',
    align: 'center',
    disablePadding: false,
    label: '퇴근시간'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: '근태상태'
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

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  // 0 : 정상출근
  // 1 : 휴가(연차,반차,공가)
  // 2 : 지각
  // 3 : 조퇴(조기퇴근)
  // 4 : 결근(출근 혹은 퇴근누락))
  switch (status) {
    case 0:
      color = 'success';
      title = '정상';
      break;
    case 1:
      color = 'primary';
      title = '휴가';
      break;
    case 2:
      color = 'secondary';
      title = '지각';
      break;
    case 3:
      color = 'warning';
      title = '조퇴';
      break;
    case 4:
      color = 'error';
      title = '결근';
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function UserAttendInfoTable({ data }) {
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
            <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={data.date}>
              {Object.keys(data).length !== 0 && (
                <>
                  <TableCell component="th" scope="data" align="center">
                    {data.attend_date}
                  </TableCell>
                  <TableCell align="center">{data.attend_start}</TableCell>
                  <TableCell align="center">{data.attend_end}</TableCell>
                  <TableCell align="center">
                    <OrderStatus status={data.attend_status} />
                  </TableCell>
                </>
              )}
              {/* {Object.keys(data).length === 0 && (
                <Box
                  p={1}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center', // 수평 중앙 정렬
                    alignItems: 'center' // 수직 중앙 정렬
                  }}
                >
                  <Typography variant="h5">선택된 날짜 없음</Typography>
                </Box>
              )} */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
