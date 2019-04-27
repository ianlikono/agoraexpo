import React from 'react';
import Forum from '../src/components/Forum';
import ForumHeader from '../src/components/Forum/ForumHeader';

export interface ForumProps { }

function ForumPage(props: ForumProps) {
  return (
    <>
      <ForumHeader />
      <Forum />
    </>
  );
}

export default ForumPage;
