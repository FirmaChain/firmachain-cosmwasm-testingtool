import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

export const Input = styled.div``;

export const Label = styled.div`
  font-size: 1.8rem;
  margin: 10px 0;
  color: #dddddd;
  display: flex;
  gap: 10px;
`;

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
  border-radius: 8px;
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

export const QueryButton = styled.div<{ isOpen: boolean }>`
  position: fixed;
  cursor: pointer;
  border-radius: 0 10px 10px 0;
  z-index: ${(props) => (props.isOpen ? '2000' : '1')};
  top: 110px;
  right: ${(props) => (props.isOpen ? '640px' : '0')};
  width: 40px;
  height: 90px;
  background: ${(props) => (props.isOpen ? 'rgb(42, 44, 51);' : '#3252d3;')};
  transition-property: all;
  transition-duration: 270ms;
  transition-timing-function: ease-in-out;
  font-size: 1.6rem;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  color: White;
  text-align: center;
  line-height: 36px;
`;

export const ClearButton = styled.div`
  position: absolute;
  z-index: 1000;
  top: 20px;
  right: 20px;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #8d8d8d;
  background-color: rgba(52, 54, 62, 0.75);
  cursor: pointer;
  font-size: 1.4rem;
  border-radius: 8px;
`;
