import React from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { Wrapper, Gallery, Details} from './styles';

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
          This is the details section
        </Details>
      </Wrapper>
    </>
  );
};

export default ProDuctDetails;
