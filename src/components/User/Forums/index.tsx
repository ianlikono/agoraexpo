import Link from 'next/link';
import React from 'react';
import { Query } from 'react-apollo';
import { getUserForums } from '../../../graphql/queries';
import ForumsCards from '../../ForumsCards/ForumCard';
import { Wrapper } from './styles';

export interface ForumsProps {
  username: any;
}

function Forums(props: ForumsProps) {
  const { username } = props;
  function renderForumCards(forums: any) {
    return forums.map((forum: any) => {
      return (
        <>
          <Link href={`/f/${forum.name}`}>
            <a>
              <ForumsCards key={forum.id} avatarPic={forum.avatarPic} name={forum.name} />
            </a>
          </Link>
        </>
      )
    })
  }
  return (
    <Query query={getUserForums} variables={{ username }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) console.log(error);
        if(!data.getUserForums) {
          return (
            <h3>No Forums Available</h3>
          )
        }
        return (
          <Wrapper>
            {renderForumCards(data.getUserForums)}
          </Wrapper>
        )
      }}
    </Query>
  );
}

export default Forums;
