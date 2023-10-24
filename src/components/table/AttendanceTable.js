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
    label: '날짜'
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

  switch (status) {
    case 0:
      color = 'success';
      title = '정상';
      break;
    case 1:
      color = 'primary';
      title = '휴가';
      break;
    case 2:
      color = 'secondary';
      title = '지각';
      break;
    case 3:
      color = 'warning';
      title = '조퇴';
      break;
    case 4:
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

export default function AttendanceTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  //const [selected] = useState([]);
  const { attendance, setAttendance } = useAttendanceState();

  useEffect(() => {
    async function get() {
      const endPoints = ['http://localhost:8000/leave_approval'];
      const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
       // result[0].data를 필터링하여 leave_status가 1인 데이터만 추출
      //const filteredData = result[0].data.filter((item) => item.leave_status === 1);

      setAttendance(result[0].data);
    }
    get();
  }, []);

  //const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box sx={{mt:3}}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid container xs={9} rowSpacing={4} columnSpacing={2.75}>
        <Grid item xs={3}>
          <MainCard>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              전체
            </Typography>
            <Typography variant="h5" style={{ textAlign: 'center' }}>
              7건
            </Typography>
          </MainCard>
        </Grid>
        <Grid item xs={3}>
          <MainCard>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              정상
            </Typography>
            <Typography variant="h5" style={{ textAlign: 'center' }}>
              7건
            </Typography>
          </MainCard>
        </Grid>
        <Grid item xs={3}>
          <MainCard>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              근태이상
            </Typography>
            <Typography variant="h5" style={{ textAlign: 'center' }}>
              0건
            </Typography>
          </MainCard>
        </Grid>
        <Grid item xs={3}>
          <MainCard>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              휴가
            </Typography>
            <Typography variant="h5" style={{ textAlign: 'center' }}>
              0건
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
          <AttendanceTableHead order={order} orderBy={orderBy} />
          <TableBody>
          {Object.values(attendance).slice(0,5).map((attendance) => (
              // const isItemSelected = isSelected(row.date);
              // const labelId = `enhanced-table-checkbox-${index}`;

            
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  //aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={attendance.attend_end}
                  //selected={isItemSelected}
                >
                  <TableCell component="th" id={attendance.attend_no} scope="row" align="center">
                    <Link color="secondary" component={RouterLink} to="">
                      {attendance.attend_date}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{attendance.attend_start}</TableCell>
                  <TableCell align="center">{attendance.attend_end}</TableCell>
                  <TableCell align="center">
                    <AttendanceStatus status={attendance.attend_status} />
                  </TableCell>
                </TableRow>
              
            ))};
          </TableBody>
          {/* <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.date);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.trackingNo}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="center">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.date}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{row.start}</TableCell>
                  <TableCell align="center">{row.end}</TableCell>
                  <TableCell align="center">
                    <AttendanceStatus status={row.status} />
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
