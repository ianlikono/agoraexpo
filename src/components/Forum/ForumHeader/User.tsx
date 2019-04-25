import { Avatar, Button, MenuItem, withStyles } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import Router from 'next/router';
import React, { useRef } from 'react';
import { Mutation, Query } from 'react-apollo';
import { fire } from '../../../../firebase';
import { logoutMutation } from '../../../graphql/mutations';
import { getMeQuery } from '../../../graphql/queries';
import DropDown from '../../DropDown';
import { CategoryText } from './styles';

export interface UserProps {
  classes: any;
}

const styles = theme => ({
  avatar: {
    margin: 10,
    cursor: 'pointer',
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
    cursor: 'pointer',
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
});

function User (props: UserProps) {
  const { classes } = props;

  const anchorEl = useRef(null);
  const [open, setOpen] = React.useState(false);

  function handlePopupToggle() {
    setOpen(!open);
  }

  function handlePopup(event: any) {
    console.log('clicked', open)
    // @ts-ignore
    if (anchorEl.current.contains(event.target)) {
      return;
    }
    console.log(event)

     setOpen(false);
  }

  function handleProfileClick(userId: any) {
    Router.push({
      pathname: '/profile',
      query: { id: userId },
    });
  }

  const handleLogoutClick = async (logout) => {
    fire
      .auth()
      .signOut()
      .then(
        async function() {
          const response = await logout({
            refetchQueries: [
              {
                query: getMeQuery,
              },
            ],
          });
          console.log(response);
        },
        function(error2) {
          console.log(error2);
        }
      );
      setOpen(!open);
  };


  const renderUserAvatar = (data, logout) => {
    if (data.me) {
      return data.me.profilePic ? (
        <div  role="button">
          <div role="button" ref={anchorEl} aria-owns={open ? 'menu-list-grow' : undefined} aria-haspopup="true"
        onClick={handlePopupToggle}>
            <Avatar  alt="My Prof" src={data.me.profilePic} className={classes.avatar} />
          </div>
          <DropDown anchorEl={anchorEl} handlePopupClose={handlePopup} open={open}>

                <MenuItem onClick={() => handleProfileClick(data.me.id)}>
                  <CategoryText>Profile</CategoryText>
                </MenuItem>


                <MenuItem onClick={() => handleLogoutClick(logout)}>
                  <CategoryText>Logout</CategoryText>
                </MenuItem>

          </DropDown>
        </div>
      ) : (
        <div  role="button">
          <div role="button" ref={anchorEl} aria-owns={open ? 'menu-list-grow' : undefined} aria-haspopup="true"
          onClick={handlePopupToggle}>
            <Avatar className={classes.purpleAvatar}>{data.me.username.charAt(0)}</Avatar>
          </div>
          <DropDown anchorEl={anchorEl} handlePopupClose={handlePopup} open={open}>

                <MenuItem onClick={() => handleProfileClick(data.me.id)}>
                  <CategoryText>Profile</CategoryText>
                </MenuItem>


                <MenuItem onClick={() => handleLogoutClick(logout)}>
                  <CategoryText>Logout</CategoryText>
                </MenuItem>

          </DropDown>
        </div>
      );
    }
    return (
      <Button
        onClick={() => Router.push('/auth')}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Login
      </Button>
    );
  };

  return (
    <>
      <Query query={getMeQuery}>
        {({ loading, error, data }) => {
          if (loading) return '...';
          if (error) return null;
          console.log(data);
          return (
            <>
               <Mutation mutation={logoutMutation}>
                {(logout, { loading, error }) => (
                  <>
                    {renderUserAvatar(data, logout)}
                  </>
              )}
              </Mutation>
            </>
          )
        }}
        </Query>
    </>
  );
}

export default withStyles(styles)(User);
