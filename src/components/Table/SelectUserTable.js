import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project import
import { Avatar, Checkbox } from '../../../node_modules/@mui/material/index';

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
    id: 'user_profile',
    align: 'center',
    disablePadding: false,
    label: '프로필'
  },
  {
    id: 'user_name',
    align: 'center',
    disablePadding: false,
    label: '이름'
  },
  {
    id: 'user_dept',
    align: 'center',
    disablePadding: false,
    label: '부서'
  },
  {
    id: 'user_position',
    align: 'center',
    disablePadding: false,
    label: '직책'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ value, order, orderBy, checkItems, handleAllCheck, datas }) {
  return (
    <TableHead>
      <TableRow>
        {value === 0 && (
          <TableCell>
            <Checkbox
              checked={checkItems.length === datas.length ? true : false}
              onChange={(e) => handleAllCheck(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </TableCell>
        )}
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

export default function SelectUserTable({ value, datas, handleSingleCheck, handleAllCheck, checkItems, setSelectUserData }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (user_no) => selected.indexOf(user_no) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          height: '670px',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
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
          <OrderTableHead
            value={value}
            order={order}
            orderBy={orderBy}
            handleAllCheck={handleAllCheck}
            checkItems={checkItems}
            datas={datas}
          />
          <TableBody>
            {stableSort(datas, getComparator(order, orderBy)).map((data, index) => {
              const isItemSelected = isSelected(data.user_no);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={data.user_no}
                  selected={isItemSelected}
                  onClick={setSelectUserData}
                >
                  {value === 0 && (
                    <TableCell align="center">
                      <Checkbox
                        checked={checkItems.includes(data.user_no) ? true : false}
                        onChange={(e) => handleSingleCheck(e.target.checked, data.user_no)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </TableCell>
                  )}
                  <TableCell component="th" id={labelId} scope="data" align="center">
                    <Avatar src={data.user_profile} sx={{ width: 40, height: 40, margin: 'auto' }}></Avatar>
                  </TableCell>
                  <TableCell align="center">{data.user_name}</TableCell>
                  <TableCell align="center">{data.user_dept}</TableCell>
                  <TableCell align="center">{data.user_position}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
