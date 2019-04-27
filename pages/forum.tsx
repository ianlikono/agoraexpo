import React from 'react';
import Forum from '../src/components/Forum';
import ForumHeader from '../src/components/Forum/ForumHeader';
import { ForumEditorWrapper } from '../src/shared/styles';

export interface ForumProps { }

function ForumPage(props: ForumProps) {
  return (
    <>
      <ForumHeader />
      <>
        <ForumEditorWrapper>
        </ForumEditorWrapper>
        <Forum />
      </>
    </>
  );
}

export default ForumPage;