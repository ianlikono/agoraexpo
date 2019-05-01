import React from 'react';
import Helmet from 'react-helmet';
import Forum from '../src/components/Forum';
import ForumHeader from '../src/components/Forum/ForumHeader';

export interface ForumProps { }

function ForumPage(props: ForumProps) {
  return (
    <>
      <Helmet
        title="forums | agoraexpo"
        meta={[{ name: "description", content: "agoraexpo forums" }]}
      />
      <ForumHeader />
      <Forum />
    </>
  );
}

export default ForumPage;
