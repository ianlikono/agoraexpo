import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
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
  purpleAvatar: {
    height: '8rem',
    width: '8rem',
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});

export interface UserCardProps {
  classes: any;
  profilePic: any;
  username: string;
  shops: Number;
}

function UserCard(props: UserCardProps) {
  const { classes, profilePic, username, shops } = props;
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
           {profilePic ? (<UserAvatar src={profilePic} />) : (<Avatar className={classes.purpleAvatar}>{username.charAt(0)}</Avatar>)}
            <UserNameText>{username}</UserNameText>
            <UserShops>{shops} Shops</UserShops>
            <div role="button">
              <Fab variant="extended" color="primary" aria-label="Add" className={classes.margin}>
                Profile
              </Fab>
            </div>
          </CardContent>
        </Paper>
      </Wrapper>
    </>
  );
}

export default withStyles(styles)(UserCard);
