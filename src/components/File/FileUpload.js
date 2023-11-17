import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import { useState } from 'react';
import { List, ListItem, ListItemText } from '../../../node_modules/@mui/material/index';

const StyledUploadBox = styled('label')({
  width: '300px',
  height: '100px',
  backgroundColor: '#fff',
  border: '1px solid',
  borderRadius: '4px',
  borderColor: '#e1e3e5',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '10px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f4f4f4'
  }
});

const previewStyle = {
  // 기본적인 스타일
  width: '50%',
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column'
  // isActive가 true일 때 추가되는 스타일
  //   ...(isActive && { background: 'lightblue' })
};

const infoKeyStyle = {
  display: 'block',
  fontWeight: 500,
  fontSize: '12px',
  marginBottom: '2px'
};

const infoValueStyle = {
  fontSize: '14px'
};

const FileInfo = ({ uploadedInfo }) => {
  if (!uploadedInfo) {
    return null;
  } else {
    return (
      <List style={previewStyle}>
        {Object.entries(uploadedInfo).map(([key, value]) => (
          <ListItem key={key}>
            <ListItemText primary={<span style={infoKeyStyle}>{key}</span>} secondary={<span style={infoValueStyle}>{value}</span>} />
          </ListItem>
        ))}
      </List>
    );
  }
};

const FileUpload = () => {
  const [uploadedInfo, setUploadedInfo] = useState(null); // 업로드된 파일의 정보를 저장

  const [isActive, setActive] = useState(false); // 드래그 active 여부
  const handleDragStart = () => setActive(true); // 드래그 active true
  const handleDragEnd = () => setActive(false); // 드래그 active false
  console.log(isActive);

  const setFileInfo = (file) => {
    const { name, size: byteSize } = file;
    const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
    setUploadedInfo({ name, size }); // name, size, type 정보를 uploadedInfo에 저장
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);

    const file = event.dataTransfer.files[0];
    setFileInfo(file);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setFileInfo(file);
  };

  return (
    <>
      <StyledUploadBox onDragEnter={handleDragStart} onDragOver={handleDragOver} onDragLeave={handleDragEnd} onDrop={handleDrop}>
        <input type="file" multiple className="file" style={{ display: 'none' }} onChange={handleUpload} />
        {uploadedInfo ? (
          <>
            <CloudDoneOutlinedIcon sx={{ fontSize: 50, color: '#888' }} />
            <Typography variant="subtitle1" fontWeight={500} sx={{ marginTop: '10px' }}>
              파일 선택 완료
            </Typography>
          </>
        ) : null}
        {!uploadedInfo && (
          <>
            <BackupOutlinedIcon sx={{ fontSize: 50, color: '#888' }} />
            <Typography variant="subtitle1" fontWeight={500} sx={{ marginTop: '10px' }}>
              클릭 혹은 파일을 이곳에 드롭하세요.
            </Typography>
          </>
        )}
      </StyledUploadBox>
      {uploadedInfo ? FileInfo(uploadedInfo) : null};
    </>
  );
};

export default FileUpload;
