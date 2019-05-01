import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';


const Body = styled.div`
  background-color: green;
`;

const IndexPage: React.FunctionComponent = () => {
  return (
    <>
      <Helmet
        title='about || AgoraExpo'
        meta={[{ name: "description", content: "agoraexpo aboutpage" }]}
      />
      <Body>
        <h1>Welcome to agoraexpo hope you will have fun here</h1>
      </Body>
    </>
  );
};

export default IndexPage;
