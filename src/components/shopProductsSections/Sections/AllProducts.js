import React from 'react';
import Typography from '@material-ui/core/Typography';
import PlusIcon from '../../PlusIcon/PlusIcon';
import ProductCard from '../../ProductCard/ProductCard';

class AllProducts extends React.PureComponent {
  state = {};

  render() {
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
                <div>
                <PlusIcon toolTipTitle="Add Products" fabSize="small" />
                </div>
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
