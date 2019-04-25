import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Meta from './Meta';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  body {
    background-color: #E6ECF0 !important;
  }
`;


const theme = {
  colorRedPrimary: "#f44336",
  colorGreenPrimary: "#4caf50",
  colorTextPrimary: "rgb(255, 255, 255)",
  colorTextSecondary: "rgba(0, 0, 0, 0.87)",
  HoverBoxShadow:
    "5px 6px 8px 5px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
  BoxShadow:
    "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
  imageGradientLight: "rgba(197 ,196 ,255, 0.8)",
  imageGradientDark: "rgba(37, 115, 203, 0.8)"
};

const Page = props => {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Meta />
        <Header />
        <div>{children}</div>
        <GlobalStyle />
        <Footer />
      </React.Fragment>
    </ThemeProvider>
  );
};

export default Page;
