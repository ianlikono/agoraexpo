import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { CardContent, UserAvatar, UserNameText, UserShops, Wrapper } from './styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: 0,
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    borderRadius: '50px',
    minHeight: 300,
    minWidth: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  margin: {
    margin: theme.spacing.unit,
    fontSize: '1.2rem',
    height: '3rem',
    marginTop: '1rem',
  },
});

export interface UserCardProps {
  classes: any;
}

function UserCard(props: UserCardProps) {
  const { classes } = props;
  const [cardElevation, setCardElevation] = useState(2);

  const onMouseLeave = () => {
    setCardElevation(2);
  };
  const onMouseEnter = () => {
    setCardElevation(6);
  };
  return (
    <>
      <Wrapper onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
        <Paper className={classes.root} elevation={cardElevation}>
          <CardContent>
            <UserAvatar src="https://images.unsplash.com/photo-1495307299410-57b5ba03852b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
            <UserNameText>Ian Likono</UserNameText>
            <UserShops>3 Shops</UserShops>
            <div role="button">
              <Fab variant="extended" color="primary" aria-label="Add" className={classes.margin}>
                Follow
              </Fab>
            </div>
          </CardContent>
        </Paper>
      </Wrapper>
    </>
  );
}

export default withStyles(styles)(UserCard);
