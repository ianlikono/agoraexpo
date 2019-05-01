import { NextContext } from 'next';
import React from 'react';
import { Query } from 'react-apollo';
import Helmet from 'react-helmet';
import ForumHeader from '../src/components/Forum/ForumHeader';
import ForumPostDetail from '../src/components/ForumPostDetail';
import { forumPostQuery } from '../src/graphql/queries';

export interface queryProps {
  id: String;
  name: String;
}

class ForumItemPage extends React.Component<queryProps> {
  static getInitialProps({ query: { name, id } }: NextContext) {
    return { id, name };
  }

  render() {
    const { id, name } = this.props;
    console.log('name', name)
    console.log('id', id)
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
                <Helmet
                  title={`${data.forumPost && data.forumPost.title} | ${data.forumPost && data.forumPost.forum.name}`}
                  meta={[{ name: "description", content: contentElement }]}
                />
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

