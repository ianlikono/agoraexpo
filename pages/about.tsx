import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { initGA, logPageView } from "../utils/analytics";


const IndexPage: React.FunctionComponent = () => {
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
        <script dangerouslySetInnerHTML={{
          __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:1322666,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}} />
        <title>about || AgoraExpo</title>
        <link rel="canonical" href="https://agoraexpo.com" />
        <meta name="description" content="Build your own online business stress free with no initial investment required" />
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="Build your own online business stress free with no initial investment required" />
        <meta itemProp="description" content="Get the power of all the big players in your online business. Start for free with no initial investment required😀." />
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
      <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Welcome to agoraexpo hope you will have fun here</h1>
      </div>
    </>
  );
};

export default IndexPage;
