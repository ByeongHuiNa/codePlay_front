import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// // third-party
// import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { Grid } from '../../../node_modules/@mui/material/index';
import MainCard from 'components/MainCard';
import { useAttendanceState } from 'store/module';
import axios from '../../../node_modules/axios/index';

// function createData(date, start, end, status) {
//   return { date, start, end, status };
// }

// const rows = [
//   createData(20231012, '09:00', '18:00', 0),
//   createData(20231012, '09:00', '18:00', 1),
//   createData(20231012, '09:00', '18:00', 2),
//   createData(20231012, '09:00', '18:00', 3),
//   createData(20231012, '09:00', '18:00', 4)

//   //   createData(98756325, 'Mobile', 355, 1, 90989),
//   //   createData(98652366, 'Handset', 50, 1, 10239),
//   //   createData(13286564, 'Computer Accessories', 100, 1, 83348),
//   //   createData(86739658, 'TV', 99, 0, 410780),
//   //   createData(13256498, 'Keyboard', 125, 2, 70999),
// ];

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
    id: 'date',
    align: 'center',
    disablePadding: false,
    label: '일자'
  },
  {
    id: 'day',
    align: 'center',
    disablePadding: false,
    label: '요일'
  },
  {
    id: 'start',
    align: 'center',
    disablePadding: false,
    label: '출근시각'
  },
  {
    id: 'end',
    align: 'center',
    disablePadding: false,
    label: '퇴근시각'
  },
  {
    id: 'total',
    align: 'center',
    disablePadding: false,
    label: '근무시간'
  },
  {
    id: 'total',
    align: 'center',
    disablePadding: false,
    label: '연장근무시간'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: '근태상태'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function AttendanceTableHead({ order, orderBy }) {
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

AttendanceTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const AttendanceStatus = ({ status }) => {
  let color;
  let title;

  // 0 : 정상출근
  // 1 : 휴가(연차,반차,공가)
  // 2 : 지각
  // 3 : 조퇴(조기퇴근)
  // 4 : 결근(출근 혹은 퇴근누락))
  // 5 : 연장
  // 6: 초과

  switch (status) {
    case '정상':
      color = 'success';
      title = '정상';
      break;
    case '휴가(연차)':
      color = 'primary';
      title = '휴가(연차)';
      break;
    case '휴가(오전반차)':
      color = 'primary';
      title = '휴가(오전반차)';
      break;
    case '휴가(오후반차)':
      color = 'primary';
      title = '휴가(오후반차)';
      break;
    case '휴가(공가)':
      color = 'primary';
      title = '휴가(공가)';
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
    case '연장':
      color = 'success';
      title = '연장';
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
  status: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

export default function AttendanceTable({ month, user_no }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [total, setTotal] = useState(0);
  const [normal, setNormal] = useState(0);
  const [odd, setOdd] = useState(0);
  const [leave, setLeave] = useState(0);
  //const [selected] = useState([]);
  const { attendance, setAttendance } = useAttendanceState();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  // let normal = 0;
  // let notnormal = 0;
  // let leave = 0;

  // const [total, setTotal] = useState(0); //출퇴근현황 개수
  // const [normal, setNormal] = useState(0); //정상 출퇴근 개수
  // const [problem, setProblem] = useState(0); //근태이상 개수
  // const [leave, setLeave] = useState(0); //휴가 개수

  useEffect(() => {
    async function get() {
      //const endPoints = ['http://localhost:8000/attendance'];
      //const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      // result[0].data를 필터링하여 leave_status가 1인 데이터만 추출
      const result = await axios.get(`/user-attend-month?user_no=${user_no}&month=${month}`);

      setAttendance(result.data);
      console.log('attendance: ' + attendance);
      console.log('zzzz: ' + result.data.length);

      setTotal(result.data.length);

      // 변수 초기화
      let normalCount = 0;
      let oddCount = 0;
      let leaveCount = 0;

      // "attendance" 배열을 반복하여 상태별로 개수 계산
      result.data.forEach((item) => {
        if (item.attend_status === '정상') {
          normalCount++;
        } else if (item.attend_status === '지각' || item.attend_status === '조퇴' || item.attend_status === '결근') {
          oddCount++;
        } else if (item.attend_status.includes('휴가')) {
          leaveCount++;
        }
      });

      setTotal(result.data.length);
      setNormal(normalCount);
      setOdd(oddCount);
      setLeave(leaveCount);
    }
    get();
  }, [month]);

  //const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box sx={{ mt: 3 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container xs={9} rowSpacing={4} columnSpacing={2.75}>
          <Grid item xs={3}>
            <MainCard>
              <Typography variant="h4" style={{ textAlign: 'center' }}>
                전체
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {total}건
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={3}>
            <MainCard>
              <Typography variant="h4" style={{ textAlign: 'center' }}>
                정상
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {normal}건
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={3}>
            <MainCard>
              <Typography variant="h4" style={{ textAlign: 'center' }}>
                근태이상
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {odd}건
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={3}>
            <MainCard>
              <Typography variant="h4" style={{ textAlign: 'center' }}>
                휴가
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {leave}건
              </Typography>
            </MainCard>
          </Grid>
        </Grid>
      </div>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
          // maxHeight를 설정하여 테이블 높이를 제한
          maxHeight: '400px' // 원하는 높이로 변경하세요
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
          <AttendanceTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {Object.values(attendance)

              // .slice(0, 5)
              .map((attendance) => {
                const dateObject = new Date(attendance.attend_date);
                const dateObject1 = new Date(attendance.attend_date);
                const formattedDate = dateObject.toLocaleDateString();
                const day = dateObject1.getDay();
                const dayName = daysOfWeek[day];
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    //aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={attendance.attend_no}
                    //selected={isItemSelected}
                  >
                    <TableCell align="center">{formattedDate}</TableCell>
                    <TableCell align="center">{dayName}</TableCell>
                    <TableCell align="center">{attendance.attend_start}</TableCell>
                    <TableCell align="center">{attendance.attend_end}</TableCell>
                    <TableCell align="center">{attendance.attend_total}</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">
                      <AttendanceStatus status={attendance.attend_status} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Stack alignItems="center" mt={3}>
        <Pagination count={5} variant="outlined" shape="rounded" />
      </Stack> */}
    </Box>
  );
}
