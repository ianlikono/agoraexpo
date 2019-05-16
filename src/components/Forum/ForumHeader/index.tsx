import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React, { useRef } from 'react';
import Search from '../../Header/Search';
import Add from './Add';
import CreatePost from './CreatePost';
import { HeaderWrapper, ToolBarContent, UserProfile } from './styles';
import User from './User';

export interface ForumHeaderProps {
  classes: any;
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.primary,
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function ForumHeader(props: ForumHeaderProps) {
  const { classes } = props;
  const anchorEl = useRef(null);

  return (
    <>
      <AppBar position="fixed" color="primary">
        <HeaderWrapper>
          <Toolbar>
            <Link href="/">
              <a>
                <Typography className={classes.title} variant="h2" color="inherit" noWrap>
                  AgoraExpo
                </Typography>
              </a>
            </Link>
            <ToolBarContent>
              <Search />
              <CreatePost />
              <Add />
              <UserProfile>
                <User />
              </UserProfile>
            </ToolBarContent>
          </Toolbar>
        </HeaderWrapper>
      </AppBar>
    </>
  );
}

export default withStyles(styles)(ForumHeader);
