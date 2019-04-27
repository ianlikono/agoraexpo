import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';
import PostIcon from '@material-ui/icons/Message';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Autocomplete from '../AutoComplete';
import Post from './Post';
import { ForumSearch, Header, Wrapper } from './styles';

export interface CreatePostProps {
  classes: any;
  theme: any;
}

const forums = [
  { name: "mimi", pic: "https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
  { name: "next events", pic: "https://images.unsplash.com/photo-1469510038946-6bf892bbe9d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
  { name: "eventsjucture", pic: "https://images.unsplash.com/photo-1544519838-0f1346c8bcf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
  { name: "devtinder", pic: "https://images.unsplash.com/photo-1502158817207-08ef5c149b03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
  { name: "fetcheasy", pic: "https://images.unsplash.com/photo-1539122885057-0f86d813303c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
  { name: "fetch", pic: "https://images.unsplash.com/photo-1539122885057-0f86d813303c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
]

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
});


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}


function CreatePost(props: CreatePostProps) {
  const [value, setValue] = useState(0);
  const { classes, theme } = props;

  function handleValueChange(event, value) {
    setValue(value);
  }
  function handleValueChangeIndex(index) {
    setValue(index);
  }
  return (
    <>
      <Wrapper>
        <Header>Create Post</Header>
        <ForumSearch>
          <Autocomplete placeholder="Search For Forums" suggestions={forums} />
        </ForumSearch>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleValueChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Post" icon={<PostIcon />}/>
              <Tab label="Image" icon={<ImageIcon />}/>
              <Tab label="Link" icon={<LinkIcon />}/>
            </Tabs>
          </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleValueChangeIndex}
            >
                <TabContainer dir={theme.direction}><Post /></TabContainer>
                <TabContainer dir={theme.direction}>Item Two</TabContainer>
                <TabContainer dir={theme.direction}>Item Three</TabContainer>
            </SwipeableViews>
        </div>
      </Wrapper>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(CreatePost);
