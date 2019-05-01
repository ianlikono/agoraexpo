import React from 'react';
import Helmet from 'react-helmet';
import CreatePost from '../src/components/CreatePost';
import ForumHeader from '../src/components/Forum/ForumHeader';
import CreatePostProvider from '../src/contexts/CreatePost';

export interface CreatePostProps { }

function CreatePostPage(props: CreatePostProps) {
  return (
    <>
      <Helmet
        title='New Post'
        meta={[{ name: "description", content: "Create new agoraexpo forum post" }]}
      />
      <CreatePostProvider>
        <ForumHeader />
        <CreatePost />
      </CreatePostProvider>
    </>
  );
}

export default CreatePostPage;
