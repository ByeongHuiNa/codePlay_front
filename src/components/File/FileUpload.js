import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import { useState } from 'react';
import { DeleteOutlined, InsertDriveFile } from '../../../node_modules/@mui/icons-material/index';
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '../../../node_modules/@mui/material/index';

const StyledUploadBox = styled('label')({
  width: '290px',
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
  marginLeft: '8px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f4f4f4'
  }
});

const FileUpload = ({ setUploadedInfo, uploadedInfo, width }) => {
  const [uploadedView, setUploadedView] = useState([]); // 미리보기를 위한 배열

  const [isActive, setActive] = useState(false); // 드래그 active 여부
  const handleDragStart = () => setActive(true); // 드래그 active true
  const handleDragEnd = () => setActive(false); // 드래그 active false
  console.log(isActive);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);

    const filesLists = event.dataTransfer.files;
    if (filesLists) {
      let fileUrlLists = [...uploadedView];

      for (let i = 0; i < filesLists.length; i++) {
        const { name, size: byteSize, type } = filesLists[i];
        const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
        fileUrlLists.push({ name, size, type });
        // const currentFileUrl = URL.createObjectURL(filesLists[i]);
        // fileUrlLists.push(currentFileUrl);
      }

      setUploadedInfo(filesLists);
      setUploadedView(fileUrlLists);
    }
  };

  const handleUpload = (event) => {
    const filesLists = event.target.files;
    if (filesLists) {
      let fileUrlLists = [...uploadedView];

      for (let i = 0; i < filesLists.length; i++) {
        const { name, size: byteSize, type } = filesLists[i];
        const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
        fileUrlLists.push({ name, size, type });
        // const currentFileUrl = URL.createObjectURL(filesLists[i]);
        // fileUrlLists.push(currentFileUrl);
      }

      setUploadedInfo(filesLists);
      setUploadedView(fileUrlLists);
    }
  };

  // X 버튼 클릭 시 이미지 삭제
  const handleDeleteFile = (id) => {
    setUploadedView(uploadedView.filter((_, index) => index !== id));
    setUploadedInfo(Array.from(uploadedInfo).filter((_, index) => index !== id));
  };

  return (
    <Grid>
      <Grid item>
        <StyledUploadBox onDragEnter={handleDragStart} onDragOver={handleDragOver} onDragLeave={handleDragEnd} onDrop={handleDrop}>
          <input type="file" multiple className="file" style={{ display: 'none' }} onChange={handleUpload} />
          {uploadedView.length !== 0 ? (
            <>
              <CloudDoneOutlinedIcon sx={{ fontSize: 50, color: '#888' }} />
              <Typography variant="subtitle1" fontWeight={500} sx={{ marginTop: '10px' }}>
                파일 선택 완료
              </Typography>
            </>
          ) : null}
          {uploadedView.length === 0 ? (
            <>
              <BackupOutlinedIcon sx={{ fontSize: 50, color: '#888' }} />
              <Typography variant="subtitle1" fontWeight={500} sx={{ marginTop: '10px' }}>
                클릭 혹은 파일을 이곳에 드롭하세요.
              </Typography>
            </>
          ) : null}
        </StyledUploadBox>
      </Grid>
      <Grid
        ml={1}
        sx={{
          width: { width },
          height: 'auto',
          overflowY: 'scroll',
          display: 'flex',
          alignItems: 'center',
          '&::-webkit-scrollbar': {
            width: '0px'
          }
        }}
      >
        {uploadedView.length !== 0 ? (
          <List sx={{ paddingBottom: 0, margin: 0 }}>
            {uploadedView.map((file, index) => (
              <ListItem key={index} alignItems="center">
                <ListItemIcon sx={{ mr: 2 }}>
                  <InsertDriveFile />
                </ListItemIcon>
                <ListItemText sx={{ display: 'flex' }} primary={file.name} secondary={file.type} />
                <ListItemIcon sx={{ ml: 2 }}>
                  <DeleteOutlined onClick={() => handleDeleteFile(index)} />
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        ) : null}
      </Grid>
    </Grid>
  );
};

FileUpload.propTypes = {
  setUploadedInfo: PropTypes.func.isRequired,
  uploadedInfo: PropTypes.array.isRequired
};

export default FileUpload;
