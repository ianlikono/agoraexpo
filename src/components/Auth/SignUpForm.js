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
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

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
});

class SignUpForm extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
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
    this.setState({ [name]: value });
  };

  handleSignUpSubmit = () => {
    // your submit logic
  };

  render() {
    const { props } = this;

    const { classes } = props;
    const { email, password, name } = this.state;
    return (
      <main className={classes.main}>
        <div>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form}>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSignUpSubmit}
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
              >
                Sign Up
              </Button>
            </ValidatorForm>
          </form>
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(SignUpForm);
