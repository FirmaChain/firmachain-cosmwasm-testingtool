import styled from 'styled-components';

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 100%;
  position: relative;
  margin: 0;
  padding: 0;
  margin-bottom: -1px;
`;

export const BackgroundBlur = styled.div`
  opacity: 0.7;
  background-color: #000;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  z-index: -80;
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
`;

export const BackgroundBox = styled.div`
  z-index: -90;
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0;
  padding: 0;
`;

export const BackgroundVideo = styled.video`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  object-fit: cover;
  max-height: 100%;
  margin: 0;
  padding: 0;
`;

export const Title = styled.div`
  width: 100%;
  max-width: 600px;
  font-size: 3rem;
  color: white;
  margin: 10px;
`;

export const SubTitle = styled.div`
  width: 100%;
  max-width: 600px;
  font-size: 2.4rem;
  color: white;
  margin: 20px 0 10px 0;
`;
