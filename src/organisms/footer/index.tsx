import React from 'react';
import { FooterContainer, FooterWrapper, Copyright } from './styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <Copyright>Copyright © FirmaChain 2022</Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default React.memo(Footer);
