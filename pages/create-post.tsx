import React from 'react';
import CreatePost from '../src/components/CreatePost';
import ForumHeader from '../src/components/Forum/ForumHeader';
import CreatePostProvider from '../src/contexts/CreatePost';

export interface CreatePostProps { }

function CreatePostPage(props: CreatePostProps) {
  return (
    <CreatePostProvider>
      <ForumHeader />
      <CreatePost />
    </CreatePostProvider>
  );
}

export default CreatePostPage;
