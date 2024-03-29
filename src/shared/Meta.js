import Head from 'next/head';
import React from 'react';

const Meta = () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <title>agoraexpo</title>
    </Head>
    <style jsx global>{`
        a {
          color: inherit;
          background: inherit;
          text-decoration: inherit;
          font-size: inherit;
        }
        a:hover {
          color: inherit;
          background: inherit;
          text-decoration: inherit;
          font-size: inherit;
        }
      `}</style>
    </>
);

export default Meta;
