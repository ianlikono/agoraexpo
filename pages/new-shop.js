import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import SnackBarContentWrapper from '../src/components/snackbar/SnackBarContent';
import { createShop, createShopOwner } from '../src/graphql/mutations';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class CreateShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      description: '',
      successSnackBar: false,
      errorSnackBar: false,
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ errorSnackBar: false, successSnackBar: false });
  };

  formSubmit = async (createShopFunction, createShopOwnerFunction, error, error2) => {
    const { name, category, description } = this.state;
    if (name === '' || category === '' || description === '') {
      this.setState({ errorSnackBar: true });
    } else {
      const response = await createShopFunction({
        variables: {
          input: {
            name,
            category,
            description,
          },
        },
      });
      // TODO: change user ID
      const finalResponse = await createShopOwnerFunction({
        variables: {
          input: {
            shopOwnerShopId: response.data.createShop.id,
            shopOwnerOwnerId: '2f62d41b-9e70-492e-9479-a6057f99a524',
          },
        },
      });
      this.setState({ successSnackBar: true });
      Router.push({
        pathname: '/shop',
        query: { id: finalResponse.data.createShopOwner.shop.id },
      });
    }
  };

  render() {
    const { name, category, description, successSnackBar, errorSnackBar } = this.state;
    const { classes, className, message, onClose, variant, ...other } = this.props;
    const snackItems = { classes, variant, className, other, onClose, message };
    return (
      <Mutation mutation={gql(createShop)}>
        {(createShopFunction, { loading, error }) => (
          <Mutation mutation={gql(createShopOwner)}>
            {(createShopOwnerFunction, { loading2, error2 }) => (
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center' }}>Create Shop</h1>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'Right',
                  }}
                  open={successSnackBar}
                  autoHideDuration={6000}
                  onClose={this.handleClose}
                >
                  <SnackBarContentWrapper
                    onClose={this.handleSnackBarClose}
                    variant="success"
                    message="Created Successfully!"
                  />
                </Snackbar>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'Right',
                  }}
                  open={errorSnackBar}
                  autoHideDuration={6000}
                  onClose={this.handleClose}
                >
                  <SnackBarContentWrapper
                    onClose={this.handleSnackBarClose}
                    variant="error"
                    message="Please make sure all the fields are filled!!!"
                  />
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
                    onClick={() =>
                      this.formSubmit(createShopFunction, createShopOwnerFunction, error, error2)
                    }
                    disabled={loading || loading2}
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
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(CreateShopPage);
