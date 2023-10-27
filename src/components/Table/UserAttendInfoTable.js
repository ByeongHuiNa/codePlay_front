import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Stack, Typography } from '../../../node_modules/@mui/material/index';
import Dot from 'components/@extended/Dot';

function dateFormat(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;

  return date.getFullYear() + '/' + month + '/' + day;
}

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

  // 정상출근
  // 휴가(연차,오전반차,오후반차,공가)
  // 지각
  // 조퇴(조기퇴근)
  // 결근(출근 혹은 퇴근누락))
  switch (status) {
    case '정상':
      color = 'success';
      title = '정상';
      break;
    case '휴가(연차)':
      color = 'primary';
      title = '연차';
      break;
    case '휴가(오전반차)':
      color = 'primary';
      title = '오전 반차';
      break;
    case '휴가(오후반차)':
      color = 'primary';
      title = '오후 반차';
      break;
    case '휴가(공가)':
      color = 'primary';
      title = '공가';
      break;
    case '지각':
      color = 'secondary';
      title = '지각';
      break;
    case '조퇴':
      color = 'warning';
      title = '조퇴';
      break;
    case '결근':
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
                    {dateFormat(new Date(data.attend_date))}
                  </TableCell>
                  <TableCell align="center">{data.attend_start ? data.attend_start : '-'}</TableCell>
                  <TableCell align="center">{data.attend_end ? data.attend_end : '-'}</TableCell>
                  <TableCell align="center">
                    <OrderStatus status={data.attend_status} />
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
