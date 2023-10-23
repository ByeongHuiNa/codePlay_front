import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function BasicAuto({ datas, handleSelectUser, setFilteredData }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    const filteredUsers = datas.filter((user) => user.user_name.includes(newInputValue));
    setFilteredData(filteredUsers);
  };

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
      renderInput={(params) => <TextField {...params} />}
      onChange={handleSelectUser}
    />
  );
}
