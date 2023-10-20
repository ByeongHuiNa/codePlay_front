import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ApprovalTab(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && props.border !== 'none' ? (
        <Box
          sx={{
            border: '1px solid #e6ebf1',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px'
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      ) : (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

ApprovalTab.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default ApprovalTab;
