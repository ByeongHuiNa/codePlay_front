import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project import
import { Button, Typography } from '../../../node_modules/@mui/material/index';
import { useFormatter } from 'store/module';
import Dot from 'components/@extended/Dot';

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
    id: 'updateDate',
    align: 'center',
    disablePadding: false,
    label: '수정날짜'
  },
  {
    id: 'title',
    align: 'center',
    disablePadding: false,
    label: '제목'
  },
  {
    id: 'reqDate',
    align: 'center',
    disablePadding: false,
    label: '요청날짜'
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
  },
  {
    id: 'cancel',
    align: 'center',
    disablePadding: false,
    label: '취소요청'
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
            sx={{ backgroundColor: '#e5edf026' }}
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
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function UpdateAttendTable({ handleOpenRead, datas }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  // 날짜 형식
  const { dateFormat } = useFormatter();

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          height: '670px',
          '& td, & th': { whiteSpace: 'nowrap' },
          '&::-webkit-scrollbar': {
            width: 5
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'white'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray',
            borderRadius: 2
          }
        }}
      >
        <Table
          stickyHeader
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
                  key={data.attendapp_no}
                  selected={isItemSelected}
                  onClick={(event) => {
                    if (event.target.tagName.toLowerCase() === 'button') {
                      event.stopPropagation();
                    } else {
                      handleOpenRead(data);
                    }
                  }}
                >
                  <TableCell component="th" id={labelId} scope="data" align="center">
                    {dateFormat(new Date(data.attendedit_date))}
                  </TableCell>
                  <TableCell align="center">{data.attendedit_title}</TableCell>
                  <TableCell align="center">{dateFormat(new Date(data.attend_date))}</TableCell>
                  <TableCell align="center">
                    {data.attendedit_kind === 0 ? '출근' : data.attendedit_kind === 1 ? '퇴근' : '출근/퇴근'}
                  </TableCell>
                  <TableCell align="center">
                    <OrderStatus status={data.attendapp_status} />
                  </TableCell>
                  <TableCell align="center">
                    {data.attendapp_status === 2 && (
                      <Button variant="contained" size="small">
                        취소신청
                      </Button>
                    )}
                    {(data.attendapp_status === 0 || data.attendapp_status === 1) && (
                      <Button variant="contained" color="secondary" size="small" disable>
                        취소신청
                      </Button>
                    )}
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
