import React from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/reducers';
import { WalletModal, QueueTxModal } from '../modal';
import { modalActions } from '../../redux/action';

import { FIRMACHAIN_CONFIG } from '../../config';

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
  const { wallet, queueTx } = useSelector((state: rootState) => state.modal);
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
            <NetworkTypo>{FIRMACHAIN_CONFIG.chainID}</NetworkTypo>
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
      {queueTx && <QueueTxModal />}
    </HeaderContainer>
  );
};

export default React.memo(Header);
