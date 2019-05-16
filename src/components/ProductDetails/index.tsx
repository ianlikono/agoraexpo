/* eslint-disable import/no-unresolved */
import React from 'react';
import ProductDetails from './Details/Details';
import ImageGallery from './ImageGallery/ImageGallery';
import Reviews from './Reveiws/Reviews';
import SimilarProducts from './SimilarProducts/SimilarProducts';
import { Details, Gallery, Wrapper } from './styles';

export interface ProDuctDetailsProps {
  product: any;
  productId: any;
}

const ProDuctDetails: React.SFC<ProDuctDetailsProps> = props => {
  const { product, productId } = props;
  return (
    <>
      <Wrapper>
        <Gallery>
          <ImageGallery images={product.images} />
        </Gallery>
        <Details>
          <ProductDetails product={product} />
        </Details>
      </Wrapper>
      <SimilarProducts product={product} />
      <Reviews productId={productId} />
    </>
  );
};

export default ProDuctDetails;
