import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Query } from 'react-apollo';
import { MeConsumer } from '../../../contexts/Me';
import { getShopProducts } from '../../../graphql/queries';
import AddProductDialog from '../../AddProductsDialog/AddProductsDialog';
import PlusIcon from '../../PlusIcon/PlusIcon';
import ProductCard from '../../ProductCard/ProductCard';
import { NoItems } from './styles';


class AllProducts extends React.PureComponent {

  state = {
    modalOpen: false,
  };


  onPlusIconClick = () => {
    this .setState({
      modalOpen: true
    })
  }

  renderAddProducts = (value, owners) => {
    const isShopOwner = value.isShopOwner(owners);
    return (
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
              <Typography variant="h2" align="center">
                  All Products{' '}
              </Typography>
              </div>
              {isShopOwner ? (
                <>
                  <div onClick={this.onPlusIconClick}>
                  <PlusIcon toolTipTitle="Add Products" fabSize="small" />
                  </div>
                  <AddProductDialog shopId={this.props.shopId} open={this.state.modalOpen} close={this.onModalClose}/>
                </>
              ) : null}
          </div>
      </section>
    )
  }

  renderProducts = (data) => {
    return data.getShopProducts.map((product) => {
      const { title, description, price, images, id } = product;
      return (
        <ProductCard key={id} id={id} title={title} description={description} price={price} image={images[0]} />
      )
    })
  }

  onModalClose = () => {
    this .setState({
      modalOpen: false
    })
  }

  render() {
    const { modalOpen } = this.state;
    const { shopId, owners } = this.props;
    return (
        <>
          <MeConsumer>
            {value => {
              return (
                  <Query query={getShopProducts} variables={{ shopId }}>
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if(data.getShopProducts.length <= 0) {
                          return (
                            <>
                              {this.renderAddProducts(value, owners)}
                              <NoItems>Sorry no products currently available</NoItems>
                            </>
                          )
                        }
                        // console.log(data);
                          return (
                          <>
                            {this.renderAddProducts(value, owners)}
                          <section>
                              <div className="products-wrapper">
                                { this.renderProducts(data) }
                              </div>
                          </section>
                          <style jsx>{`
                              .products-wrapper {
                                display: flex;
                                width: 80%;
                                justify-content: center;
                                margin: 0 auto;
                                flex-wrap: wrap;
                              }
                            `}</style>
                            </>
                            )
                        }}
                    </Query>
              )
          }}
          </MeConsumer>
        </>
    )
  }
}

export default AllProducts;
