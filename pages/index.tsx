import React, { useEffect } from 'react';
import Helmet from "react-helmet";
import Home from '../src/components/Home';
import { initGA, logPageView } from "../utils/analytics";

export interface HomePageProps { }

const HomePage = (props: HomePageProps) => {
  useEffect(() => {
    //@ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA();
      //@ts-ignore
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });
  return (
    <>
      <Helmet>
        <title>Home || AgoraExpo</title>
        <link rel="canonical" href="https://agoraexpo.com" />
        <meta name="description" content="Build your own online business stress free with no initial investment required" />
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="Build your own online business stress free with no initial investment required" />
        <meta itemProp="description" content="iGet the power of all the big players in your online business. Start for free with no initial investment required😀." />
        <meta itemProp="image" content="https://res.cloudinary.com/doelo01na/image/upload/v1556859500/static/logos/agoraexpobanner.png" />
        {/* Facebook Meta Tags */}
        <meta property="og:title" content="Build your own online business stress free with no initial investment required" />
        <meta property="og:description" content="Get the power of all the big players in your online business. Start for free with no initial investment required😀." />
        <meta property="og:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
        <meta property="og:url" content="https://agoraexpo.com" />
        <meta property="og:site_name" content="AgoraExpo" />
        {/* twitter Meta Tags */}
        <meta name="twitter:title" content="Build your own online business stress free with no initial investment required" />
        <meta name="twitter:description" content="Get the power of all the big players in your online business. Start for free with no initial investment required😀." />
        <meta name="twitter:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="AgoraExpo" />
      </Helmet>
      <div>
        <Home />
      </div>
    </>
  );
};

export default HomePage;
