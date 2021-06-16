import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import App from './App';
import { GlobalStyle } from './theme/GlobalStyle'
import { theme } from './theme/theme';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
