import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Query } from 'react-apollo';
import { similarProducts } from '../../../graphql/queries';
import ItemCaraosel from '../../itemsCaraosel/ItemCaraosel';
import ProductCard from '../../ProductCard/ProductCard';
import { Wrapper } from './styles';

export interface ProductDetailsProps {
  product: any;
}

const SimilarProducts: React.SFC<ProductDetailsProps> = (props) => {
  const { product } = props;

    function renderSimilarProducts(data: any){
      return data.similarProducts.map((product) => {
        const { title, description, price, images, id } = product;
        return (
          <ProductCard key={id} id={id} title={title} description={description} price={price} image={images[0]} />
        )
      })
    }
    return (
      <Wrapper>
        <Typography variant="h4" align="center">
            Similar Products
        </Typography>
        <div style={{marginBottom: '50px'}}/>
        <Query query={similarProducts} variables={{ brandName: product.brand.name, categories: product.categories.map((category: { name: any; }) => category.name), tags: product.tags.map((tag: { name: any; }) => tag.name) }}>
          {({loading, error, data}) => {
            if (loading) return 'Loading...';
            if(error) return null;
            if(data.similarProducts.length > 0) {
              return (
                  <>
                    <ItemCaraosel>
                      {renderSimilarProducts(data)}
                    </ItemCaraosel>
                  </>
                )
            } else {
              return null;
            }
          }}
        </Query>
      </Wrapper>
    )
}

export default SimilarProducts;