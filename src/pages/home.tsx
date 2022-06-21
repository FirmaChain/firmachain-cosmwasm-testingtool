import React from 'react';
import CosmWasm from '../organisms/cosmwasm';
import { ContentContainer, BackgroundBlur, BackgroundBox, BackgroundVideo, Title } from '../styles/home';

const Home = () => {
  return (
    <ContentContainer>
      <BackgroundBlur />
      <BackgroundBox>
        <BackgroundVideo muted autoPlay loop>
          <source src='/assets/background.mp4' type='video/mp4' />
        </BackgroundVideo>
      </BackgroundBox>
      <Title>CosmWasm Contract Testing Tool</Title>
      <CosmWasm />
    </ContentContainer>
  );
};

export default React.memo(Home);
