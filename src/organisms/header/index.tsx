import React from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/reducers';
import { WalletModal } from '../modal';
import { modalActions } from '../../redux/action';

import {
  HeaderTopWrapper,
  HeaderContainer,
  HeaderInner,
  HeaderWrapper,
  AddressTypo,
  NetworkWrapper,
  NetworkDot,
  NetworkTypo,
  LeftContainer,
  RightContainer,
  Logo,
  LoginIcon,
  LinkList,
  LinkItem,
  LoginButton,
  SettingButton,
  SettingIcon,
} from './styles';

const Header = () => {
  const { wallet } = useSelector((state: rootState) => state.modal);
  const walletState = useSelector((state: rootState) => state.wallet);

  const onWallet = () => {
    modalActions.handleModalWallet(true);
  };

  return (
    <HeaderContainer>
      <HeaderTopWrapper>
        <HeaderInner>
          {walletState && walletState.mnemonic && <AddressTypo>{walletState.address}</AddressTypo>}
          <NetworkWrapper>
            <NetworkDot />
            <NetworkTypo>Imperium-3</NetworkTypo>
          </NetworkWrapper>
        </HeaderInner>
      </HeaderTopWrapper>
      <HeaderWrapper>
        <LeftContainer>
          <Logo src='/images/firma_chain_title.svg' />
          <LinkList>
            <LinkItem onClick={() => window.open(process.env.REACT_APP_STATION)}>FIRMA STATION</LinkItem>
            <LinkItem onClick={() => window.open(process.env.REACT_APP_EXPLORER)}>BLOCK EXPLORER</LinkItem>
          </LinkList>
        </LeftContainer>
        <RightContainer>
          {walletState && !walletState.mnemonic && (
            <LoginButton onClick={() => onWallet()}>
              LOGIN <LoginIcon />
            </LoginButton>
          )}

          {walletState && walletState.mnemonic && (
            <SettingButton onClick={() => onWallet()}>
              <SettingIcon />
            </SettingButton>
          )}
        </RightContainer>
      </HeaderWrapper>

      {wallet && <WalletModal />}
    </HeaderContainer>
  );
};

export default React.memo(Header);
