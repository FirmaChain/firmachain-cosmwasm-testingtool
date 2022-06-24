import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';

import './default.css';

import theme from './themes';
import { MainContainer } from './styles/common';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <Routes />
        </MainContainer>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
