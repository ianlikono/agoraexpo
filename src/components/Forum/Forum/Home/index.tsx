import Link from 'next/link';
import React from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { forumPosts } from '../../../../graphql/queries';
import ForumCard from '../../ForumCard';
import { ChildrenWrapper, ItemContent, ItemTitle, Wrapper } from './styles';

export interface ForumHomeProps {
  forumName: any;
}

function ForumHome(props: ForumHomeProps) {
  const { forumName } = props;
  function renderForumPosts(items) {

    return items.map((item) => {
      const HtmlToReactParser = require('html-to-react').Parser;
      const htmlToReactParser = new HtmlToReactParser();
      const contentElement = htmlToReactParser.parse(item.content);
      return (
        <Wrapper key={item.id}>
          <ForumCard forumName={item.forum.name} ForumAvatarPic={item.forum.avatarPic} OwnerName={item.postedBy.username} createdAt={item.createdAt} commentsNumber={item.comments.length} id={item.id}>
            <Link href={`/f/${item.forum.name}/${item.id}`}>
              <a>
                <ChildrenWrapper>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemContent>
                    {contentElement[0]}
                  </ItemContent>
                </ChildrenWrapper>
              </a>
            </Link>
          </ForumCard>
        </Wrapper>
      )
    })
  }
  return (
    <Query query={forumPosts} variables={{ forumName }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return (
          <>
            <Helmet>
                <title>{`${forumName} | posts`}</title>
                <link rel="canonical" href={`https://agoraexpo.com/f/${forumName}`} />
                <meta name="description" content={`${forumName} posts`} />
                {/* Google / Search Engine Tags */}
                <meta itemProp="name" content={`${forumName} posts`} />
                <meta itemProp="description" content={`${forumName} posts`} />
                <meta itemProp="image" content="https://res.cloudinary.com/doelo01na/image/upload/v1556859500/static/logos/agoraexpobanner.png" />
                {/* Facebook Meta Tags */}
                <meta property="og:title" content={`${forumName} posts`} />
                <meta property="og:description" content={`${forumName} posts`} />
                <meta property="og:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
                <meta property="og:url" content={`https://agoraexpo.com/f/${forumName}`} />
                <meta property="og:site_name" content="AgoraExpo" />
                {/* twitter Meta Tags */}
                <meta name="twitter:title" content={`${forumName} posts`} />
                <meta name="twitter:description" content={`${forumName} posts`} />
                <meta name="twitter:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image:alt" content="AgoraExpo" />
            </Helmet>
            {data.forumPosts.length ? renderForumPosts(data.forumPosts) : (
              <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h1>Sorry No Posts Available 😢. Be the first to publish a post 😍</h1>
              </div>
            )}
          </>
        )
      }}
    </Query>
  );
}

export default ForumHome;
