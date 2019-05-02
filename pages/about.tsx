import React from 'react';
import Helmet from 'react-helmet';


const IndexPage: React.FunctionComponent = () => {
  return (
    <>
      <Helmet
        title='about || AgoraExpo'
        meta={[{ name: "description", content: "agoraexpo aboutpage" }]}
      />
      <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Welcome to agoraexpo hope you will have fun here</h1>
      </div>
    </>
  );
};

export default IndexPage;
