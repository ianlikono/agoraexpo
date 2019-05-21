import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import ItemCaraosel from '../../itemsCaraosel/ItemCaraosel';
import ProductCard from '../../ProductCard/ProductCard';
import { NoItems } from './styles';


export const getShopProducts = gql`
  query getShopProducts($shopId: ID!, $limit: Int) {
    getShopProducts(shopId: $shopId, limit: $limit) {
      shop {
        owners {
          id
          username
        }
      }
      id
      title
      description
      price
      categories {
        id
        name
      }
      brand {
        id
        name
      }
      tags {
        id
        name
      }
      images {
        imageUrl
        largeImageUrl
      }
      variants {
        id
        name
        values
      }
    }
  }
`;


class SectionOne extends React.PureComponent {
  state = {};

  renderProducts = (data) => {
    return data.getShopProducts.map((product) => {
      const { title, description, price, images, id } = product;
      return (
        <ProductCard key={id} id={id} title={title} description={description} price={price} image={images[0]} />
      )
    })
  }


  render() {
    const { shopId } = this.props;
    return (
      <>
        <section>
          <div
            style={{
              marginTop: '10px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>
              <Typography variant="h4" align="center">
                Trending Products{' '}
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </Typography>
            </div>
          </div>
        </section>
        <section>
        <Query query={getShopProducts} variables={{ shopId, limit: 5 }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if(data.getShopProducts.length <= 0) {
                return (
                  <>
                    <NoItems>Sorry no Trending products currently available</NoItems>
                  </>
                )
              }
                return (
                  <>
                    <div>
                      <ItemCaraosel>
                      { this.renderProducts(data) }
                      </ItemCaraosel>
                    </div>
                    </>
                  )
              }}
          </Query>
        </section>
      </>
    );
  }
}

export default SectionOne;
