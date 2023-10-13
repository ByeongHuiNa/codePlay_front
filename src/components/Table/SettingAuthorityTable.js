import PropTypes from 'prop-types';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import { Button, Pagination, Stack } from '../../../node_modules/@mui/material/index';
import { useDetailCardState, useTableListState } from 'store/module';

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

export default function SettingAuthorityTable() {
  const { tableContentList } = useTableListState();
  const { setView, setId } = useDetailCardState();

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
