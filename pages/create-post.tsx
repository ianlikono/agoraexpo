import React from 'react';
import { Helmet } from 'react-helmet';
import CreatePost from '../src/components/CreatePost';
import ForumHeader from '../src/components/Forum/ForumHeader';
import CreatePostProvider from '../src/contexts/CreatePost';

export interface CreatePostProps { }

function CreatePostPage(props: CreatePostProps) {
  return (
    <>
      <Helmet>
        <title>create new forum Post</title>
        <link rel="canonical" href="https://agoraexpo.com/create-post" />
        <meta name="description" content="create new agora expo forum Post" />
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="create new agora expo forum Post" />
        <meta itemProp="description" content="create new agora expo forum and let get a communication link between you and your clients to offer satisfaction" />
        <meta itemProp="image" content="https://res.cloudinary.com/doelo01na/image/upload/v1556859500/static/logos/agoraexpobanner.png" />
        {/* Facebook Meta Tags */}
        <meta property="og:title" content="create new agora expo forum Post" />
        <meta property="og:description" content="create new agora expo forum and let get a communication link between you and your clients to offer satisfaction" />
        <meta property="og:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
        <meta property="og:url" content="https://agoraexpo.com/create-post" />
        <meta property="og:site_name" content="AgoraExpo" />
        {/* twitter Meta Tags */}
        <meta name="twitter:title" content="create new agora expo forum post" />
        <meta name="twitter:description" content="create new agora expo forum and let get a communication link between you and your clients to offer satisfaction" />
        <meta name="twitter:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="AgoraExpo" />
      </Helmet>
      <CreatePostProvider>
        <ForumHeader />
        <CreatePost />
      </CreatePostProvider>
    </>
  );
}

export default CreatePostPage;
