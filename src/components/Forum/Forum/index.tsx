import React from 'react';
import ForumHome from './Home';

export interface ForumProps {
  forumName: any;
}

function Forum(props: ForumProps) {
  const { forumName } = props;
  return (
    <>
      <ForumHome forumName={forumName} />
    </>
  );
}

export default Forum;
