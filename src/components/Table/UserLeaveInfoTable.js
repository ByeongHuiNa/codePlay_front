import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Stack, Typography } from '../../../node_modules/@mui/material/index';
import Dot from 'components/@extended/Dot';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'leaveStart',
    align: 'center',
    disablePadding: false,
    label: '휴가시작일'
  },
  {
    id: 'leaveEnd',
    align: 'center',
    disablePadding: false,
    label: '휴가종료일'
  },
  {
    id: 'leaveType',
    align: 'center',
    disablePadding: false,
    label: '휴가종류'
  },
  {
    id: 'leaveCnt',
    align: 'center',
    disablePadding: false,
    label: '휴가사용일수'
  },
  {
    id: 'appDate',
    align: 'center',
    disablePadding: false,
    label: '결재일'
  },
  {
    id: 'approver',
    align: 'center',
    disablePadding: false,
    label: '결재자'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: '결재상태'
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

  // 0 : 결재완료(승인)
  // 1 : 결재완료(반려)
  // 2 : 결재대기
  switch (status) {
    case 0:
      color = 'success';
      title = '결재승인';
      break;
    case 1:
      color = 'error';
      title = '결재반려';
      break;
    case 2:
      color = 'primary';
      title = '결재대기';
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

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function UserLeaveInfoTable({ data }) {
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
            <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={data.leaveStart}>
              {Object.keys(data).length !== 0 && (
                <>
                  <TableCell component="th" scope="data" align="center">
                    {data.leaveStart}
                  </TableCell>
                  <TableCell align="center">{data.leaveEnd}</TableCell>
                  <TableCell align="center">{data.leaveType}</TableCell>
                  <TableCell align="center">{data.leaveCnt}</TableCell>
                  <TableCell align="center">{data.appDate}</TableCell>
                  <TableCell align="center">{data.approver}</TableCell>
                  <TableCell align="center">
                    <OrderStatus status={data.status} />
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
