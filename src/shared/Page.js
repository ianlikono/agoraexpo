import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
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
  colorTextDark: "rgb(34, 34, 34)",
  colorTextLight: "rgb(120, 124, 126)",
  offWhite: '#EDEDED',
  backgroundColor: '#fff',
  HoverBoxShadow:
    "5px 6px 8px 5px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
  BoxShadow:
    "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
  imageGradientLight: "rgba(197 ,196 ,255, 0.8)",
  imageGradientDark: "rgba(37, 115, 203, 0.8)"
};

const BodyWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  padding-bottom: 20.7rem;
`;

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20.7rem;
`;


const Page = props => {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Meta />
        <BodyWrapper>
          <Header />
          <ContentWrapper>
            <div>{children}</div>
          </ContentWrapper>
          <GlobalStyle />
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </BodyWrapper>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default Page;
