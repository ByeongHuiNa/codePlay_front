import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { IconButton, InputAdornment, TextField } from '@mui/material/index';
import PropTypes from 'prop-types';
import { useCriteria } from 'store/module';
/*
  input 요소옆에 돋보기 단추가 추가된 InputSearch 공용으로 사용가능한 컴포넌트
  MUI의 TextField(input)와 InpuAdornment(input내에 icon이나 button추가)를 이용하여 구축됨.
  prop로는 id값과, onClick 함수만을 받게함.
  id 기본값은 search로 해당요소 접근시 아래 id를 기본값으로 사용.
  input id : {search}-input, button id : {search}-button
*/

const InputSearch = ({ id, onClick, isPersonIcon }) => {
  //zusthand를 이용하여 input 값 search에 저장
  const { search, setSearch } = useCriteria();
  return (
    //TODO:onKeydown 이벤트 걸기
    <TextField
      id={`${id}-input`}
      type="search"
      size="normal"
      margin="normal"
      value={search}
      onChange={(event) => {
        setSearch(event.target.value);
      }}
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
};

InputSearch.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  isPersonIcon: PropTypes.bool
};

InputSearch.defaultProps = {
  id: 'search',
  isPersonIcon: false
};
export default InputSearch;
