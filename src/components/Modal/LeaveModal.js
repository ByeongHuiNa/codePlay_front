import { Box, Button, Grid, Modal, Typography } from '../../../node_modules/@mui/material/index';

//모달창 옵션
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: '0px 0px 24px 0px rgba(0, 0, 0, 0.75)',
  p: 4
};

export default function LeaveModal({ open, handleClose, data }) {
  console.log(data);
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
                  20231012 반차
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
                  2023.10.10
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
                  나병희
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
                  나병희
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
                  승인
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
                  나병희
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
                  나병희
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
                  휴가구분
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h5" component="h5"></Typography>
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
                  시작일-종료일
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
                  2023.10.10-2023.10.10
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
                  소요시간
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
                  0.5일
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
                  휴가차감
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
                  0.5개
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
                  연차소진
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
              <Button variant="outlined" size="large" onClick={handleClose}>
                확인
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
