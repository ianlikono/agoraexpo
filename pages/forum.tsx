// eslint-disable-next-line no-unused-vars
import { NextContext } from 'next';
import React from 'react';
import Forum from '../src/components/Forum/Forum';
import ForumHeader from '../src/components/Forum/ForumHeader';
import { ForumEditorWrapper } from '../src/shared/styles';

export interface ForumProps {
  name: any;
}

class ForumPage extends React.Component<ForumProps> {
  static getInitialProps({ query: { name } }: NextContext) {
    return { name };
  }

  render() {
    const { name } = this.props;
    const forumName = name;
    return (
      <>
        <ForumHeader />
        <>
          <ForumEditorWrapper>
          </ForumEditorWrapper>
          <Forum forumName={forumName}/>
        </>
      </>
    );
  }
}

export default ForumPage;
