import PropTypes from 'prop-types';
import { Chip } from '../../../node_modules/@mui/material/index';

const BasicChip = ({ label, color, width }) => {
  return (
    <Chip
      label={label}
      sx={{
        backgroundColor: color,
        color: 'white',
        width: width,
        height: '35px',
        marginRight: '10px',
        borderRadius: '0px'
      }}
    />
  );
};

BasicChip.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string
};

BasicChip.defaultProps = {
  width: '110px'
};

export default BasicChip;
