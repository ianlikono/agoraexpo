import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import ReactSVG from 'react-svg';
import { facebookProvider, fire, googleProvider } from '../../../firebase';
import { login, signUp } from '../../graphql/mutations';
import { getMeQuery } from '../../graphql/queries';
import AppSnackBar from '../Snack/AppSnackBar';
import { ButtonChildren } from './styles';

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
            await signUpUser({
              variables: {
                name,
                email,
                profilePic: picture,
                isAnonymous,
                emailVerified: verified_email,
                idToken,
              },
              refetchQueries: [
                {
                  query: getMeQuery,
                },
              ],
            });
            Router.back();
          })
          .catch(function (error: any) {
            console.log('errior', error);
          });
      } else {
        fire
          .auth()
          .currentUser.getIdToken()
          .then(async (idToken: any) => {
            await signInUser({
              variables: {
                idToken,
              },
              refetchQueries: [
                {
                  query: getMeQuery,
                },
              ],
            });
            Router.back();
          })
          .catch(function (error: any) {
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
            await signUpUser({
              variables: {
                name,
                email,
                profilePic: photoURL,
                isAnonymous,
                emailVerified,
                idToken,
              },
              refetchQueries: [
                {
                  query: getMeQuery,
                },
              ],
            });
            Router.back();
          })
          .catch(function (error: any) {
            console.log('errior', error);
          });
      } else {
        fire
          .auth()
          .currentUser.getIdToken()
          .then(async (idToken: any) => {
            await signInUser({
              variables: {
                idToken,
              },
              refetchQueries: [
                {
                  query: getMeQuery,
                },
              ],
            });
            Router.back();
          })
          .catch(function (error: any) {
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
                    {/* <IconSvg src={googleIcon} /> */}
                    <ReactSVG
                      src="https://res.cloudinary.com/doelo01na/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1558400354/static/google-icon.svg"
                      beforeInjection={svg => {
                        svg.classList.add('svg-class-name')
                        svg.setAttribute('style', 'height: 3rem')
                      }}
                      fallback={() => <span style={{ color: 'white' }}></span>}
                      loading={() => <span style={{ color: 'white' }}>..</span>}
                      renumerateIRIElements={false}
                      wrapper="span"
                      className="social-icon"
                    />
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
                    <ReactSVG
                      src="https://res.cloudinary.com/doelo01na/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1558400614/static/facebook-icon.svg"
                      beforeInjection={svg => {
                        svg.classList.add('svg-class-name')
                        svg.setAttribute('style', 'height: 3rem')
                      }}
                      fallback={() => <span style={{ color: 'white' }}></span>}
                      loading={() => <span style={{ color: 'white' }}>..</span>}
                      renumerateIRIElements={false}
                      wrapper="span"
                      className="social-icon"
                    />
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
