import React from 'react';
import CosmWasm from '../organisms/cosmwasm';
import Header from '../organisms/header';
import Footer from '../organisms/footer';
import {
  ContentContainer,
  BackgroundBlur,
  BackgroundBox,
  BackgroundVideo,
  Title,
  SubTitle,
  MainIcon,
} from '../styles/home';

const Home = () => {
  return (
    <ContentContainer>
      <Header />
      <BackgroundBlur />
      <BackgroundBox>
        <BackgroundVideo muted autoPlay loop>
          <source src='/assets/background.mp4' type='video/mp4' />
        </BackgroundVideo>
      </BackgroundBox>
      <MainIcon />
      <Title>COSMWASM CONTRACT</Title>
      <SubTitle>TESTING TOOL</SubTitle>
      <CosmWasm />
      <Footer />
    </ContentContainer>
  );
};

export default React.memo(Home);
