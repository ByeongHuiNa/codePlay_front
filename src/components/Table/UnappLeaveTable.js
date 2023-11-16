import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project import
import { Button, Typography } from '../../../node_modules/@mui/material/index';
import { useFormatter } from 'store/module';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| STATUS ||============================== //

const LeaveStatus = ({ status }) => {
  // 0 : 연차
  // 1 : 오전반차
  // 2 : 오후반차
  // 3 : 공가
  // 4 : 휴가취소
  let title;
  switch (status) {
    case 0:
      title = '연차';
      break;
    case 1:
      title = '오전 반차';
      break;
    case 2:
      title = '오후 반차';
      break;
    case 3:
      title = '공가';
      break;
    case 4:
      title = '휴가 취소';
  }

  return <Typography>{title}</Typography>;
};

LeaveStatus.propTypes = {
  status: PropTypes.number
};

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
    id: 'cancel',
    align: 'center',
    disablePadding: false,
    label: '취소'
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

export default function UnappLeaveTable({ leaveCancel, handleOpen, datas }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  // 날짜 형식
  const { dateFormat } = useFormatter();

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          height: '253px',
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
            {stableSort(datas, getComparator(order, orderBy)).map((data, index) => {
              const isItemSelected = isSelected(data.date);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={data.date}
                  selected={isItemSelected}
                  onClick={(event) => {
                    // 버튼이 클릭되었을 때 이벤트 전파를 중지
                    if (event.target.tagName.toLowerCase() === 'button') {
                      event.stopPropagation();
                    } else {
                      handleOpen(data);
                    }
                  }}
                >
                  <TableCell component="th" id={labelId} scope="data" align="center">
                    {dateFormat(new Date(data.leaveapp_start))}
                  </TableCell>
                  <TableCell align="center">{dateFormat(new Date(data.leaveapp_end))}</TableCell>
                  <TableCell align="center">
                    <LeaveStatus status={data.leaveapp_type} />
                  </TableCell>
                  <TableCell align="center">{data.leaveapp_total}일</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" size="small" onClick={() => leaveCancel(data.leaveapp_no)}>
                      취소
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
