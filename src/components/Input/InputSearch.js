import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { IconButton, InputAdornment, TextField } from '@mui/material/index';
/*
  input 요소옆에 돋보기 단추가 추가된 InputSearch 공용으로 사용가능한 컴포넌트
  MUI의 TextField(input)와 InpuAdornment(input내에 icon이나 button추가)를 이용하여 구축됨.
  prop로는 id값과, onClick 함수만을 받게함.
  id 기본값은 search로 해당요소 접근시 아래 id를 기본값으로 사용.
  input id : {search}-input, button id : {search}-button
*/

const InputSearch = ({ id, onClick, isPersonIcon }) => (
  <TextField
    id={`${id}-input`}
    type="search"
    size="normal"
    margin="normal"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton id={`${id}-button`} onClick={onClick}>
            {isPersonIcon ? <PersonSearchIcon /> : <SearchIcon />}
          </IconButton>
        </InputAdornment>
      )
    }}
  />
);

InputSearch.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.function,
  isPersonIcon: PropTypes.Boolean
};

InputSearch.defaultProps = {
  id: 'search',
  isPersonIcon: false
};
export default InputSearch;
