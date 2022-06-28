import styled from 'styled-components';

export const SelectWrapper = styled.div`
  width: 100%;
  height: 38px;
  line-height: 38px;
  position: relative;
  font-size: 1.6rem;
  & > select {
    width: 100%;
    height: 100%;
    background-color: rgba(52, 54, 62, 0.75);
    color: white;
    padding: 0 10px;
    border: 1px solid #555;
  }
`;
