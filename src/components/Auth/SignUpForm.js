/* eslint-disable react/no-string-refs */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Router from 'next/router';
import React from 'react';
import { Mutation } from 'react-apollo';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { fire } from '../../../firebase';
import { signUp } from '../../graphql/mutations';
import { getMeQuery } from '../../graphql/queries';
import SocialAuth from './SocialAuth';

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
    fontSize: '2rem',
  },
});

class SignUpForm extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    submitDisabled: true,
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('passwordLength', value => {
      if (value.length < 6) {
        return false;
      }
      return true;
    });
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    const { email, password } = this.state;
    if (email.length > 0 && password.length >= 5 && this.state.name.length > 0) {
      this.setState({ submitDisabled: false });
    } else {
      this.setState({ submitDisabled: true });
    }
    this.setState({ [name]: value });
  };

  handleSignUpSubmit = async (signUpUser, error) => {
    const { email, password, name } = this.state;
    try {
      const response = await fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      const { email, isAnonymous, emailVerified } = response.user;
      fire
        .auth()
        .currentUser.getIdToken()
        .then(async idToken => {
          await signUpUser({
            variables: {
              name,
              email,
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
        .catch(function(error) {
          console.log('errior', error);
        });
    } catch (err) {
      console.log('err', err);
      error && console.log('mutation', error);
    }
  };

  render() {
    const { props } = this;

    const { classes } = props;
    const { email, password, name, submitDisabled } = this.state;
    return (
      <main className={classes.main}>
        <div>
          <Mutation mutation={signUp}>
            {(signUpUser, { loading, error }) => (
              <>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <SocialAuth />
                <Typography className={classes.title} component="h1" variant="h5">
                  Sign Up
                </Typography>
                <form className={classes.form}>
                  <ValidatorForm
                    ref="form"
                    onSubmit={() => this.handleSignUpSubmit(signUpUser, error)}
                    onError={errors => console.log(errors)}
                  >
                    <FormControl margin="normal" required fullWidth>
                      <TextValidator
                        id="name"
                        label="Full Name"
                        onChange={this.handleInputChange}
                        name="name"
                        value={name}
                        validators={['required']}
                        errorMessages={['this field is required']}
                      />
                    </FormControl>
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
                        validators={['required', 'passwordLength']}
                        errorMessages={[
                          'this field is required',
                          'password must be longer than six characters',
                        ]}
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
                      disabled={loading || submitDisabled}
                    >
                      Sign Up
                    </Button>
                  </ValidatorForm>
                </form>
              </>
            )}
          </Mutation>
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(SignUpForm);
