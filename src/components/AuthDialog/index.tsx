import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Link from 'next/link';
import React from 'react';
import Auth from '../../../pages/auth';

export interface AuthDialogProps {
  open: any;
  close: any;
  classes: any;
}

const styles = theme => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  text: {
    margin: '0 auto'
  }
})

function AuthDialog(props: AuthDialogProps) {
  const { open, close, classes } = props;

  function Transition(props: any) {
    return <Slide direction="up" {...props} />;
  }

  return (
    <>
      <Dialog fullScreen open={open} onClose={close} TransitionComponent={Transition}>
        <AppBar position="static">
          <Toolbar>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Link href="/">
                <a>
                  <Typography className={classes.title} variant="h2" color="inherit" noWrap>
                    AgoraExpo
                  </Typography>
                </a>
              </Link>
              <Typography align="center" className={classes.text} variant="h4" color="inherit" noWrap>
                Please SignIn to continue
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Auth />
      </Dialog>
    </>
  );
}

export default withStyles(styles)(AuthDialog);
