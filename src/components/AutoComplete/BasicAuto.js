import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function BasicAuto({ datas, handleSelectUser, setSearchName }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  // 엔터를 누를 때 검색어 업데이트
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchName(inputValue);
    }
  };

  React.useEffect(() => {
    setSearchName(inputValue);
  }, [inputValue]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={datas}
      getOptionLabel={(option) => option.user_name} // 각 항목에서 렌더링할 라벨을 추출하는 함수
      sx={{ width: 150 }}
      size="small"
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown} // 엔터 키 처리
      renderInput={(params) => <TextField {...params} />}
      onChange={(event, newValue, selectOption) => {
        if (selectOption == 'selectOption') {
          console.log('선택됨');
        }
        handleSelectUser(event, newValue);
      }}
    />
  );
}
