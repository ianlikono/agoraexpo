import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useRef } from 'react';
import { IconContext } from 'react-icons';
import { IoIosTrendingUp } from 'react-icons/io';
import { MdGroupWork, MdNewReleases } from 'react-icons/md';
import DropDown from '../../DropDown';
import Add from './Add';
import CreatePost from './CreatePost';
import Search from './Search';
import { ButtonText, CategoryText, HeaderWrapper, SortBar, ToolBarContent, UserProfile } from './styles';
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
  const [open, setOpen] = React.useState(false);

  function handleSortToggle() {
    setOpen(!open);
  }

  function handleSortClose(event: any) {
    // @ts-ignore
    if (anchorEl.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  return (
    <>
      <AppBar position="fixed" color="primary">
        <HeaderWrapper>
          <Toolbar>
            <ToolBarContent>
              <SortBar>
                <>
                  <Button
                    buttonRef={anchorEl}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleSortToggle}
                  >
                    <ButtonText>Sort</ButtonText>
                  </Button>
                  <DropDown anchorEl={anchorEl} handlePopupClose={handleSortClose} open={open}>
                  <MenuItem onClick={handleSortClose}>
                      <IconContext.Provider
                        value={{ style: { color: 'inherit', fontSize: '2rem' } }}
                      >
                        <IoIosTrendingUp />
                        <CategoryText>Trending</CategoryText>
                      </IconContext.Provider>
                    </MenuItem>
                    <MenuItem onClick={handleSortClose}>
                      <IconContext.Provider
                        value={{ style: { color: 'inherit', fontSize: '2rem' } }}
                      >
                        <MdNewReleases />
                        <CategoryText> New</CategoryText>
                      </IconContext.Provider>
                    </MenuItem>
                    <MenuItem onClick={handleSortClose}>
                      <IconContext.Provider
                        value={{ style: { color: 'inherit', fontSize: '2rem' } }}
                      >
                        <MdGroupWork />
                        <CategoryText>My Forums</CategoryText>
                      </IconContext.Provider>
                    </MenuItem>
                  </DropDown>
                </>
              </SortBar>
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
