import styled from 'styled-components';

export const FooterContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 50px;
  min-height: 50px;
  display: flex;
  background-color: rgb(33, 33, 47);
  color: #ccc;
  font-size: 1.3rem;
  display: flex;
  flex: 0 50px;
  align-items: center;
  justify-content: center;
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
