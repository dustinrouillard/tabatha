import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: #000000;
    color: #ffffff;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;

    :hover, :focus, :active {
      text-decoration: underline;
    }
  }
  
  * {
    box-sizing: border-box;
    transition: all 150ms linear;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
