import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
      <Helmet
        title='404 not-found || AgoraExpo'
        meta={[{ name: "description", content: "Not found Page" }]}
      />
      <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Sorry Page Not Found 😢. Keep browsing we have alot more for you to see 😍</h1>
      </div>
    </>
  );
};

export default IndexPage;
