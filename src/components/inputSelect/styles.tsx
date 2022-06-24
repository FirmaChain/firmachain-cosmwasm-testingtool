import styled from 'styled-components';

export const SelectWrapper = styled.div`
  color: white;
  position: relative;
  font-size: 1.6rem;
  display: flex;
  margin-top: 5px;
`;

export const OptionItem = styled.div`
  width: 100%;
  cursor: pointer;
  & > input {
    margin-right: 10px;
  }
`;
