import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project import
import { Chip } from '../../../node_modules/@mui/material/index';

// 아이콘
// import {  } from '@ant-design/icons';

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
    id: 'reqDate',
    align: 'center',
    disablePadding: false,
    label: '요청날짜'
  },
  {
    id: 'title',
    align: 'center',
    disablePadding: false,
    label: '제목'
  },
  {
    id: 'updateDate',
    align: 'center',
    disablePadding: false,
    label: '수정날짜'
  },
  {
    id: 'updateItem',
    align: 'center',
    disablePadding: false,
    label: '수정항목'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: '결재상태'
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
      title = '결재대기';
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

// ==============================|| ORDER TABLE ||============================== //

export default function UpdateAttendTable({ handleOpenRead }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  function createData(reqDate, title, updateDate, updateItem, status) {
    return { reqDate, title, updateDate, updateItem, status };
  }

  const datas = [
    createData('2023/10/07', '이유나/231005/출근', '2023/10/05', '출근', 2),
    createData('2023/10/07', '이유나/231005/출근', '2023/10/05', '출근', 0),
    createData('2023/10/07', '이유나/231005/출근', '2023/10/05', '출근', 1),
    createData('2023/10/07', '이유나/231005/출근', '2023/10/05', '출근', 0),
    createData('2023/10/07', '이유나/231005/출근', '2023/10/05', '출근', 0),
    createData('2023/10/07', '이유나/231005/출근', '2023/10/05', '출근', 0),
    createData('2023/10/07', '이유나/231005/출근', '2023/10/05', '출근', 2),
    createData('2023/10/07', '이유나/231005/출근', '2023/10/05', '출근', 2),
    createData('2023/10/07', '이유나/231005/출근', '2023/10/05', '출근', 0)
  ];

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
                  onClick={handleOpenRead}
                >
                  <TableCell component="th" id={labelId} scope="data" align="center">
                    {data.reqDate}
                  </TableCell>
                  <TableCell align="center">{data.title}</TableCell>
                  <TableCell align="center">{data.updateDate}</TableCell>
                  <TableCell align="center">{data.updateItem}</TableCell>
                  <TableCell align="center">
                    <OrderStatus status={data.status} handleOpenRead={handleOpenRead} />
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
