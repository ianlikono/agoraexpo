import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import React from 'react';
import { IconContext } from 'react-icons';
import { MdComment } from 'react-icons/md';
import Moment from 'react-moment';
import Comments from './comments/comments';
import Editor from './comments/Editor/Editor';
import { CardHeader, CommentIcon, ForumAvatar, ForumAvatarImage, ForumTitle, ForumWrapper, HeaderTitles, HeaderTitlesContent, PostedBy, PostedTime, UserText, Wrapper } from './styles';
import './styles.css';

export interface PostProps {
  data: any;
  classes: any;
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
  const { forumPost } = data;
  const HtmlToReactParser = require('html-to-react').Parser;
  const htmlToReactParser = new HtmlToReactParser();
  const contentElement = htmlToReactParser.parse(forumPost.content);

  return (
    <Wrapper>
      <Paper className={classes.root} elevation={1}>
        <ForumWrapper>
          { " " }
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
            </CommentIcon>
          </div>
        </ForumWrapper>
        <h1>Comments</h1>
        <Editor postId={forumPost.id} />
        <Comments postId={forumPost.id} />
      </Paper>
    </Wrapper>
  );
}

export default withStyles(styles)(ForumPostDetail);

