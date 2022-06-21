import styled from 'styled-components';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export const InputFileWrapper = styled.div`
  width: 200px;
  height: 30px;
  border-radius: 4px;
  background-color: #00000080;
  border: 1px solid #efefef80;
  color: white;
  position: relative;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 1px;
  height: 20px;
  background-color: #888;
  position: absolute;
  top: 5px;
  right: 30px;
`;

export const FileIconWrapper = styled.div`
  color: #444;
  position: absolute;
  top: 7px;
  right: 8px;
`;

export { AttachFileIcon };
