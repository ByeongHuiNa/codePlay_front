import SearchIcon from '@mui/icons-material/Search';
import {IconButton, InputAdornment, TextField } from '@mui/material/index';

const InputSeach = ({id, onClick}) => (
<TextField id={`${id}-input`} type="search" size="normal" margin="normal" InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          id={`${id}-button`}
          onClick={onClick}
        >
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    ),
  }} />
);

InputSeach.defaultProps = {
  id : "search",
}
export default InputSeach;