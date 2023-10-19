import styled from 'styled-components';
import { Chip } from '../../../node_modules/@mui/material/index';

export default function BasicChip({ label, color }) {
  const MyChip = styled(Chip)`
    background-color: ${color};
    color: white;
    width: 100px;
    height: 35px;
    margin-right: 10px;
  `;

  return (
    <>
      <MyChip label={label} />
    </>
  );
}
