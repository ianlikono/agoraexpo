import * as React from 'react';
import Helmet from "react-helmet";
import Home from '../src/components/Home';

export interface HomePageProps { }

const HomePage = (props: HomePageProps) => {
  return (
    <>
      <Helmet
        title='Home || AgoraExpo'
        meta={[{ name: "Home Page", content: "agoraexpo homepage" }]}
      />
      <div>
        <Home />
      </div>
    </>
  );
};

export default HomePage;
