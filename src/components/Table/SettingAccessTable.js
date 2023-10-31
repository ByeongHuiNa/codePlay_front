import PropTypes from 'prop-types';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import { Avatar, Button, Pagination, Stack } from '../../../node_modules/@mui/material/index';
import { useAccessPage, useCriteria, useDetailCardState, useTabState, useTableListState } from 'store/module';
import { useState } from 'react';
import axios from '../../../node_modules/axios/index';

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
    label: '맞춤접근부여일'
  },
  {
    id: 'button',
    label: '버튼'
  }
];
function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="center" padding={'normal'} sortDirection={orderBy === headCell.id ? order : false}>
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

export default function SettingAccessTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  const { tableContentList } = useTableListState();
  const { setView, setId } = useDetailCardState();
  const { now_page, setPage } = useCriteria();
  const { tab, index } = useTabState();
  const { setAccessPage } = useAccessPage();

  async function clickChangeAccess(user_no) {
    setView(true);
    setId(user_no);
    const result = await axios.get(`/access-page-list?user_no=${user_no}`);
    setAccessPage(
      result.data[0].access_page_list.reduce(
        (groups, item) => ({
          ...groups,
          [item.page_default_role_level]: [
            ...(groups[item.page_default_role_level] || []),
            { ...item, checked: item.role_designated_date != null }
          ]
        }),
        {}
      )
    );
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
                    <TableCell component="th" id={labelId} scope="row" align="center">
                      <Avatar src={row.user_profile} sx={{ width: 50, height: 50, margin: 'auto' }}></Avatar>
                    </TableCell>
                    <TableCell align="center">{row.dept_name}</TableCell>
                    <TableCell align="center">{row.user_name}</TableCell>
                    <TableCell align="center">{row.user_position}</TableCell>
                    <TableCell align="center">{row.role_designated_date}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => clickChangeAccess(row.user_no)}> 접근 변경</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack alignItems="center" mt={2}>
        {Object.keys(tab).length > 0 && (
          <Pagination
            count={tab[index].total}
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
