import PropTypes from 'prop-types';
// import { useState } from 'react';

// material-ui
// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Stack, Typography } from '../../../node_modules/@mui/material/index';
// import { useFormatter } from 'store/module';
import Dot from 'components/@extended/Dot';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// ==============================|| ORDER TABLE - STATUS ||============================== //

// eslint-disable-next-line react/prop-types
const MyOrderStatus = ({ status }) => {
  let color;
  let title;

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
      color = 'secondary';
      title = '결재대기';
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      <Dot color={color} />
      <Typography
        sx={{
          fontSize: '14px', // 원하는 폰트 크기로 조정
          fontWeight: '400'
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

const AllOrderStatus = ({ status }) => {
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
      title = '결재진행중';
      break;
    case 3:
      color = 'secondary';
      title = '결재대기';
      break;
    case 4:
      color = 'error';
      title = '취소휴가';
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      <Dot color={color} />
      <Typography
        sx={{
          fontSize: '14px', // 원하는 폰트 크기로 조정
          fontWeight: '400'
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

//휴가종류
const Type = ({ type }) => {
  let title;

  // 0 : 연차
  // 1 : 오전반차
  // 2 : 오후반차
  // 3 : 공가
  // 4 : 휴가취소

  switch (type) {
    case 0:
      title = '연차';
      break;
    case 1:
      title = '오전반차';
      break;
    case 2:
      title = '오후반차';
      break;
    case 3:
      title = '공가';
      break;
    case 4:
      title = '휴가취소';
      break;
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      {title}
    </Stack>
  );
};

Type.propTypes = {
  type: PropTypes.number
};

const columns = [
  { field: 'user_name', headerName: '휴가신청자', width: 110, align: 'center', headerAlign: 'center' },
  {
    field: 'leaveapp_type',
    headerName: '휴가 종류',
    width: 110,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => <Type type={params.value} />
  },
  {
    field: 'leaveappln_status',
    headerName: '나의결재상태',
    width: 110,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => <MyOrderStatus status={params.value} />
  },
  {
    field: 'leaveapp_status',
    headerName: '최종결재상태',
    width: 110,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => <AllOrderStatus status={params.value} />
  }
];

export default function AdminUnAppLeaveTable({ datas, LeaveInfo }) {
  const getRowId = (row) => row.leaveapp_no;
  const handleCellClick = (params) => {
    LeaveInfo(params.row);
  };
  return (
    <div style={{ height: '837px', width: '100%' }}>
      <DataGrid
        rows={datas}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }
          }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={getRowId}
        onCellClick={handleCellClick}
      />
    </div>
  );
}

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// // ==============================|| ORDER TABLE - HEADER CELL ||============================== //

// const headCells = [
//   {
//     id: 'leaveUser',
//     align: 'center',
//     disablePadding: false,
//     label: '휴가신청자'
//   },
//   {
//     id: 'leaveKind',
//     align: 'center',
//     disablePadding: false,
//     label: '휴가종류'
//   },
//   {
//     id: 'leaveStart',
//     align: 'center',
//     disablePadding: false,
//     label: '휴가시작일'
//   },
//   {
//     id: 'leaveEnd',
//     align: 'center',
//     disablePadding: false,
//     label: '휴가종료일'
//   },
//   {
//     id: 'status',
//     align: 'center',
//     disablePadding: false,
//     label: '최종결재상태'
//   }
// ];

// // ==============================|| ORDER TABLE - HEADER ||============================== //

// function OrderTableHead({ order, orderBy }) {
//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.align}
//             padding={headCell.disablePadding ? 'none' : '400'}
//             sortDirection={orderBy === headCell.id ? order : false}
//             sx={{ backgroundColor: '#f9f9f9' }}
//           >
//             {headCell.label}
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// OrderTableHead.propTypes = {
//   order: PropTypes.string,
//   orderBy: PropTypes.string
// };

// // ==============================|| ORDER TABLE - STATUS ||============================== //

// // eslint-disable-next-line react/prop-types
// const OrderStatus = ({ status }) => {
//   let color;
//   let title;

//   // 0 : 결재완료(승인)
//   // 1 : 결재완료(반려)
//   // 2 : 결재대기
//   switch (status) {
//     case 0:
//       color = 'success';
//       title = '결재승인';
//       break;
//     case 1:
//       color = 'error';
//       title = '결재반려';
//       break;
//     case 2:
//       color = 'primary';
//       title = '결재진행중';
//       break;
//     case 3:
//       color = 'secondary';
//       title = '결재대기';
//       break;
//     case 4:
//       color = 'error';
//       title = '취소휴가';
//   }

//   return (
//     <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
//       <Dot color={color} />
//       <Typography
//         sx={{
//           fontSize: '14px', // 원하는 폰트 크기로 조정
//           fontWeight: '400'
//         }}
//       >
//         {title}
//       </Typography>
//     </Stack>
//   );
// };

// //휴가종류
// const Type = ({ type }) => {
//   let title;

//   // 0 : 연차
//   // 1 : 오전반차
//   // 2 : 오후반차
//   // 3 : 공가
//   // 4 : 휴가취소

//   switch (type) {
//     case 0:
//       title = '연차';
//       break;
//     case 1:
//       title = '오전반차';
//       break;
//     case 2:
//       title = '오후반차';
//       break;
//     case 3:
//       title = '공가';
//       break;
//     case 4:
//       title = '휴가취소';
//       break;
//   }

//   return (
//     <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
//       {title}
//     </Stack>
//   );
// };

// Type.propTypes = {
//   type: PropTypes.number
// };

// // ==============================|| ORDER TABLE ||============================== //

// export default function AdminAppLeaveTable({ datas, selectLeaveData, LeaveInfo }) {
//   const [order] = useState('asc');
//   const [orderBy] = useState('trackingNo');
//   const [selected] = useState([]);
//   const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
//   // 날짜 형식
//   const { dateFormat } = useFormatter();

//   return (
//     <Box>
//       <TableContainer
//         sx={{
//           width: '100%',
//           overflowX: 'auto',
//           position: 'relative',
//           display: 'block',
//           maxWidth: '100%',
//           height: '837px',
//           padding: '0px',
//           '& td, & th': { whiteSpace: 'nowrap' },
//           '&::-webkit-scrollbar': {
//             width: 5
//           },
//           '&::-webkit-scrollbar-track': {
//             backgroundColor: 'white'
//           },
//           '&::-webkit-scrollbar-thumb': {
//             backgroundColor: 'gray',
//             borderRadius: 2
//           }
//         }}
//       >
//         <Table
//           stickyHeader
//           aria-labelledby="tableTitle"
//           sx={{
//             '& .MuiTableCell-root:first-of-type': {
//               pl: 2
//             },
//             '& .MuiTableCell-root:last-of-type': {
//               pr: 3
//             }
//           }}
//         >
//           <OrderTableHead order={order} orderBy={orderBy} />
//           <TableBody>
//             {stableSort(datas, getComparator(order, orderBy)).map((data, index) => {
//               const isItemSelected = isSelected(data.date);
//               const labelId = `enhanced-table-checkbox-${index}`;
//               return (
//                 <TableRow
//                   hover
//                   role="checkbox"
//                   sx={{
//                     '&:last-child td, &:last-child th': { border: 0 },
//                     backgroundColor: data === selectLeaveData ? '#e4e3e3' : 'inherit'
//                   }}
//                   aria-checked={isItemSelected}
//                   tabIndex={-1}
//                   key={data.leaveapp_no}
//                   selected={isItemSelected}
//                   onClick={() => {
//                     LeaveInfo(data);
//                   }}
//                 >
//                   <TableCell
//                     component="th"
//                     id={labelId}
//                     scope="data"
//                     align="center"
//                     sx={{
//                       fontSize: '14px', // 원하는 폰트 크기로 조정
//                       fontWeight: '400'
//                     }}
//                   >
//                     {data.user_name}
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{
//                       fontSize: '14px', // 원하는 폰트 크기로 조정
//                       fontWeight: '400'
//                     }}
//                   >
//                     <Type type={data.leaveapp_type} />
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{
//                       fontSize: '14px', // 원하는 폰트 크기로 조정
//                       fontWeight: '400'
//                     }}
//                   >
//                     {dateFormat(new Date(data.leaveapp_start))}
//                   </TableCell>
//                   <TableCell
//                     align="center"
//                     sx={{
//                       fontSize: '14px', // 원하는 폰트 크기로 조정
//                       fontWeight: '400'
//                     }}
//                   >
//                     {dateFormat(new Date(data.leaveapp_end))}
//                   </TableCell>
//                   <TableCell align="center">
//                     <OrderStatus status={data.leaveapp_status} />
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }
