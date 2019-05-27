import React from 'react';
import { Helmet } from 'react-helmet';
import Forum from '../src/components/Forum';
import ForumHeader from '../src/components/Forum/ForumHeader';

export interface ForumProps { }

function ForumPage(props: ForumProps) {
  return (
    <>
      <Helmet>
        <title>forums | agoraexpo</title>
        <link rel="canonical" href="https://agoraexpo.com/forums" />
        <meta name="description" content="agoraexpo forums" />
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="agoraexpo forums" />
        <meta itemProp="description" content="agoraexpo forums" />
        <meta itemProp="image" content="https://res.cloudinary.com/doelo01na/image/upload/v1556859500/static/logos/agoraexpobanner.png" />
        {/* Facebook Meta Tags */}
        <meta property="og:title" content="agoraexpo forums" />
        <meta property="og:description" content="agoraexpo forums" />
        <meta property="og:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
        <meta property="og:url" content="https://agoraexpo.com/forums" />
        <meta property="og:site_name" content="AgoraExpo" />
        {/* twitter Meta Tags */}
        <meta name="twitter:title" content="agoraexpo forums" />
        <meta name="twitter:description" content="agoraexpo forums" />
        <meta name="twitter:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="AgoraExpo" />
      </Helmet>
      <ForumHeader />
      <Forum />
    </>
  );
}

export default ForumPage;
