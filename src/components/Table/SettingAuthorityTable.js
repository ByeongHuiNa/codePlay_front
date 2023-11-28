import PropTypes from 'prop-types';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import { Avatar, Button, Pagination, Stack } from '../../../node_modules/@mui/material/index';
import { useCriteria, useDetailCardState, useTabState, useTableListState } from 'store/module';
import { useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { v4 as uuidv4 } from 'uuid';

const headCells = [
  {
    id: 'profileImage',
    label: '프로필사진'
  },
  {
    id: 'dept',
    label: '부서명'
  },
  {
    id: 'name',
    label: '이름'
  },
  {
    id: 'position',
    label: '직책'
  },
  {
    id: 'brith',
    label: '권한부여일'
  },
  {
    id: 'button',
    label: '버튼',
    pl: 0
  }
];
function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="center" sx={{ pl: headCell.pl }} sortDirection={orderBy === headCell.id ? order : false}>
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

export default function SettingAuthorityTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  const { tableContentList } = useTableListState();
  const { setView, setId, setContent } = useDetailCardState();
  const { now_page, setPage, totalPage } = useCriteria();
  const { tab } = useTabState();

  async function clickDetailAuth(user_no) {
    setView(true);
    setId(user_no);
    const result = await axios.get(`/role-query-user-detail?user_no=${user_no}`);
    result.data[0].role.role.map((role) => (role['id'] = uuidv4()));
    setContent(result.data[0].role);
  }

  return (
    <>
      <Box sx={{ height: '36rem' }}>
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
              {tableContentList.map((row, index) => {
                const isItemSelected = isSelected();
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.user_no}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" align="center" sx={{ width: 60 }}>
                      <Avatar src={row.user_profile} sx={{ width: 50, height: 50, margin: 'auto' }}></Avatar>
                    </TableCell>
                    <TableCell align="center" sx={{ width: '5rem' }}>
                      {row.dept_name}
                    </TableCell>
                    <TableCell align="center" sx={{ width: '8rem' }}>
                      {row.user_name}
                    </TableCell>
                    <TableCell align="center" sx={{ width: '4rem' }}>
                      {row.user_position}
                    </TableCell>
                    <TableCell align="center" sx={{ width: '7rem' }}>
                      {row.role_designated_date}
                    </TableCell>
                    <TableCell align="center" sx={{ width: '8rem', pl: 0 }}>
                      <Button variant="contained" onClick={() => clickDetailAuth(row.user_no)}>
                        권한 변경
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack alignItems="center" mt={2}>
        {console.log(totalPage)}
        {Object.keys(tab).length > 0 && totalPage > -1 && (
          <Pagination
            count={totalPage}
            page={now_page}
            onChange={(event, page) => {
              setPage(page);
            }}
            variant="outlined"
            shape="rounded"
          />
        )}
      </Stack>
    </>
  );
}
