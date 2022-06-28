import styled from 'styled-components';

export const ResultContainer = styled.div`
  width: calc(100% - 40px);
  max-width: calc(100% - 40px);
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(52, 54, 62, 0.75);
  padding: 20px;
  gap: 10px;
`;

export const RawLog = styled.div`
  max-width: 100%;
  font-size: 1.3rem;
  line-height: 18px;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #acacac;
`;
