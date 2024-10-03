import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Roboto', sans-serif; /* Cambiado a Roboto */
  }

  body {
    font-family: 'Roboto', sans-serif; /* Aseguramos que el body use Roboto */
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Roboto', sans-serif; /* Cambiado a Roboto */
    line-height: 1.5em;
  }

  input, select {
    font-family: 'Roboto', sans-serif; /* Aseguramos que los inputs también usen Roboto */
    font-size: inherit;
  }
`;
