import { Box, Button, Grid, Modal, Typography } from "../../../node_modules/@mui/material/index";


//모달창 옵션
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '95%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  
export default function LeaveModal({open, handleClose}) {
    return (
      <div>
       <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h3" component="h3" sx={{ textAlign: 'center' }}>
                    휴가신청서
                  </Typography>
                  <hr></hr>
                  <div>
                    <Grid container rowSpacing={4} columnSpacing={2.75} sx={{ border: '1px solid', marginTop: 5 }}>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          제목
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          20231012 반차
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          작성일자
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          2023.10.10
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          기안자
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          나병희
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          수신참조
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5"></Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          참조문서
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5"></Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          시행자
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          휴가구분
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          시작일자-종료일자
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          2023.10.10-2023.10.10
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          시작시간-종료시각
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          09:00~14:00
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          소요시간
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          0.5일
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          휴가차감
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          0.5개
                        </Typography>
                      </Grid>
                      <Grid item xs={3} style={{ backgroundColor: '#e6f7ff' }}>
                        <Typography variant="h4" component="h4">
                          휴가사유
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5" component="h5">
                          연차소진
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                        <Button variant="outlined" size="large" onClick={handleClose}>
                          확인
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Box>
              </Modal>
      </div>
    );
  }