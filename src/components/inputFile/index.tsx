import React from 'react';
import { InputFileWrapper, UploadTypo, UploadButton } from './styles';

const InputFile = () => {
  return (
    <InputFileWrapper>
      <UploadTypo>Please upload the file.</UploadTypo>
      <UploadButton>Upload</UploadButton>
    </InputFileWrapper>
  );
};

export default React.memo(InputFile);
