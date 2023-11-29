import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Typography, Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project import
import Dot from 'components/@extended/Dot';
//import { useAllApprovalState1 } from 'store/module';
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
    id: 'attendDate',
    align: 'center',
    disablePadding: false,
    label: '날짜'
  },
  {
    id: 'attendStart',
    align: 'center',
    disablePadding: false,
    label: '출근 시각'
  },
  {
    id: 'attendEnd',
    align: 'center',
    disablePadding: false,
    label: '퇴근시각'
  },
  {
    id: 'attendStatus',
    align: 'center',
    disablePadding: false,
    label: '근태상태'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function UserAttendTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: `300px`, backgroundColor: '#f9f9f9' }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

UserAttendTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

//결재상태
const AttendanceStatus = ({ status }) => {
  let color;
  let title;

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
      title = '반차';
      break;
    case '휴가(오후반차)':
      color = 'primary';
      title = '반차';
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
      break;
      case '초과':
        color = 'success';
        title = '초과';
        break;
    default:
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

AttendanceStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //
//메인페이지 최근5개근태목록
export default function UserAttendTable({ user_no }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  //const [selected] = useState([]);
  const [attend, setAttend] = useState([]);

  //const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  useEffect(() => {
    async function get() {
      const result = await axios.get(`/user-attend?user_no=${user_no}`);
      setAttend(result.data);
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
          <UserAttendTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {Object.values(attend)
              .slice(0, 5)
              .map((attend) => {
                const dateObject = new Date(attend.attend_date);
                const formattedDate = dateObject.toLocaleDateString();
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&  :last-child td, &:last-child th': { border: 0 } }}
                    //aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={attend.attend_no}
                    //selected={isItemSelected}
                  >
                    <TableCell align="center">{formattedDate}</TableCell>
                    <TableCell align="center">{attend.attend_start}</TableCell>
                    <TableCell align="center">{attend.attend_end}</TableCell>

                    <TableCell align="center">
                      <AttendanceStatus status={attend.attend_status} />
                    </TableCell>
                  </TableRow>
                );
              })}
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
