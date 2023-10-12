import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import { Button, Pagination, Stack } from '../../../node_modules/@mui/material/index';

function createData(url, dept, name, position, brith, button) {
  return { url, dept, name, position, brith, button };
}

const rows = [
  createData('프로필주소', '개발팀', '홍길동', '연구원', 101010, ''),
  createData('프로필주소', '개발팀', '홍길동', '연구원', 101010, '')
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
    id: 'profileImage',
    align: 'left',
    disablePadding: false,
    label: '프로필사진'
  },
  {
    id: 'dept',
    align: 'left',
    disablePadding: false,
    label: '부서명'
  },
  {
    id: 'name',
    align: 'right',
    disablePadding: true,
    label: '이름'
  },
  {
    id: 'position',
    align: 'left',
    disablePadding: false,
    label: '직책'
  },
  {
    id: 'brith',
    align: 'right',
    disablePadding: false,
    label: '생년월일'
  },
  {
    id: 'button',
    align: 'center',
    disablePadding: false,
    label: '버튼'
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

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <>
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
              {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                const isItemSelected = isSelected(row.trackingNo);
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
                    <TableCell component="th" id={labelId} scope="row" align="left">
                      {row.url}
                    </TableCell>
                    <TableCell align="left">{row.dept}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="left">{row.position}</TableCell>
                    <TableCell align="right">{row.brith}</TableCell>
                    <TableCell align="right">
                      <Button> 사용자 정보 변경</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack alignItems="center" mt={2}>
        <Pagination count={5} variant="outlined" shape="rounded" />
      </Stack>
    </>
  );
}
