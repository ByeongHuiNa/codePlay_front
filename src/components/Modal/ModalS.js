import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '../../../node_modules/@mui/material/index';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  height: '60%',
  bgcolor: 'background.paper',
  border: '7px',
  borderRadius: '15px',
  boxShadow: 10,
  p: 4
};

export default function ModalS({ open, handleClose, children }) {
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}
