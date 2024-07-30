import React from 'react';
import { FooterContainer, FooterWrapper, Copyright } from './styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <Copyright>ⓒ FIRMACHAIN Pte. Ltd. | All Right Reserved.</Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default React.memo(Footer);
