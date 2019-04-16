/* eslint-disable react/no-string-refs */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import firebase from 'firebase/app';
import { Mutation } from 'react-apollo';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Snackbar from '@material-ui/core/Snackbar';
import { fire } from '../../../firebase';
import { login } from '../../graphql/mutations';
import SocialAuth from './SocialAuth';
import AppSnackBar from '../Snack/AppSnackBar';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  avatar: {
    // margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    margin: '0 auto',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  title: {
    marginTop: 20,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    buttonInActive: true,
    loginError: false,
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    const { email, password } = this.state;
    if (email.length > 0 && password.length > 0) {
      this.setState({ buttonInActive: false });
    } else {
      this.setState({ buttonInActive: true });
    }
    this.setState({ [name]: value });
  };

  handleLoginSubmit = async signInUser => {
    const { email, password } = this.state;
    try {
      const response = await fire.auth().signInWithEmailAndPassword(email, password);
      fire
        .auth()
        .currentUser.getIdToken()
        .then(async idToken => {
          const myRes = await signInUser({
            variables: {
              idToken,
            },
          });
          console.log(myRes);
        })
        .catch(function(error) {
          console.log('errior', error);
        });
    } catch (err) {
      setAuthError(true);
      setErrorMessage(err.message);
      error && setErrorMessage('Ooops Sorry! Something Went Wrong!');
      this.setState({ loginError: true });
    }
  };

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ loginError: false });
  };

  render() {
    const { props } = this;

    const { classes } = props;
    const { email, password, buttonInActive, loginError } = this.state;

    return (
      <main className={classes.main}>
        <Mutation mutation={login}>
          {(signInUser, { data }) => (
            <>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={loginError}
                autoHideDuration={10000}
                onClose={this.handleSnackClose}
              >
                <AppSnackBar
                  onClose={this.handleSnackClose}
                  variant="error"
                  className={classes.margin}
                  message="Invalid Credentials Please Try Again!"
                />
              </Snackbar>
              <SocialAuth />
              <Typography className={classes.title} component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form}>
                <ValidatorForm
                  ref="form"
                  onSubmit={() => this.handleLoginSubmit(signInUser)}
                  onError={() => this.setState({ buttonInActive: true })}
                >
                  <FormControl margin="normal" required fullWidth>
                    <TextValidator
                      id="email"
                      label="Email"
                      onChange={this.handleInputChange}
                      name="email"
                      value={email}
                      validators={['required', 'isEmail']}
                      errorMessages={['this field is required', 'email is not valid']}
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <TextValidator
                      id="password"
                      label="Password"
                      onChange={this.handleInputChange}
                      name="password"
                      type="password"
                      validators={['required']}
                      errorMessages={['this field is required']}
                      value={password}
                    />
                  </FormControl>

                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={buttonInActive}
                  >
                    Sign in
                  </Button>
                </ValidatorForm>
              </form>
            </>
          )}
        </Mutation>
      </main>
    );
  }
}

export default withStyles(styles)(LoginForm);
