import React from 'react';
import CreatePost from '../src/components/CreatePost';
import ForumHeader from '../src/components/Forum/ForumHeader';

export interface CreatePostProps {}

function CreatePostPage (props: CreatePostProps) {
  return (
    <>
      <ForumHeader />
      <CreatePost />
    </>
  );
}

export default CreatePostPage;
