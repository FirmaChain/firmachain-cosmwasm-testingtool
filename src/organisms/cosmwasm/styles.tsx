import styled from 'styled-components';

export const CosmWasmContainer = styled.div`
  width: 100%;
  max-width: 900px;
  min-height: 554px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
`;

export const TabMenuList = styled.div<{ currentTab: number }>`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  ${(props) => `& > div:nth-child(${props.currentTab + 1}) {
    color:#fff;
    border-top: solid 4px #2b7cff;
    background-color:rgba(28, 29, 34, 0.9);
    & > div { 
      border-right:0;
    }
  }`};

  ${(props) => `& > div:nth-child(${props.currentTab}) {
    & > div { 
      border-right:0;
    }
  }`};

  & > div:last-child > div {
    border-right: 0;
  }
`;
export const TabText = styled.div`
  border-right: 1px solid #616368;
`;

export const TabMenu = styled.div`
  background-color: rgba(42, 44, 51, 0.9);
  border-top: solid 4px #ffffff00;
  cursor: pointer;
  color: white;
  font-weight: 400;
  flex-grow: 1;
  text-align: center;
  height: 48px;
  font-size: 2rem;
  color: #acacac;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TabContents = styled.div<{ currentTab: number }>`
  width: calc(100% - 80px);
  flex: 0 100%;
  display: flex;
  background-color: rgba(28, 29, 34, 0.9);
  padding: 40px;
  ${(props) => `& > div:nth-child(${props.currentTab + 1}) {
    display:flex;
  }`};
`;

export const TabContent = styled.div`
  width: 100%;
  display: none;
  gap: 30px;
  align-items: stretch;
`;

export const TabContentVertical = styled.div`
  width: 100%;
  display: none;
  gap: 30px;
  align-items: stretch;
  flex-direction: column;
`;

export const LeftContent = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const RightContent = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const TopContent = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const BottomContent = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const InputWrapRight = styled.div`
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const InputWrapHalf = styled.div`
  color: white;
  width: 50%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const InputGroup = styled.div`
  color: white;
  width: 100%;
  display: flex;
  position: relative;
  gap: 30px;
`;

export const Label = styled.div`
  font-size: 1.8rem;
  margin: 10px 0;
  color: #dddddd;
  display: flex;
  gap: 10px;
`;

export const Input = styled.div``;

export const GeneralButton = styled.div<{ active: boolean }>`
  width: 100%;
  height: 54px;
  line-height: 54px;
  text-align: center;
  ${(props) =>
    props.active
      ? `color: white;
        background-color:  #3252d3;`
      : `color: #8d8d8d;
        background-color: rgba(52, 54, 62, 0.75);`}
  cursor: pointer;
  font-size: 1.4rem;
`;

export const SmallButton = styled.div`
  padding: 3px 6px;
  line-height: 15px;
  margin-top: -3px;
  text-align: center;
  color: white;
  background-color: #3252d3;
  cursor: pointer;
  font-size: 1.22rem;
  border-radius: 4px;
`;
