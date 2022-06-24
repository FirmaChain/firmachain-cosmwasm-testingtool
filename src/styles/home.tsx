import styled from 'styled-components';

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0;
  flex-grow: 1;
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
  text-align: center;
  font-size: 4rem;
  color: white;
  margin: 16px;
  font-family: 'Metropolis-ExtraBold' !important;
`;

export const SubTitle = styled.div`
  width: 170px;
  height: 35px;
  line-height: 37px;
  color: white;
  background-color: #3252d3;
  text-align: center;
  font-size: 1.6rem;
  border-radius: 60px;
  font-family: 'Metropolis-Medium' !important;
  margin-bottom: 34px;
`;

export const MainIcon = styled.div`
  width: 55px;
  height: 55px;
  background-image: url('${({ theme }) => theme.urls.logo}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  margin-top: 100px;
`;
