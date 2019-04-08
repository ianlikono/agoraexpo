/* eslint-disable import/no-unresolved */
import React from 'react';
import ProductDetails from './Details/Details';
import ImageGallery from './ImageGallery/ImageGallery';
import { Details, Gallery, Wrapper } from './styles';
import SimilarProducts from './SimilarProducts/SimilarProducts';

export interface ProDuctDetailsProps {
  shopName: String;
  productId: String;
}

const ProDuctDetails: React.SFC<ProDuctDetailsProps> = props => {
  // const { shopName, productId } = props;
  return (
    <>
      <Wrapper>
        <Gallery>
          <ImageGallery />
        </Gallery>
        <Details>
          <ProductDetails details="details" />
        </Details>
      </Wrapper>
      <SimilarProducts />
    </>
  );
};

export default ProDuctDetails;
