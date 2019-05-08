import Link from 'next/link';
import React from 'react';
import { Query } from 'react-apollo';
import { forums } from '../../../graphql/queries';
import ForumCard from '../ForumCard';
import { ChildrenWrapper, ItemContent, ItemTitle, Wrapper } from './styles';

export interface ForumHomeProps { }

function ForumHome(props: ForumHomeProps) {
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
    )})
  }
  return (
    <Query query={forums}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        console.log(data);
        return (
          renderForumPosts(data.forums)
        )
          }}
      </Query>
  );
}

export default ForumHome;
