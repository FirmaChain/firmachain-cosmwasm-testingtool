import React, { useState, useEffect, useRef } from 'react';
import { InputFileWrapper, UploadTypo, FileNameTypo, UploadButton, RetryButton, RetryIcon, RetryTypo } from './styles';

interface IProps {
  value: Uint8Array;
  setValue: (value: Uint8Array) => void;
}

const InputFile = ({ value, setValue }: IProps) => {
  const [isLoaded, setLoaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputFileRef = useRef<any>(null);

  useEffect(() => {
    setLoaded(value && value.length > 0);
  }, [value]);

  const onClickUploadButton = (e: any) => {
    inputFileRef.current.click();
  };

  const onClickRetry = (e: any) => {
    setValue(new Uint8Array());
  };

  const readFile = (file: any) => {
    return new Promise((resolve: (value: Uint8Array) => void, reject: (value: null) => void) => {
      try {
        const reader = new FileReader();
        reader.onloadend = (e: any) => {
          const arrayBuffer = e.target.result;
          const array = new Uint8Array(arrayBuffer);

          resolve(array);
        };

        reader.readAsArrayBuffer(file);
      } catch (e) {
        reject(null);
      }
    });
  };
  const onChangeFile = (e: any) => {
    readFile(e.target.files[0])
      .then((uint8Array: Uint8Array) => {
        setValue(uint8Array);
        setFileName(e.target.files[0].name);
      })
      .catch(() => {});
  };

  return (
    <InputFileWrapper>
      {isLoaded === false ? (
        <>
          <UploadTypo>Please upload the file.</UploadTypo>
          <UploadButton onClick={onClickUploadButton}>Upload</UploadButton>
          <input ref={inputFileRef} onChange={onChangeFile} type={'file'} accept='.wasm' hidden />
        </>
      ) : (
        <>
          <FileNameTypo>{fileName}</FileNameTypo>
          <RetryButton onClick={onClickRetry}>
            <RetryIcon />
            <RetryTypo>Retry</RetryTypo>
          </RetryButton>
        </>
      )}
    </InputFileWrapper>
  );
};

export default React.memo(InputFile);
