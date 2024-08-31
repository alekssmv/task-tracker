import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  h2 {
    font-size: 20px;
    margin: 0;
    white-space: nowrap;
  }
  :root {
    font-family: 'Inter', sans-serif;
    font-size: 20px;
  }
`;

export default GlobalStyle