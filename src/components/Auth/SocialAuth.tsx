import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';
import Snackbar from '@material-ui/core/Snackbar';
import 'firebase/auth';
// @ts-ignore
import googleIcon from '../../../static/google-icon.svg';
// @ts-ignore
import facebookIcon from '../../../static/facebook-icon.svg';
import { ButtonChildren, IconSvg } from './styles';
import { facebookProvider, fire, googleProvider } from '../../../firebase';
import { signUp, login } from '../../graphql/mutations';
import AppSnackBar from '../Snack/AppSnackBar';

// @ts-ignore
const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

const SocialAuth: React.SFC = props => {
  // @ts-ignore
  const { classes } = props;

  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onGoogleClicked = async (signUpUser, signInUser, error, error2) => {
    try {
      const response = await fire.auth().signInWithPopup(googleProvider);
      if (response.additionalUserInfo.isNewUser) {
        const { name, email, picture, verified_email } = response.additionalUserInfo.profile;
        const { isAnonymous } = response.user;
        fire
          .auth()
          .currentUser.getIdToken()
          .then(async (idToken: any) => {
            const myRes = await signUpUser({
              variables: {
                name,
                email,
                profilePic: picture,
                isAnonymous,
                emailVerified: verified_email,
                idToken,
              },
            });
            console.log(myRes);
          })
          .catch(function(error: any) {
            console.log('errior', error);
          });
      } else {
        fire
          .auth()
          .currentUser.getIdToken()
          .then(async (idToken: any) => {
            const myRes = await signInUser({
              variables: {
                idToken,
              },
            });
            console.log(myRes);
          })
          .catch(function(error: any) {
            console.log('errior', error);
          });
      }
    } catch (err) {
      setAuthError(true);
      setErrorMessage(err.message);
      error && setErrorMessage('Ooops Sorry! Something Went Wrong!');
    }
  };

  const onFacebookClicked = async (signUpUser, signInUser, error, error2) => {
    try {
      const response = await fire.auth().signInWithPopup(facebookProvider);
      if (response.additionalUserInfo.isNewUser) {
        const { name, email } = response.additionalUserInfo.profile;
        const { isAnonymous, emailVerified, photoURL } = response.user;
        fire
          .auth()
          .currentUser.getIdToken()
          .then(async (idToken: any) => {
            const myRes = await signUpUser({
              variables: {
                name,
                email,
                profilePic: photoURL,
                isAnonymous,
                emailVerified,
                idToken,
              },
            });
            console.log(myRes);
          })
          .catch(function(error: any) {
            console.log('errior', error);
          });
      } else {
        fire
          .auth()
          .currentUser.getIdToken()
          .then(async (idToken: any) => {
            const myRes = await signInUser({
              variables: {
                idToken,
              },
            });
            console.log(myRes);
          })
          .catch(function(error: any) {
            console.log('errior', error);
          });
      }
    } catch (err) {
      setAuthError(true);
      setErrorMessage(err.message);
      error && setErrorMessage('Ooops Sorry! Something Went Wrong!');
    }
  };

  const handleSnackClose = () => {
    setAuthError(false);
  };

  return (
    <Mutation mutation={signUp}>
      {(signUpUser, { loading, error }) => (
        <>
          <Mutation mutation={login}>
            {(signInUser, { loading2, error2 }) => (
              <>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={authError}
                  autoHideDuration={60000}
                  onClose={handleSnackClose}
                >
                  <AppSnackBar
                    onClose={handleSnackClose}
                    variant="error"
                    className={classes.margin}
                    message={errorMessage}
                  />
                </Snackbar>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => onGoogleClicked(signUpUser, signInUser, error, error2)}
                  disabled={loading || loading2}
                >
                  <ButtonChildren>
                    <IconSvg src={googleIcon} />
                    Continue with google
                  </ButtonChildren>
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => onFacebookClicked(signUpUser, signInUser, error, error2)}
                  disabled={loading || loading2}
                >
                  <ButtonChildren>
                    <IconSvg src={facebookIcon} />
                    Continue with Facebook
                  </ButtonChildren>
                </Button>
              </>
            )}
          </Mutation>
        </>
      )}
    </Mutation>
  );
};

export default withStyles(styles)(SocialAuth);
