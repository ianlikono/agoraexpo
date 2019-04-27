import React from 'react';
import Editor from '../Editor';
import Title from './Title';

export interface PostProps {}

function Post (props: PostProps) {
  return (
    <>
      <Title />
      <Editor />
    </>
  );
}

export default Post;
