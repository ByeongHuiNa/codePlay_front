import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// // third-party
// import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { Grid, Pagination } from '../../../node_modules/@mui/material/index';
import axios from '../../../node_modules/axios/index';
import MainCard from 'components/MainCard';

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
    id: 'start',
    align: 'center',
    disablePadding: false,
    label: '출근시간'
  },
  {
    id: 'end',
    align: 'center',
    disablePadding: false,
    label: '퇴근시간'
  },
  {
    id: 'hours',
    align: 'center',
    disablePadding: false,
    label: '근무시간'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: '근태상태'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function AttendanceDayTableHead({ order, orderBy }) {
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

AttendanceDayTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const AttendanceDayStatus = ({ status }) => {
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

AttendanceDayStatus.propTypes = {
  status: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

export default function AttendanceDayTable({ depts, filterDate }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  console.log(`filterDate:`, typeof filterDate);
  console.log('부서번호: ' + depts);

  const [total, setTotal] = useState(0); //출퇴근 전체개수
  const [normal, setNormal] = useState(0);
  const [odd, setOdd] = useState(0);
  const [leave, setLeave] = useState(0);
  // const [normal, setNormal] = useState(0);
  // const [odd, setOdd] = useState(0);
  // const [leave, setLeave] = useState(0);

  const [attend, setAttend] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  const [filterAttend, setFilterAttend] = useState([]); //오늘날짜의 데이터 필터링

  useEffect(() => {
    async function get() {
      const result = await axios.get(`/see-all-attendance-day?dept_no=${depts}`);

      setAttend(result.data);
      console.log(attend);

      // `result.data` 배열을 필터링하여 오늘 날짜에 해당하는 데이터만 가져오기
      const filteredData = result.data.filter((attend) => {
        // `filterDate`를 파싱하여 연, 월, 일을 추출
        const filterDateParts = filterDate.split('.'); // 예: "2023. 11. 7." -> ["2023", "11", "7"]

        const filterYear = parseInt(filterDateParts[0], 10);
        const filterMonth = parseInt(filterDateParts[1], 10);
        const filterDay = parseInt(filterDateParts[2], 10);

        // `attend_date`를 파싱하여 연, 월, 일을 추출
        const attendDateParts = attend.attend_date.split(' ')[0].split('-'); // 예: "2023-11-07 00:00:00" -> ["2023", "11", "07"]

        const attendYear = parseInt(attendDateParts[0], 10);
        const attendMonth = parseInt(attendDateParts[1], 10);
        const attendDay = parseInt(attendDateParts[2], 10);
        // `attend_date`와 오늘 날짜를 비교
        return filterYear === attendYear && filterMonth === attendMonth && filterDay === attendDay;
      });

      // `filteredData`를 `filterAttend` 상태 변수에 설정
      setFilterAttend(filteredData);

      // 변수 초기화
      let normalCount = 0;
      let oddCount = 0;
      let leaveCount = 0;

      // "attendance" 배열을 반복하여 상태별로 개수 계산
      filterAttend.forEach((item) => {
        if (item.attend_status === '정상') {
          normalCount++;
        } else if (item.attend_status === '지각' || item.attend_status === '조퇴' || item.attend_status === '결근') {
          oddCount++
        } else if (item.attend_status.includes('휴가')) {
          leaveCount++;
        }
      });
      setTotal(filterAttend.length);
      setNormal(normalCount);
      setOdd(oddCount);
      setLeave(leaveCount);
    }
    get();
  }, [filterAttend]);
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
          <AttendanceDayTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(filterAttend, getComparator(order, orderBy)).map((attend, index) => {
              const isItemSelected = isSelected(attend.date);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={attend.attend_no}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="center">
                    <Link color="secondary" component={RouterLink} to="">
                      {attend.user_name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{attend.user_position}</TableCell>
                  <TableCell align="center">{attend.attend_start}</TableCell>
                  <TableCell align="center">{attend.attend_end}</TableCell>
                  <TableCell align="center">{attend.attend_total}</TableCell>
                  <TableCell align="center">
                    <AttendanceDayStatus status={attend.attend_status} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack alignItems="center" mt={2}>
        <Pagination count={5} variant="outlined" shape="rounded" />
      </Stack>
    </Box>
  );
}
