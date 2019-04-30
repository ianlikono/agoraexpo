import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { MdComment } from 'react-icons/md';
import Moment from 'react-moment';
import { CardHeader, CommentCountText, CommentIcon, ForumAvatar, ForumAvatarImage, ForumTitle, ForumWrapper, HeaderTitles, HeaderTitlesContent, PostedBy, PostedTime, UserText } from './styles';

export interface ForumCardProps {
  classes: any;
  children: any;
  forumName: any;
  ForumAvatarPic: any;
  OwnerName: any;
  createdAt: any;
  id: any;
  commentsNumber: any;
}

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: '60%',
    margin: '2.5rem auto',
    paddingLeft: '0px !important',
    cursor: 'pointer',
  },
});

// const ForumCardItems = {
//   forumName: "awesome",
//   ForumAvatarPic: "https://images.unsplash.com/photo-1546171995-fc8620224997?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   OwnerName: "ianlikono",
//   createdAt: "9 minutes ago",
//   id: 3444,
//   commentsNumber: 500,
// }

{/* <Wrapper onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}> */ }

function ForumCard(props: ForumCardProps) {
  const { classes, children } = props;
  const { forumName, ForumAvatarPic, OwnerName, createdAt, id, commentsNumber } = props;

  const [elevation, setElevation] = useState(1);

  function onMouseEnter() {
    setElevation(4)
  }
  function onMouseLeave() {
    setElevation(1)
  }
  return (
    <>
      <Paper className={classes.root} elevation={elevation} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
        <ForumWrapper>
          <div>
            <CardHeader>
              <ForumAvatar>
                <Link href={`/f/${forumName}`}>
                  <a>
                    <ForumAvatarImage src={ForumAvatarPic} />
                  </a>
                </Link>
              </ForumAvatar>
              <HeaderTitles>
                <HeaderTitlesContent>
                  <Link href={`/f/${forumName}`}>
                    <a>
                      <ForumTitle>{`f/${forumName}`} {" . "}</ForumTitle>
                    </a>
                  </Link>
                  <PostedBy>Posted by</PostedBy>
                  <Link href={`/u/${OwnerName}`}>
                    <a>
                      <UserText>{`u/${OwnerName}`} {" . "}</UserText>
                    </a>
                  </Link>
                  <PostedTime>
                  <Moment fromNow>{createdAt}</Moment>
                  </PostedTime>
                </HeaderTitlesContent>
              </HeaderTitles>
            </CardHeader>
            {children}
            <Link href={`/f/${forumName}/${id}`}>
                <a>
                <CommentIcon>
                  <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '2.5rem' } }}>
                    <MdComment />
                  </IconContext.Provider>
                  <CommentCountText>{commentsNumber}{" "}comments</CommentCountText>
                </CommentIcon>
              </a>
            </Link>
          </div>
        </ForumWrapper>
      </Paper>
    </>
  );
}

export default withStyles(styles)(ForumCard);

