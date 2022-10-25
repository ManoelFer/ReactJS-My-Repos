import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body{
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    font-size: 14px;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: ${({ theme }) => theme.colors.colorTextInsideBodyInputButton};
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
