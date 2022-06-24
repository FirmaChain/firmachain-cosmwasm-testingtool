import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 80px;
  min-height: 80px;
  background: transparent;
  color: #ccc;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const HeaderTopWrapper = styled.div`
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: rgba(42, 44, 51, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  max-width: ${({ theme }) => theme.sizes.containerWidth};
  padding-right: 24px;
`;

export const AddressTypo = styled.div`
  height: 30px;
  line-height: 30px;
  color: #50b5ff;
  font-size: 1.2rem;
  text-decoration: underline;
  cursor: pointer;
`;

export const NetworkWrapper = styled.div`
  height: 30px;
  line-height: 30px;
  display: flex;
  color: #3dd598;
  gap: 5px;
`;

export const NetworkDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: #3dd598;
  border-radius: 6px;
  margin-top: 9px;
`;

export const NetworkTypo = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 1.2rem;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  max-width: ${({ theme }) => theme.sizes.containerWidth};
  display: flex;
  justify-content: space-between;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const Logo = styled.img`
  width: 140px;
`;

export const WalletButton = styled.div`
  width: 110px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: white;
  border-radius: 4px;
  border: solid 1px #fff;
  cursor: pointer;
`;

export const LinkList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-left: 40px;
  margin-top: 4px;
  font-size: 1.4rem;
`;

export const LinkItem = styled.div`
  cursor: pointer;
  &:hover {
    color: white;
  }
`;

export const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export const LoginIcon = styled.div`
  width: 26px;
  height: 26px;
  background-image: url('${({ theme }) => theme.urls.login}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  margin-top: -2px;
`;

export const SettingButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export const SettingIcon = styled.div`
  width: 26px;
  height: 26px;
  background-image: url('${({ theme }) => theme.urls.setting}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  margin-top: -2px;
`;
