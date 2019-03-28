import Typography from '@material-ui/core/Typography';
import React from 'react';
import PlusIcon from '../../PlusIcon/PlusIcon';
import ProductCard from '../../ProductCard/ProductCard';
import AddProductDialog from '../../AddProductsDialog/AddProductsDialog';


class AllProducts extends React.PureComponent {

  state = {
    modalOpen: true,
  };

  onPlusIconClick = () => {
    this .setState({
      modalOpen: true
    })
  }

  onModalClose = () => {
    console.log('closed clicked')
    this .setState({
      modalOpen: false
    })
  }

  render() {
    const { modalOpen } = this.state;
    console.log(modalOpen);
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
                    All Products{' '}
                </Typography>
                </div>
                <div onClick={this.onPlusIconClick}>
                <PlusIcon toolTipTitle="Add Products" fabSize="small" />
                </div>
                <AddProductDialog open={modalOpen} close={this.onModalClose}/>
            </div>
        </section>
        <section>
            <div className="products-wrapper">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
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
  }
}

export default AllProducts;
