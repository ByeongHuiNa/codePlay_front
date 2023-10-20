import PropTypes from 'prop-types';
import { useState } from 'react';
//import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// // third-party
// import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { Pagination } from '../../../node_modules/@mui/material/index';

function createData(type, start, end) {
  return { type, start, end };
}

const rows = [
  createData('연차', '2023/10/16', '202310/17'),
  createData('오전반차', '2023/10/14', '202310/14'),
  
  
];

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
    id: 'type',
    align: 'center',
    disablePadding: false,
    label: '휴가종류'
  },
  {
    id: 'start',
    align: 'center',
    disablePadding: true,
    label: '휴가시작일'
  },
  {
    id: 'end',
    align: 'center',
    disablePadding: false,
    label: '휴가종료일'
  }
  
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function ApprovalWaitTableHead({ order, orderBy }) {
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

ApprovalWaitTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const ApprovalWaitStatus = ({ status }) => {
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

ApprovalWaitStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function ApprovalWaitTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

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
          <ApprovalWaitTableHead order={order} orderBy={orderBy} />
          <TableBody>
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
                    {row.type}
                  </TableCell>
                  <TableCell align="center">{row.start}</TableCell>
                  <TableCell align="center">{row.end}</TableCell>
                 
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
