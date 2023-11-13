import PropTypes from 'prop-types';
import { Chip } from '../../../node_modules/@mui/material/index';

const BasicChip = ({ label, color }) => {
  return (
    <Chip
      label={label}
      sx={{
        backgroundColor: color,
        color: 'white',
        width: '110px',
        height: '35px',
        marginRight: '10px',
        borderRadius: '0px'
      }}
    />
  );
};

BasicChip.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string
};

export default BasicChip;
