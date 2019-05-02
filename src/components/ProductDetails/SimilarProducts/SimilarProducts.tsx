import Typography from '@material-ui/core/Typography';
import React from 'react';
import ItemCaraosel from '../../itemsCaraosel/ItemCaraosel';
import ProductCard from '../../ProductCard/ProductCard';
import { Wrapper } from './styles';

export interface ProductDetailsProps {
  id: String;
  name: String;
}

const product = {
  id: 'b07c1424-c262-4cb8-855e-58573a909759',
  title: 'Product One',
  description: 'Best you will ever get',
  images:
    [{imageUrl: 'https://images.unsplash.com/photo-1514560353475-9141afac0f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}],
  price: 30,
};

const SimilarProducts: React.SFC<ProductDetailsProps> = (props) => {
    return (
      <Wrapper>
        <Typography variant="h4" align="center">
            Similar Products
        </Typography>
        <div style={{marginBottom: '50px'}}/>
        <ItemCaraosel>
            <ProductCard id={product.id}  title={product.title} description={product.description} price={product.price} image={product.images[0]} />
            <ProductCard id={product.id} title={product.title} description={product.description} price={product.price} image={product.images[0]} />
            <ProductCard id={product.id} title={product.title} description={product.description} price={product.price} image={product.images[0]} />
            <ProductCard id={product.id} title={product.title} description={product.description} price={product.price} image={product.images[0]} />
        </ItemCaraosel>
      </Wrapper>
    )
}

export default SimilarProducts;