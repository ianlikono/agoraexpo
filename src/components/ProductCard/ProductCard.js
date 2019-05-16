import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import truncate from 'lodash/truncate';
import Link from 'next/link';
import React from 'react';
import { Mutation } from 'react-apollo';
import { addItemToCart } from '../../graphql/mutations';
import { getMeCart } from '../../graphql/queries';
import { ContentTitle, DescriptionContent } from './styles';

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

  onAddToCartClick = async (id, addItem) => {
    await addItem({
      variables: {
        productId: id,
        quantity: 1,
      },
      refetchQueries: [
        {
          query: getMeCart,
        }
      ]
    })
  }

  render() {
    const { classes } = this.props;
    const { cardElevation } = this.state;
    const { title, description, price, image, id } = this.props;
    return (
      <>
        <div
          onMouseLeave={this.onMouseLeave}
          onMouseEnter={this.onMouseEnter}
          className="main-card"
          style={{
            minWidth: '300px',
            borderRadius: '50px',
            maxWidth: '350px',
            margin: '0px 35px 0px 35px',
            marginBottom: '20px',
          }}
        >
          <Paper className={classes.root} elevation={cardElevation}>
            <Link href={`/product/${id}`}>
              <a>
                <div style={{ height: '70%', width: '100%' }}>
                  <img
                    style={{ height: '25rem', width: '100%', borderRadius: '50px',  objectFit: 'cover' }}
                    src={image.imageUrl}
                  />
                </div>
                <div style={{ marginTop: '10px', paddingLeft: '24px' }}>
                  <ContentTitle>
                    {truncate(title, {
                      length: 40,
                      separator: ' ',
                    })}
                  </ContentTitle>
                </div>
                <div
                  style={{
                    marginTop: '10px',
                    paddingLeft: '24px',
                    textAlign: 'center',
                    paddingRight: '24px',
                  }}
                >
                  <DescriptionContent>
                  {truncate(description, {
                      length: 100,
                      separator: ' ',
                      'omission': ' [...]'
                    })}
                  </DescriptionContent>
                </div>
              </a>
            </Link>
            <div
              style={{
                backgroundColor: '#f2ebea',
                margin: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 600, marginLeft: '10px' }}>${price}</span>
              <Mutation mutation={addItemToCart}>
                {(addItem, { data }) => (
                    <Button size="large" onClick={() => this.onAddToCartClick(id, addItem)} variant="contained" color="primary" className={classes.button}>
                      Add To Cart
                    </Button>
              )}
              </Mutation>
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
