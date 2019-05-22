import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import PlusIcon from '../PlusIcon/PlusIcon';
import Search from './Search';

export interface GuestProps {
  classes: any;
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  fab: {
    margin: theme.spacing.unit * 0.05,
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    alignItems: 'center',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

function Guest(props: GuestProps) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleMobileMenuClose(type) {
    setMobileMoreAnchorEl(null)
  };

  function handleMenuClose() {
    setAnchorEl(null)
    //@ts-ignore
    handleMobileMenuClose();
  };

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget)
  };

  function renderMobileMenu() {
    return (
      <div>
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <Button
              onClick={() => Router.push('/auth')}
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Login
          </Button>
          </MenuItem>
        </Menu>
      </div>
    );
  }
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link href="/">
              <a>
                <Typography className={classes.title} variant="h2" color="inherit" noWrap>
                  AgoraExpo
                </Typography>
              </a>
            </Link>
            <Search />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link href="/new-shop">
                <a>
                  <PlusIcon toolTipTitle="Create Shop" fabSize="small" />
                </a>
              </Link>
              <Button
                onClick={() => Router.push('/auth')}
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Login
              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu()}
      </div>
    </>
  );
}
export default withStyles(styles)(Guest);
