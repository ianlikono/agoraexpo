import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { FullName, UserAvatar, Username, Wrapper } from './styles';

export interface OverviewProps {
  classes: any;
  username: any;
}


const styles = theme => ({
  root: {
    marginRight: '1rem',
    cursor: 'pointer',
    width: '100%',
  },
});

function OverviewComponent(props: OverviewProps) {
  const { classes, username } = props;
  return (
    <>
      <Paper className={classes.root} elevation={1} >
        <Wrapper>
          <UserAvatar src="https://graph.facebook.com/1527077167426988/picture" />
          <FullName>Ian Likono</FullName>
          <Username>@Username</Username>
        </Wrapper>
      </Paper>
    </>
  );
}

export default withStyles(styles)(OverviewComponent);

