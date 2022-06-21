import styled from 'styled-components';

export const CosmWasmContainer = styled.div`
  width: 100%;
  background-color: #00000080;
  max-width: 600px;
  min-height: 360px;
  max-height: 360px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const TabMenuList = styled.div<{ currentTab: number }>`
  display: flex;
  align-items: center;
  ${(props) => `& > div:nth-child(${props.currentTab + 1}) {
    color:${props.theme.colors.mainblue};
    border-bottom: 2px solid ${props.theme.colors.mainblue}
  }`};
`;

export const TabMenu = styled.div`
  padding: 5px 20px;
  cursor: pointer;
  color: white;
  font-weight: 400;
`;

export const TabContents = styled.div`
  width: 100%;
  flex: 0 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

export const NeedLogin = styled.div`
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputWrap = styled.div`
  color: white;
`;
export const Label = styled.div`
  font-size: 1.6rem;
  margin: 10px 0;
`;
export const Input = styled.div``;

export const GeneralButton = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: white;
  background-color: ${({ theme }) => theme.colors.mainblue};
  border-radius: 4px;
  cursor: pointer;
  margin: 20px 0;
  font-size: 1.4rem;
`;
