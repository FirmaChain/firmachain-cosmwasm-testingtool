import React from 'react';
import { InputFileWrapper, Divider, FileIconWrapper, AttachFileIcon } from './styles';

const InputFile = () => {
  return (
    <InputFileWrapper>
      <Divider />
      <FileIconWrapper>
        <AttachFileIcon />
      </FileIconWrapper>
    </InputFileWrapper>
  );
};

export default React.memo(InputFile);
