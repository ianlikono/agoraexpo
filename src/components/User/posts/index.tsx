import Link from 'next/link';
import React from 'react';
import { Query } from 'react-apollo';
import { getUserPosts } from '../../../graphql/queries';
import ForumCard from '../../Forum/ForumCard';
import { ChildrenWrapper, ItemContent, ItemTitle, Wrapper } from './styles';


export interface PostsProps {
  username: String;
}

function UserPosts(props: PostsProps) {
  const { username } = props;

  function renderUserPosts(items) {
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
    <>
      <Query query={getUserPosts} variables={{ username }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) console.log(error);
          if(!data.getUserPosts) {
            return (
              <h3>No Posts Available</h3>
            )
          }
          return (
            renderUserPosts(data.getUserPosts)
          )
        }}
      </Query>
    </>
  );
}

export default UserPosts;
