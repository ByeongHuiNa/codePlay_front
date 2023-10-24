import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project import
import { Chip } from '../../../node_modules/@mui/material/index';
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

const UserLeaveStatus = ({ status }) => {
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
      <Chip label={title} color={color} />
    </Stack>
  );
};

UserLeaveStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function UserLeaveTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  //const [selected] = useState([]);
  const { app, setApp } = useAllApprovalState1();

  //const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  useEffect(() => {
    async function get() {
      const endPoints = ['http://localhost:8000/leave_approval'];
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      // result[0].data를 필터링하여 leave_status가 1인 데이터만 추출
      //const filteredData = result[0].data.filter((item) => item.leave_status === 1);

      setApp(result[0].data);
    }
    get();
  }, []);
  // function createData(leaveType, leaveStart, leaveEnd, leaveCnt, leaveStatus) {
  //   return { leaveType, leaveStart, leaveEnd, leaveCnt, leaveStatus };
  // }

  // const datas = [
  //   createData('연차', '2023/10/17', '2023/10/18', '2', 2),
  //   createData('연차', '2023/10/11', '2023/10/11', '1', 0),
  //   createData('연차', '2023/10/08', '2023/10/10', '1', 1),
  //   createData('오전반차', '2023/09/12', '2023/09/12', '0.5', 0),
  //   createData('오후반차', '2023/09/02', '2023/09/02', '0.5', 0)
  // ];

  return (
    <Box sx={{ width: '103%' }}>
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
                    {app.leaveapp_type}
                  </TableCell>
                  <TableCell align="center">{app.leaveapp_start}</TableCell>
                  <TableCell align="center">{app.leaveapp_end}</TableCell>

                  <TableCell align="center">
                    <UserLeaveStatus status={app.leaveapp_status} />
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
