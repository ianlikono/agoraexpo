import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
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

const Page = props => {
  const { children } = props;
  return (
    <React.Fragment>
      <Meta />
      <Header />
      <div>{children}</div>
    </React.Fragment>
  );
};

export default Page;
