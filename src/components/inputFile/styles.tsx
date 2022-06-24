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
