import styled from 'styled-components';
import FileCopyIcon from '@mui/icons-material/FileCopy';

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

export const StatusTypo = styled.div<{ isSuccess: boolean }>`
  font-size: 1.6rem;
  height: 25px;
  line-height: 25px;
  color: ${(props) => (props.isSuccess ? '#3dd598' : '#ff3333')};
`;

export const Label = styled.div`
  font-size: 1.4rem;
  height: 20px;
  line-height: 20px;
  color: #c4c4c4;
`;

export const HashLink = styled.div`
  font-size: 1.5rem;
  word-break: break-all;
  cursor: pointer;
  color: #50b5ff;
  line-height: 18px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #707070;
`;

export const PointContent = styled.div`
  font-size: 1.3rem;
  line-height: 18px;
  word-break: break-all;
  color: #bdbdbd;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

export const RawLog = styled.div`
  font-size: 1.3rem;
  line-height: 18px;
  word-break: break-all;
  color: #acacac;
`;

export const CopyIconImg = styled(FileCopyIcon)`
  width: 12px !important;
  height: 12px !important;
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.realWhite};
`;
