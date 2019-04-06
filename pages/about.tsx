import React from 'react';
import styled from 'styled-components'


const Body = styled.div`
  background-color: green;
`;

const IndexPage: React.FunctionComponent = () => {
  return (
    <Body>
      <h1>Hello Next.js</h1>
    </Body>
  );
};

export default IndexPage;
