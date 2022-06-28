import styled from 'styled-components';

export const InputFileWrapper = styled.div`
  width: 100%;
  height: 98px;
  color: white;
  position: relative;
  border: solid 1px #707070;
  background-color: rgba(52, 54, 62, 0.75);
  border-style: dashed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const UploadTypo = styled.div`
  font-size: 1.6rem;
  color: #939393;
`;

export const FileNameTypo = styled.div`
  font-size: 1.6rem;
  color: white;
`;

export const RetryButton = styled.div`
  color: #efefef;
  font-size: 1.3rem;
  text-align: center;
  opacity: 0.8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 1;
  }
`;

export const RetryIcon = styled.div`
  width: 15px;
  height: 15px;
  background-image: url('${({ theme }) => theme.urls.retry}');
  background-size: contain;
  background-repeat: no-repeat;
  color: white;
`;

export const RetryTypo = styled.div`
  font-size: 1.3rem;
  color: #939393;
`;

export const UploadButton = styled.div`
  width: 150px;
  height: 28px;
  line-height: 28px;
  border-radius: 4px;
  border: solid 1px #efefef;
  color: #efefef;
  font-size: 1.4rem;
  text-align: center;
  opacity: 0.8;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
