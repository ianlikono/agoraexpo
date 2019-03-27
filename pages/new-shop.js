import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px`,
  },
  container: {
    maxWidth: '200px',
  },
});

class CreateShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      description: '',
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  formSubmit = () => {
    console.log(this.state);
  };

  render() {
    const classes = this.props;
    const { name, category, description } = this.state;
    return (
      <React.Fragment>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center' }}>Create Shop</h1>
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
              onClick={this.formSubmit}
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
            >
              Create
            </Button>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CreateShop);
