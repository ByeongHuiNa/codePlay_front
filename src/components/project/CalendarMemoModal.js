import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '../../../node_modules/@mui/material/index';
import { useCalendarMemoModal } from 'store/module';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '60%',
  bgcolor: 'background.paper',
  border: '7px',
  borderRadius: '15px',
  boxShadow: 10,
  p: 4
};

// eslint-disable-next-line react/prop-types
export default function CalendarMemoModal({ open, children }) {
  const { setMemoView } = useCalendarMemoModal();
  return (
    <div>
      <Modal open={open} onClose={() => setMemoView(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}
