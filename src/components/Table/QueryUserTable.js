import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from '../../../node_modules/axios/index';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import { Avatar, Button, Pagination, Stack } from '../../../node_modules/@mui/material/index';

// zusthand
import { useCriteria, useUserTableListState } from 'store/module';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

// TODO:정렬 구현하기
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
            align="center"
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
  const { tableContentList, setTableList } = useUserTableListState();
  const { total_page, now_page, setPage, limit, search } = useCriteria();

  async function search_user(search, page) {
    const result = await axios.get(`/user-query?user_name=${search}&_page=${page}&_limit=${limit}`);
    setTableList(result.data);
  }

  let navigate = useNavigate();
  function modifiyClick(user_no) {
    navigate('/userInformationModify', { state: { user_no } });
  }

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
              {Object.keys(tableContentList).length > 0 &&
                stableSort(tableContentList, getComparator(order, orderBy)).map((row, index) => {
                  const isItemSelected = isSelected(row.trackingNo);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  // TODO: TableRow의 key 값 user_no로 변경할것.
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row" align="center">
                        <Avatar src={row.user_profile} sx={{ width: 50, height: 50, margin: 'auto' }}></Avatar>
                      </TableCell>
                      <TableCell align="center">{row.dept_name}</TableCell>
                      <TableCell align="center">{row.user_name}</TableCell>
                      <TableCell align="center">{row.user_position}</TableCell>
                      <TableCell align="center">{row.user_birth_date}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => modifiyClick(row.user_no)}> 사용자 정보 변경</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack alignItems="center" mt={2}>
        <Pagination
          count={total_page}
          page={now_page}
          onChange={(event, page) => {
            setPage(page);
            search_user(search, page);
          }}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </>
  );
}
