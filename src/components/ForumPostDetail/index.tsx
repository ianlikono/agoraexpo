import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import React from 'react';
import { IconContext } from 'react-icons';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import { MdComment } from 'react-icons/md';
import Moment from 'react-moment';
import { CardHeader, CommentCountText, CommentIcon, ForumAvatar, ForumAvatarImage, ForumTitle, ForumWrapper, HeaderTitles, HeaderTitlesContent, PostedBy, PostedTime, UserText, VoteCountText, VoteIcon, VotingWrapper, Wrapper } from './styles';
import './styles.css';

export interface PostProps {
  data: any;
  classes: any;
}
const ForumCardItems = {
  forumName: "awesome",
  ForumAvatarPic: "https://images.unsplash.com/photo-1546171995-fc8620224997?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  OwnerName: "ianlikono",
  createdAt: "9 minutes ago",
  voteCount: 500,
  id: 3444,
  commentsNumber: 500,
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: '100%',
    margin: '2.5rem auto',
    paddingLeft: '0px !important',
    cursor: 'pointer',
  },
});

function ForumPostDetail(props: PostProps) {
  const { data, classes } = props;
  const { voteCount, commentsNumber } = ForumCardItems;
  const { forumPost } = data;
  const HtmlToReactParser = require('html-to-react').Parser;
  const htmlToReactParser = new HtmlToReactParser();
  const contentElement = htmlToReactParser.parse(forumPost.content);

  console.log(data);
  return (
    <Wrapper>
      <Paper className={classes.root} elevation={1}>
        <ForumWrapper>
          <VotingWrapper>
            <VoteIcon>
              <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '4.5rem' } }}>
                <IoIosArrowRoundUp />
              </IconContext.Provider>
            </VoteIcon>
            <VoteCountText>{voteCount}</VoteCountText>
            <VoteIcon>
              <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '4.5rem' } }}>
                <IoIosArrowRoundDown />
              </IconContext.Provider>
            </VoteIcon>
          </VotingWrapper>
          <div>
            <CardHeader>
              <ForumAvatar>
                <Link href={`/f/${forumPost.forum.name}`}>
                  <a>
                    <ForumAvatarImage src={forumPost.forum.avatarPic} />
                  </a>
                </Link>
              </ForumAvatar>
              <HeaderTitles>
                <HeaderTitlesContent>
                  <Link href={`/f/${forumPost.forum.name}`}>
                    <a>
                      <ForumTitle>{`f/${forumPost.forum.name}`} {" . "}</ForumTitle>
                    </a>
                  </Link>
                  <PostedBy>Posted by</PostedBy>
                  <Link href={`/u/${forumPost.postedBy.username}`}>
                    <a>
                      <UserText>{`u/${forumPost.postedBy.username}`} {" . "}</UserText>
                    </a>
                  </Link>
                  <PostedTime><Moment fromNow>{forumPost.createdAt}</Moment></PostedTime>
                </HeaderTitlesContent>
              </HeaderTitles>
            </CardHeader>
            <h1>{forumPost.title}</h1>
            {contentElement}
            <CommentIcon>
              <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '2.5rem' } }}>
                <MdComment />
              </IconContext.Provider>
              <CommentCountText>{commentsNumber}{" "}comments</CommentCountText>
            </CommentIcon>
          </div>
        </ForumWrapper>
      </Paper>
    </Wrapper>
  );
}

export default withStyles(styles)(ForumPostDetail);

