import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Chip } from '../../../node_modules/@mui/material/index';

const BasicChip = ({ label, color }) => {
  const MyChip = styled(Chip)`
    background-color: ${color};
    color: white;
    width: 110px;
    height: 35px;
    margin-right: 10px;
  `;

  return <MyChip label={label} />;
};

BasicChip.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string
};

export default BasicChip;
