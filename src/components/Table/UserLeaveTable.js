import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project import
import Dot from 'components/@extended/Dot';
import { Typography } from '../../../node_modules/@mui/material/index';
import { useAllApprovalState1 } from 'store/module';
import axios from '../../../node_modules/axios/index';

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'leaveType',
    align: 'center',
    disablePadding: false,
    label: '휴가종류'
  },
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
    id: 'leaveStatus',
    align: 'center',
    disablePadding: false,
    label: '결재상태'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function UserLeaveTableHead({ order, orderBy }) {
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

UserLeaveTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

//결재상태
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
      title = '결재진행중';
      break;
    case 3:
      color = 'primary';
      title = '결재대기';
      break;
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
//휴가종류
const Type = ({ type }) => {
  let title;

  // 0 : 연차
  // 1 : 오전반차
  // 2 : 오후반차
  // 3 : 공가
  // 4 : 휴가취소

  switch (type) {
    case 0:
      title = '연차';
      break;
    case 1:
      title = '오전반차';
      break;
    case 2:
      title = '오후반차';
      break;
    case 3:
      title = '공가';
      break;
    case 4:
      title = '휴가취소';
      break;
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      {title}
    </Stack>
  );
};

Type.propTypes = {
  type: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //
//메인페이지 휴가신청목록
export default function UserLeaveTable({ user_no }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  //const [selected] = useState([]);
  const { app, setApp } = useAllApprovalState1();

  //const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  useEffect(() => {
    async function get() {
      const result = await axios.get(`/user-leave-request-main?user_no=${user_no}`);
      setApp(result.data);
    }
    get();
  }, []);

  return (
    <Box sx={{ width: '105%' }}>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
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
          <UserLeaveTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {Object.values(app)
              .slice(0, 5)
              .map((app) => (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  //aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={app.leaveapp_no}
                  //selected={isItemSelected}
                >
                  <TableCell component="th" id={app.leaveapp_no} scope="data" align="center">
                    <Type type={app.leaveapp_type} />
                  </TableCell>
                  <TableCell align="center">{app.leaveapp_start}</TableCell>
                  <TableCell align="center">{app.leaveapp_end}</TableCell>

                  <TableCell align="center">
                    <OrderStatus status={app.leaveapp_status} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          {/* <TableBody>
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
                >
                  <TableCell component="th" id={labelId} scope="data" align="center">
                    {data.leaveType}
                  </TableCell>
                  <TableCell align="center">{data.leaveStart}</TableCell>
                  <TableCell align="center">{data.leaveEnd}</TableCell>

                  <TableCell align="center">
                    <UserLeaveStatus status={data.leaveStatus} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody> */}
        </Table>
      </TableContainer>
    </Box>
  );
}
