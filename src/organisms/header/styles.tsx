import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 50px;
  min-height: 50px;
  background-color: rgb(33, 33, 47);
  color: #ccc;
  font-size: 1.4rem;
  display: flex;
  flex: 0 50px;
  align-items: center;
  justify-content: center;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
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
  width: 130px;
`;

export const WalletButton = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: white;
  background-color: ${({ theme }) => theme.colors.mainblue};
  border-radius: 4px;
  cursor: pointer;
`;

export const LinkList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-left: 40px;
  margin-top: 2px;
`;
export const LinkItem = styled.div`
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
