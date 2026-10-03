import styled, { createGlobalStyle } from "styled-components";

import { mobile } from "../../styles/breakpoints";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "Roboto", sans-serif;
  }

  body {
    margin: 0;
  }

  div,
  button,
  a {
    font-family: "Roboto", sans-serif;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button {
    cursor: pointer;
  }

  ul,
  ol {
    padding: 0;
    margin: 0;
  }

  ul li,
  ol li {
    list-style: none;
  }

  #root {
    width: 100%;
    min-height: 100%;
  }
`;

export const Container = styled.div`
  max-width: 1260px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  ${mobile} {
    padding: 0 16px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
`;
