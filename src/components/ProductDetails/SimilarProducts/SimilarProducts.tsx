import React from 'react';
import Typography from '@material-ui/core/Typography';
import ItemCaraosel from '../../itemsCaraosel/ItemCaraosel';
import ProductCard from '../../ProductCard/ProductCard';
import { Wrapper } from './styles';

const SimilarProducts: React.SFC<ProductDetailsProps> = (props) => {
    return (
      <Wrapper>
        <Typography variant="h4" align="center">
            Similar Products
        </Typography>
        <div style={{marginBottom: '50px'}}/>
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
        </ItemCaraosel>
      </Wrapper>
    )
}

export default SimilarProducts;