import { NextContext } from 'next';
import React from 'react';
import { Query } from 'react-apollo';
import Helmet from 'react-helmet';
import ForumHeader from '../src/components/Forum/ForumHeader';
import ForumPostDetail from '../src/components/ForumPostDetail';
import { forumPostQuery } from '../src/graphql/queries';
import { initGA, logPageView } from "../utils/analytics";

export interface queryProps {
  id: String;
  name: String;
}

class ForumItemPage extends React.Component<queryProps> {
  static getInitialProps({ query: { name, id } }: NextContext) {
    return { id, name };
  }

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }


  render() {
    const { id, name } = this.props;
    return (
      <>
        <ForumHeader />
        <Query query={forumPostQuery} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            const HtmlToReactParser = require('html-to-react').Parser;
            const htmlToReactParser = new HtmlToReactParser();
            const contentElement = data && htmlToReactParser.parse(data.forumPost.content);
            return (
              <>
                <Helmet>
                  <title>{`${data.forumPost && data.forumPost.title} | ${data.forumPost && data.forumPost.forum.name}`}</title>
                  <link rel="canonical" href={`https://agoraexpo.com/f/${data.forumPost.forum.name}/${id}`} />
                  <meta name="description" content={contentElement} />
                  {/* Google / Search Engine Tags */}
                  <meta itemProp="name" content={`${data.forumPost && data.forumPost.title} | ${data.forumPost && data.forumPost.forum.name}`} />
                  <meta itemProp="description" content={contentElement} />
                  <meta itemProp="image" content="https://res.cloudinary.com/doelo01na/image/upload/v1556859500/static/logos/agoraexpobanner.png" />
                  {/* Facebook Meta Tags */}
                  <meta property="og:title" content={`${data.forumPost && data.forumPost.title} | ${data.forumPost && data.forumPost.forum.name}`} />
                  <meta property="og:description" content={contentElement} />
                  <meta property="og:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
                  <meta property="og:url" content={`https://agoraexpo.com/f/${data.forumPost.forum.name}/${id}`} />
                  <meta property="og:site_name" content="AgoraExpo" />
                  {/* twitter Meta Tags */}
                  <meta name="twitter:title" content={`${data.forumPost && data.forumPost.title} | ${data.forumPost && data.forumPost.forum.name}`} />
                  <meta name="twitter:description" content={contentElement} />
                  <meta name="twitter:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:image:alt" content="AgoraExpo" />
                </Helmet>
                <ForumPostDetail data={data} />
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default ForumItemPage;

