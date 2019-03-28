import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: 0,
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    paddingBottom: theme.spacing.unit * 2,
    borderRadius: '50px',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class ProductCard extends React.PureComponent {
  state = {
    cardElevation: 2,
  };

  onMouseEnter = () => {
    this.setState({
      cardElevation: 6,
    });
  };

  onMouseLeave = () => {
    this.setState({
      cardElevation: 2,
    });
  };

  render() {
    const { classes } = this.props;
    const { cardElevation } = this.state;
    return (
      <>
        <div
          onMouseLeave={this.onMouseLeave}
          onMouseEnter={this.onMouseEnter}
          className="main-card"
          style={{
            minWidth: '250px',
            borderRadius: '50px',
            maxWidth: '250px',
            margin: '0px 35px 0px 35px',
            marginBottom: '20px',
          }}
        >
          <Paper className={classes.root} elevation={cardElevation}>
            <div style={{ height: '70%', width: '100%' }}>
              <img
                style={{ height: '100%', width: '100%', borderRadius: '50px' }}
                src="https://images.unsplash.com/photo-1519415943484-9fa1873496d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              />
            </div>
            <div style={{ marginTop: '10px', paddingLeft: '24px' }}>
              <Typography variant="h4">Magic Leap One</Typography>
            </div>
            <div
              style={{
                marginTop: '10px',
                paddingLeft: '24px',
                textAlign: 'center',
                paddingRight: '24px',
              }}
            >
              <Typography component="p">
                women's seven assorted-color footwear on surface
              </Typography>
            </div>
            <div
              style={{
                backgroundColor: '#f2ebea',
                margin: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 600, marginLeft: '10px' }}>$500</span>
              <Button variant="contained" color="primary" className={classes.button}>
                Add To Cart
              </Button>
            </div>
          </Paper>
          <style jsx>{`
            .main-card {
              cursor: pointer;
            }
          `}</style>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(ProductCard);
