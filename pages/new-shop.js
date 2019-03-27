import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import classNames from 'classnames';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { createShop } from '../src/graphql/mutations';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px`,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class CreateShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      description: '',
      open: true,
      successSnackBar: false,
      errorSnackBar: false,
    };
  }

  renderSnackBar = (snackItems, status) => {
    const { classes, variant , className, other, onClose, message } = snackItems;
    const Icon = variantIcon[variant];
    if(status === 'success') {
      variant = 'success'
      message = 'this is a success message'
    }
    return (
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  formSubmit = (func, error) => {
    console.log(func);
    console.log(error);
  };

  render() {
    const { name, category, description, open } = this.state;
    const { classes, className, message, onClose, variant, ...other } = this.props;
    const snackItems = { classes, variant, className, other, onClose, message };
    return (
      <Mutation mutation={gql(createShop)}>
        {(createShopFunction, { loading, error }) => (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center' }}>Create Shop</h1>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={open}
              autoHideDuration={6000}
              onClose={this.handleClose}
            >
              {this.renderSnackBar(snackItems, 'success')}
            </Snackbar>
            <Paper elevation={1} className={classes.paper}>
              <TextField
                onChange={this.handleInputChange}
                id="name"
                name="name"
                label="Shop Name"
                fullWidth
                value={name}
              />
              <TextField
                onChange={this.handleInputChange}
                id="category"
                name="category"
                label="Category"
                fullWidth
                value={category}
              />
              <TextField
                onChange={this.handleInputChange}
                id="description"
                name="description"
                label="Description"
                fullWidth
                rows={5}
                multiline
                value={description}
              />
              <Button
                onClick={() => this.formSubmit(createShopFunction, error)}
                disabled={loading}
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
              >
                Create
              </Button>
            </Paper>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(CreateShopPage);
