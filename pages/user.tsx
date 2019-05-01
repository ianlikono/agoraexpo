// eslint-disable-next-line no-unused-vars
// @ts-ignore
import { NextContext } from 'next';
import React from 'react';
import Helmet from 'react-helmet';
import User from '../src/components/User';

export interface ForumProps {
  username: any;
}

class ForumPage extends React.Component<ForumProps> {
  static getInitialProps({ query: { username } }: NextContext) {
    return { username };
  }

  render() {
    const { username } = this.props;
    console.log(username);
    return (
      <>
        <Helmet
          title={`${username}`}
          meta={[{ name: "description", content: username }]} />
        <User />
      </>
    );
  }
}

export default ForumPage;
