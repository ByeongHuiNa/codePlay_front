import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// // third-party
// import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { Grid } from '../../../node_modules/@mui/material/index';
import MainCard from 'components/MainCard';
import axios from '../../../node_modules/axios/index';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

// function createData(name, position, mon, tues, wednes, thurs, fri, weekhours) {
//   return { name, position, mon, tues, wednes, thurs, fri, weekhours };
// }

// const rows = [
//   createData('나병희', '연구원', 0, 0, 0, 0, 0, 40),
//   createData('홍길동', '선임', 0, 1, 1, 0, 0, 40),
//   createData('이순신', '주임', 0, 1, 1, 0, 0, 40),
//   createData('아무개', '팀장', 0, 1, 1, 0, 0, 40),
//   createData('팀쿡', '사장', 0, 1, 1, 1, 2, 40)
// ];

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

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'name',
    align: 'center',
    disablePadding: false,
    label: '이름'
  },
  {
    id: 'position',
    align: 'center',
    disablePadding: true,
    label: '직책'
  },
  {
    id: 'mon',
    align: 'center',
    disablePadding: false,
    label: '월'
  },
  {
    id: 'tues',
    align: 'center',
    disablePadding: false,
    label: '화'
  },
  {
    id: 'wednes',
    align: 'center',
    disablePadding: false,
    label: '수'
  },
  {
    id: 'thurs',
    align: 'center',
    disablePadding: false,
    label: '목'
  },
  {
    id: 'fri',
    align: 'center',
    disablePadding: false,
    label: '금'
  },
  {
    id: 'sat',
    align: 'center',
    disablePadding: false,
    label: '토'
  },
  {
    id: 'sun',
    align: 'center',
    disablePadding: false,
    label: '일'
  },
  {
    id: 'weekhours',
    align: 'center',
    disablePadding: false,
    label: '주간근무시간'
  },
  {
    id: 'overtimehours',
    align: 'center',
    disablePadding: false,
    label: '연장근무시간'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function AttendanceWeekTableHead({ order, orderBy }) {
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

AttendanceWeekTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const AttendanceWeekStatus = ({ status }) => {
  let color;
  let title;

  // 0 : 정상출근
  // 1 : 휴가(연차,반차,공가)
  // 2 : 지각
  // 3 : 조퇴(조기퇴근)
  // 4 : 결근(출근 혹은 퇴근누락))

  switch (status) {
    case '정상':
      color = 'success';
      title = '정상 ';
      break;
    case '휴가(연차)':
      color = 'primary';
      title = '연차 ';
      break;
    case '휴가(오전반차)':
      color = 'primary';
      title = '반차 ';
      break;
    case '휴가(오후반차)':
      color = 'primary';
      title = '반차 ';
      break;
    case '휴가(공가)':
      color = 'primary';
      title = '공가';
      break;
    case '지각':
      color = 'warning';
      title = '지각 ';
      break;
    case '조퇴':
      color = 'warning';
      title = '조퇴 ';
      break;
    case '결근':
      color = 'error';
      title = '결근 ';
      break;
      case '초과':
      color = 'success';
      title = '초과 ';
      break;
    default:
      color = 'secondary';
      title = '미처리';
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

AttendanceWeekStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function AttendanceWeekTable({ depts, filterDate }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [attend, setAttend] = useState([]); //근태내역
  let navigate = useNavigate();

  function nameClick(user_no) {
    navigate('/seeUserAttendance', { state: { user_no } });
  }

  useEffect(() => {
    console.log(depts);
    console.log('날짜: ' + filterDate);
    async function get() {
      const result = await axios.get(`/see-all-attendance-week?dept_no=${depts}&week_monday=${filterDate}`);
      setAttend(result.data);
      console.log('주별 근태: ' + attend);
    }
    get();
  }, [filterDate]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container xs={9} rowSpacing={4} columnSpacing={2.75}>
          <Grid item xs={3}>
            <MainCard>
              <Typography variant="h4" style={{ textAlign: 'center' }}>
                전체
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {/* {total}건 */}
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={3}>
            <MainCard>
              <Typography variant="h4" style={{ textAlign: 'center' }}>
                정상
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {/* {normal}건 */}
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={3}>
            <MainCard>
              <Typography variant="h4" style={{ textAlign: 'center' }}>
                근태이상
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {/* {odd}건 */}
              </Typography>
            </MainCard>
          </Grid>
          <Grid item xs={3}>
            <MainCard>
              <Typography variant="h4" style={{ textAlign: 'center' }}>
                휴가
              </Typography>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {/* {leave}건 */}
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
          <AttendanceWeekTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(attend, getComparator(order, orderBy)).map((attend, index) => {
              const isItemSelected = isSelected(attend.date);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={attend.dept_no}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="center">
                    <Link color="secondary" onClick={() => nameClick(attend.user_no)}>
                      {attend.user_name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{attend.user_position}</TableCell>
                  <TableCell align="center">
                    <AttendanceWeekStatus status={attend.monday_status} />
                  </TableCell>
                  <TableCell align="center">
                    <AttendanceWeekStatus status={attend.tuesday_status} />
                  </TableCell>
                  <TableCell align="center">
                    <AttendanceWeekStatus status={attend.wednesday_status} />
                  </TableCell>
                  <TableCell align="center">
                    <AttendanceWeekStatus status={attend.thursday_status} />
                  </TableCell>
                  <TableCell align="center">
                    <AttendanceWeekStatus status={attend.friday_status} />
                  </TableCell>
                  <TableCell align="center">
                    <AttendanceWeekStatus status={attend.saturday_status} />
                  </TableCell>
                  <TableCell align="center">
                    <AttendanceWeekStatus status={attend.sunday_status} />
                  </TableCell>
                  <TableCell align="center">{attend.total_time}</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
