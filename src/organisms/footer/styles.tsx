import styled from 'styled-components';

export const FooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 40px;
  min-height: 40px;
  color: #ccc;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(42, 44, 51, 0.6);
`;

export const FooterWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.containerWidth};
  display: flex;
  justify-content: space-between;
`;

export const Copyright = styled.div`
  padding: 0 10px;
`;

export const Maintainer = styled.div`
  padding: 0 10px;
`;
