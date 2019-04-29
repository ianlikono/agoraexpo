import { NextContext } from 'next';
import React from 'react';
import { Query } from 'react-apollo';
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
            console.log(data);
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return <ForumPostDetail data={data} />;
          }}
        </Query>
      </>
    );
  }
}

export default ForumItemPage;

