import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// // third-party
// import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { InputAdornment, TextField } from '../../../node_modules/@mui/material/index';
import { useAllLeaveState } from 'store/module';
import axios from '../../../node_modules/axios/index';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { Progress } from 'react-sweet-progress';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import '../../assets/third-party/vacation-percent.css';

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
    id: 'total',
    align: 'center',
    disablePadding: false,
    label: '총휴가일수'
  },
  {
    id: 'use',
    align: 'center',
    disablePadding: false,
    label: '사용일수'
  },
  {
    id: 'remain',
    align: 'center',
    disablePadding: false,
    label: '잔여일수'
  },
  {
    id: 'percent',
    align: 'center',
    disablePadding: false,
    label: '휴가사용률'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function VacationCountTableHead({ order, orderBy }) {
  return (
    <TableHead
      sx={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#f9f9f9',
        zIndex: 1 // 다른 요소 위에 표시되도록 설정
      }}
    >
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

VacationCountTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const VacationStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

VacationStatus.propTypes = {
  status: PropTypes.number
};

const progressColor = (percent) => {
  if (percent >= 0 && percent <= 50) {
    return '#ff0000'; // 빨간색
  } else if (percent > 50 && percent <= 70) {
    return '#29abe2'; // 파란색
  } else {
    return '#00c642'; // 기본값, 에러 상태 등에 사용될 색상
  }
};
// ==============================|| ORDER TABLE ||============================== //

export default function VacationCountTable({ depts }) {

 

  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const { allLeave, setAllLeave } = useAllLeaveState();
  const [search, setSearch] = useState(''); // 검색어 상태 변수
  const [filteredAllLeave, setFilteredAllLeave] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    async function get() {
      //const endPoints = ['http://localhost:8000/user_leave'];
      const result = await axios.get(`/see-all-leave?dept_no=${depts}`);
      //const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      // result[0].data를 필터링하여 leave_status가 1인 데이터만 추출
      //const filteredData = result[0].data.filter((item) => item.leave_status === 1);
      setAllLeave(result.data);
      setFilteredAllLeave(result.data); // 초기 데이터 설정
    }
    get();
  }, [depts]);

  // 검색어를 기반으로 목록 필터링
  useEffect(() => {
    const filteredData = allLeave.filter((item) => item.user_name.toLowerCase().includes(search.toLowerCase()));
    setFilteredAllLeave(filteredData);
  }, [search, allLeave]);

  function nameClick(user_no) {
    navigate('/seeUserAttendance', { state: { user_no } });
  }
  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box>
      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
        <TextField
          variant="outlined"
          id="outlined-basic"
          label="사원명"
          onChange={(e) => setSearch(e.target.value)} // 검색어 업데이트
          value={search}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonSearchIcon />
              </InputAdornment>
            )
          }}
        />
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
          <VacationCountTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(filteredAllLeave, getComparator(order, orderBy)).map((allLeave, index) => {
              const isItemSelected = isSelected(allLeave.date);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={allLeave.data}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="center">
                    <Link color="secondary" onClick={() => nameClick(allLeave.user_no)} style={{ cursor: 'pointer' }}>
                      {allLeave.user_name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{allLeave.user_position}</TableCell>
                  <TableCell align="center">{allLeave.leave_total}일</TableCell>
                  <TableCell align="center">{allLeave.leave_use}일</TableCell>
                  <TableCell align="center">{allLeave.leave_remain}일</TableCell>
                  <TableCell align="center">
                    <Progress
                      percent={allLeave.leave_percent}
                      theme={{
                        active: {
                          color: progressColor(allLeave.leave_percent)
                        }
                      }}
                    />
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
