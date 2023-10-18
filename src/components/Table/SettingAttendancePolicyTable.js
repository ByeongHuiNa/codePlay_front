import PropTypes from 'prop-types';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import { Avatar, Button, Pagination, Stack } from '../../../node_modules/@mui/material/index';
import { useDetailCardState, useTableListState } from 'store/module';
import { useState } from 'react';

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
    label: '정책지정일'
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

export default function SettingAttendancePolicyTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  const { tableContentList } = useTableListState();
  const { setView } = useDetailCardState();

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
                    key={row.trackingNo}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" align="center">
                      <Avatar src={row.profile_url} sx={{ width: 50, height: 50, margin: 'auto' }}></Avatar>
                    </TableCell>
                    <TableCell align="center">{row.dept}</TableCell>
                    <TableCell align="center">{'홍길동'}</TableCell>
                    <TableCell align="center">{row.position}</TableCell>
                    <TableCell align="center">{row.authority_date}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => setView(true)}> 권한 변경</Button>
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