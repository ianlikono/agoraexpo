import Link from 'next/link';
import React from 'react';
import ForumCard from '../ForumCard';
import { ChildrenWrapper, ItemContent, ItemTitle, Wrapper } from './styles';

export interface ForumHomeProps { }

const ForumItem = {
  id: 500,
  title: "Anyone interested in a weekly mailing list / newsletter?",
  content: "I haven't found any weekly mailing lists outlining the latest / most interesting developments / contributions to the react native community, so I've been contemplating filling that void",
  forumName: "awesome",
}

function ForumHome(props: ForumHomeProps) {
  const {id, title, content, forumName} = ForumItem;
  return (
    <Wrapper>
      <ForumCard>
        <Link href={`/f/${forumName}/${id}`}>
          <a>
            <ChildrenWrapper>
              <ItemTitle>{title}</ItemTitle>
              <ItemContent>{content}</ItemContent>
            </ChildrenWrapper>
          </a>
        </Link>
      </ForumCard>
    </Wrapper>
  );
}

export default ForumHome;
