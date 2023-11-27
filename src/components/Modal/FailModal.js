import * as React from 'react';
import Modal from '@mui/material/Modal';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Button, Grid, Typography } from '../../../node_modules/@mui/material/index';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  height: '30%',
  bgcolor: 'background.paper',
  border: '7px',
  borderRadius: '15px',
  boxShadow: 10,
  p: 4
};

export default function FailModal({ open, handleClose, color, msg1, msg2 }) {
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box py={2}>
            <Grid container spacing={1}>
              <Grid xs={12} md={12} lg={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ErrorOutlineIcon sx={{ fontSize: '80px', color: {color} }} />
              </Grid>
              <Grid xs={12} md={12} lg={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                <Typography variant="h5">{msg1}</Typography>
              </Grid>
              <Grid xs={12} md={12} lg={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5">{msg2}</Typography>
              </Grid>
              <Grid xs={12} md={12} lg={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                <Button variant="contained" size="medium" onClick={handleClose} sx={{ backgroundColor: '#999b9c' }}>
                  닫기
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
