import Typography from '@material-ui/core/Typography';
import React from 'react';
import ItemCaraosel from '../../itemsCaraosel/ItemCaraosel';
import PlusIcon from '../../PlusIcon/PlusIcon';
import ProductCard from '../../ProductCard/ProductCard';

const Product = {
  id: 'b07c1424-c262-4cb8-855e-58573a909759',
  title: 'Product One',
  description: 'Best you will ever get',
  image:
    'https://images.unsplash.com/photo-1514560353475-9141afac0f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  largeImage:
    'https://images.unsplash.com/photo-1514560353475-9141afac0f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  price: 30,
};

class SectionOne extends React.PureComponent {
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
                Trending Products{' '}
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </Typography>
            </div>
            <div>
              <PlusIcon toolTipTitle="Add trending Products" fabSize="small" />
            </div>
          </div>
        </section>
        <section>
          <div>
            <ItemCaraosel>
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
            </ItemCaraosel>
          </div>
        </section>
      </>
    );
  }
}

export default SectionOne;
