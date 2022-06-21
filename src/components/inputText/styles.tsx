import styled from 'styled-components';

export const TextWrapper = styled.div`
  width: 200px;
  height: 30px;
  border-radius: 4px;
  background-color: #00000080;
  border: 1px solid #efefef80;
  color: white;
  position: relative;
  cursor: pointer;
  & > input {
    border: 0;
    background: none;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;
