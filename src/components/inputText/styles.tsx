import styled from 'styled-components';

export const TextWrapper = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: rgba(52, 54, 62, 0.75);
  position: relative;
  cursor: pointer;
  font-size: 1.6rem;
  & > input {
    border: 0;
    color: white;
    background: none;
    width: calc(100% - 24px);
    height: calc(100% - 20px);
    padding: 10px 12px 10px 12px;
  }
`;
