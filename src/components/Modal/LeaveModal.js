import PropTypes from 'prop-types';
import { useFormatter } from 'store/module';
import { Box, Button, Grid, Modal, Typography } from '../../../node_modules/@mui/material/index';

//모달창 옵션
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: '0px 0px 24px 0px rgba(0, 0, 0, 0.75)',
  p: 4
};

// ==============================|| STATUS ||============================== //

const LeaveStatus = ({ status }) => {
  // 0 : 연차
  // 1 : 오전반차
  // 2 : 오후반차
  // 3 : 공가
  // 4 : 휴가취소
  let title;
  switch (status) {
    case 0:
      title = '연차';
      break;
    case 1:
      title = '오전 반차';
      break;
    case 2:
      title = '오후 반차';
      break;
    case 3:
      title = '공가';
      break;
    case 4:
      title = '휴가 취소';
  }

  return (
    <Typography variant="h5" component="h5">
      {title}
    </Typography>
  );
};

LeaveStatus.propTypes = {
  status: PropTypes.number
};

export default function LeaveModal({ open, handleClose, data }) {
  const { dateFormat } = useFormatter();

  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h3" sx={{ textAlign: 'center' }}>
            휴가신청서
          </Typography>
          <Grid container sx={{ border: '1px solid', marginTop: 3 }}>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  제목
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h5" component="h5">
                  {data.leaveapp_title}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  작성일자
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h5" component="h5">
                  {dateFormat(new Date(data.leaveapp_req_date))}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  기안자
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h5" component="h5">
                  {data.user_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  참조문서
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h5" component="h5"></Typography>
              </Box>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  1차 결재자
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h5" component="h5">
                  {data.firstapp_user_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  1차 결재상태
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h5" component="h5">
                  {data.firstapp_status === 0 ? '승인' : data.firstapp_status === 1 ? '반려' : '결재대기'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  2차 결재자
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h5" component="h5">
                  {data.secondapp_user_name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  2차 결재상태
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h5" component="h5">
                  {data.secondapp_status === 0 ? '승인' : data.firstapp_status === 1 ? '반려' : '결재대기'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  휴가 구분
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <LeaveStatus status={data.leaveapp_type} />
              </Box>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  시작일~종료일
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h5" component="h5">
                  {dateFormat(new Date(data.leaveapp_start))} ~ {dateFormat(new Date(data.leaveapp_end))}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  휴가차감일수
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h5" component="h5">
                  {data.leaveapp_total}일
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h4" component="h4">
                  휴가사유
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box
                px={2}
                py={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography variant="h5" component="h5">
                  {data.leaveapp_content}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
              <Button variant="contained" size="large" onClick={handleClose}>
                확인
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
