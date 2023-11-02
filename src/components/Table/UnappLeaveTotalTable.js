import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project import
import { Button, Pagination, Stack } from '../../../node_modules/@mui/material/index';
import { useUnApprovalState } from 'store/module';
import axios from '../../../node_modules/axios/index';

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
//결재대기 테이블
export default function UnappLeaveTotalTable({ leaveCancel, month, handleOpen }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const { apps, setApps } = useUnApprovalState();

  useEffect(() => {
    async function get() {
      //const endPoints = ['http://localhost:8000/leave_approval'];
      //const result = await axios.all(endPoints.map((endPoint) => axios.get(endPoint)));
      const result = await axios.get(`/user-leave-wait?user_no=1&month=${month}`);
      console.log('대기: ' + result.data);

      // result[0].data를 필터링하여 leave_status가 3(결재대기)인 데이터만 추출
      //const filteredData = result.data.filter((item) => item.leaveapp_status == 3);

      setApps(result.data);
    }
    get();
  }, [month]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          height: '286px',
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
          {stableSort(apps, getComparator(order, orderBy)).map((app, index) => {
              const isItemSelected = isSelected(app.date);
              const labelId = `enhanced-table-checkbox-${index}`;

              return(
              <TableRow
                hover
                role="checkbox"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={app.data}
                selected={isItemSelected}
                onClick={() => {
                  handleOpen(app);
                }}
              >
                <TableCell component="th" id={labelId} scope="data" align="center">
                  {app.leaveapp_start}
                </TableCell>
                <TableCell align="center">{app.leaveapp_end}</TableCell>

                <TableCell align="center">
                  <Type type={app.leaveapp_type} />
                </TableCell>
                <TableCell align="center">{app.leaveapp_total}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" size="small" onClick={leaveCancel}>
                    취소
                  </Button>
                </TableCell>
              </TableRow>
              );
              })}

            {/* {stableSort(datas, getComparator(order, orderBy)).map((data, index) => {
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
                    {data.leaveStart}
                  </TableCell>
                  <TableCell align="center">{data.leaveEnd}</TableCell>
                  <TableCell align="center">{data.leaveType}</TableCell>
                  <TableCell align="center">{data.leaveCnt}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" size="small" onClick={leaveCancel}>
                      취소
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })} */}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack alignItems="center" mt={-2.5}>
        <Pagination count={5} variant="outlined" shape="rounded" />
      </Stack>
    </Box>
  );
}
