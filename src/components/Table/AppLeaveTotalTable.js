import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project import
import { Button, Chip, Pagination } from '../../../node_modules/@mui/material/index';
import LeaveModal from 'components/Modal/LeaveModal';
import { useApprovalState2 } from 'store/module';
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
    id: 'approver1',
    align: 'center',
    disablePadding: false,
    label: '1차결재자'
  },
  {
    id: 'approver2',
    align: 'center',
    disablePadding: false,
    label: '2차결재자'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: '결재상태'
  },
  {
    id: 'cancel',
    align: 'center',
    disablePadding: false,
    label: '취소신청'
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
      <Chip label={title} color={color} />
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
//승인, 반려 테이블
export default function AppLeaveTotalTable({ requestLeaveCancel }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  //const [selected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { app, setApp } = useApprovalState2();

  useEffect(() => {
    async function get() {
      //const endPoints = ['http://localhost:8000/leave_approval'];
      //const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      const result = await axios.get('/user-leave-request?user_no=1');
      // result[0].data를 필터링하여 leave_status가 1인 데이터만 추출
      //const filteredData = result[0].data.filter((item) => item.leaveapp_status === 0 || item.leaveapp_status === 1);
      console.log('result: ' + result.data);
      setApp(result.data);
    }
    get();
  }, []);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  //const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  // function createData(leaveStart, leaveEnd, leaveType, leaveCnt, appDate, approver, status) {
  //   return { leaveStart, leaveEnd, leaveType, leaveCnt, appDate, approver, status };
  // }

  // const datas = [
  //   createData('2023/10/11', '2023/10/11', '연차', '1', '2023/10/07', '이유나 팀장', 0),
  //   createData('2023/10/11', '2023/10/11', '반차(오전)', '0.5', '2023/10/07', '이유나 팀장', 0),
  //   createData('2023/10/11', '2023/10/11', '연차', '1', '2023/10/07', '이유나 팀장', 1),
  //   createData('2023/10/11', '2023/10/13', '연차', '3', '2023/10/07', '이유나 팀장', 0),
  //   createData('2023/10/11', '2023/10/11', '연차', '1', '2023/10/07', '이유나 팀장', 0)
  // ];

  return (
    <Box>
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
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {Object.values(app)
              .slice(0, 5)
              .map((app) => (
                //const isItemSelected = isSelected(data.date);
                //const labelId = `enhanced-table-checkbox-${index}`;

                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  //aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={app.leaveapp_no}
                  //selected={isItemSelected}
                  onClick={handleOpen}
                >
                  {modalOpen && <LeaveModal open={handleOpen} handleClose={handleClose} />}
                  <TableCell component="th" id={app.leaveapp_no} scope="data" align="center">
                    {app.leaveapp_start}
                  </TableCell>
                  {/* <TableCell align="center">{app.leaveEnd}</TableCell> */}
                  <TableCell align="center">{app.leaveapp_end}</TableCell>
                  <TableCell align="center">
                    <Type type={app.leaveapp_type} />
                  </TableCell>
                  <TableCell align="center">{app.leaveapp_total}</TableCell>
                  <TableCell align="center">{app.one}</TableCell>
                  <TableCell align="center">{app.two}</TableCell>
                  <TableCell align="center">
                    <OrderStatus status={app.leaveapp_status} />
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" size="small" onClick={requestLeaveCancel}>
                      취소신청
                    </Button>
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
                  onClick={handleOpen}
                
                  
                  
                >
                  {modalOpen && <LeaveModal open={handleOpen} handleClose={handleClose} />}
                  <TableCell component="th" id={labelId} scope="data" align="center">
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
                  <TableCell align="center">
                    <Button variant="contained" size="small" onClick={requestLeaveCancel}>
                      취소신청
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody> */}
        </Table>
      </TableContainer>
      <Stack alignItems="center" mt={3}>
        <Pagination count={5} variant="outlined" shape="rounded" />
      </Stack>
    </Box>
  );
}
