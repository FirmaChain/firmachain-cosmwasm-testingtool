import styled, { keyframes } from 'styled-components';
import NewWalletIcon from '@mui/icons-material/AddBox';
import RecoverMnemonicIcon from '@mui/icons-material/Restore';
import FileCopyIcon from '@mui/icons-material/FileCopy';
export { NewWalletIcon, RecoverMnemonicIcon, FileCopyIcon };

export const WalletModalWidth = '500px';
export const QueueTxModalWidth = '500px';
export const JSONModalWidth = '900px';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const ModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px 0;
`;

export const ModalTitle = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  font-size: 2rem;
`;

export const SubTitle = styled.div`
  color: #888;
  font-size: 1.2rem;
`;

export const ModalContent = styled.div`
  width: calc(100% - 60px);
  height: 100%;
  padding: 0 30px;
  font-size: 1.6rem;
`;

export const ModalContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

export const QueueTypoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 17px;
`;

export const QueueTypoOne = styled.div`
  text-align: center;
  line-height: 20px;
  font-size: 1.4rem;
  color: #999;
`;

export const AfterTypo = styled.div<{ isActive: boolean }>`
  display: ${(props) => (props.isActive ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation-duration: 2s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

export const QueueIcon = styled.div`
  width: 20px;
  height: 20px;
  flex: 1 1 25px;
  margin-right: 7px;
  background: url('${({ theme }) => theme.urls.tooltip}');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export const QueueTypoTwo = styled.div`
  text-align: center;
  line-height: 20px;
  font-size: 1.4rem;
  color: #ffc542;
`;

export const MenuListWrap = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  gap: 0 30px;
  margin: 10px 20px 0 20px;
  white-space: pre-wrap;
`;

export const MenuItemWrap = styled.div<{ disabled?: boolean }>`
  height: 68px;
  padding: 20px 10px;
  flex: 1;
  ${(props) => (props.disabled ? `border: 1px solid #444;& > div {color:#888}` : `border: 1px solid #324ab8aa;`)}
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #324ab8aa;
  }
`;

export const MenuTitleTypo = styled.div`
  line-height: 20px;
  text-align: center;
  margin: 0 20px;
  color: #eee;
  font-size: 1.4rem;
`;

export const MenuIconImg = styled.div`
  text-align: center;
  margin-bottom: 8px;
  & > svg {
    font-size: 2rem;
    color: #324ab8;
  }
`;

export const WalletTabList = styled.div<{ currentTab: number }>`
  width: 100%;
  display: flex;
  margin: 0 20px;
  flex-direction: column;
  align-items: center;
  ${(props) => `& > div:nth-child(${props.currentTab + 1}) {
    display:flex;
  }`};
`;

export const WalletTabItem = styled.div`
  width: 100%;
  display: none;
  flex-direction: column;
  align-items: center;
`;

export const NewWalletWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InputWrap = styled.div`
  color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Label = styled.div`
  font-size: 1.6rem;
  margin: 10px 0;
`;

export const Input = styled.div``;

export const TextBox = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
  border: 1px solid #888;
  border-radius: 4px;
  padding: 10px;
  line-height: 20px;
  color: #ccc;
`;

export const TextAreaBox = styled.textarea`
  background: transparent;
  width: calc(100% - 20px);
  height: 60px;
  font-size: 1.4rem;
  font-weight: 300;
  border: 1px solid #888;
  border-radius: 4px;
  padding: 10px;
  line-height: 20px;
  color: #ccc;
`;

export const CopyIconImg = styled(FileCopyIcon)<{ left: string }>`
  margin: 0 8px 0 10px;
  padding-top: 2px;
  width: 18px !important;
  height: 18px !important;
  cursor: pointer;
  position: absolute;
  top: 7px;
  left: ${(props) => props.left};
  color: ${({ theme }) => theme.colors.realWhite};
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 20px;
  margin: 10px 0;
`;

export const GeneralButton = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: white;
  background-color: ${({ theme }) => theme.colors.mainblue};
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.4rem;
`;

export const DisableButton = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: white;
  background-color: #555;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.4rem;
`;

export const JSONWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 22px;
  background-color: rgba(52, 54, 62, 0.75);
  color: #ddd;
  padding: 30px;
`;
