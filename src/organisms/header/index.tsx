import React from 'react';

import {
  HeaderContainer,
  HeaderWrapper,
  LeftContainer,
  RightContainer,
  Logo,
  WalletButton,
  LinkList,
  LinkItem,
} from './styles';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <LeftContainer>
          <Logo src='/images/firma_chain_title.svg' />
          <LinkList>
            <LinkItem onClick={() => window.open(process.env.REACT_APP_STATION)}>FIRMA STATION</LinkItem>
            <LinkItem onClick={() => window.open(process.env.REACT_APP_EXPLORER)}>BLOCK EXPLORER</LinkItem>
          </LinkList>
        </LeftContainer>
        <RightContainer>
          <WalletButton>Wallet</WalletButton>
        </RightContainer>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default React.memo(Header);
