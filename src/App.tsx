import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import Header from './organisms/header';
import Footer from './organisms/footer';

import './default.css';

import theme from './themes';
import { MainContainer } from './styles/common';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <Header />
          <Routes />
          <Footer />
        </MainContainer>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
