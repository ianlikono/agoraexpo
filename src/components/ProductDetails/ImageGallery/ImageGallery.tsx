import React, { useState } from 'react';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import { Wrapper, ImagesPreview, ActiveImage, DispayImage, PreviewsList, PreviewImage} from './styles';
import ItemCaraosel from '../../itemsCaraosel/ItemCaraosel';
import HorizontalCaraosel from '../../HorizontalCaraosel';

export interface ImageGalleryProps {
  // imageUrl = String;
}

const images = [
  "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1551672100-b66e9a488018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1517142337493-37b0ae97158d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1462410947786-0fee3fa72752?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1529153577221-859663ee9b28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1535013105891-95529e67b6fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1531469535976-c6fc3604014f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1515016689228-9c07b910c10c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1505390557090-7292a7776afe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
]

const ImageGallery: React.SFC<ImageGalleryProps> = props => {
  // const { shopName, productId } = props;


  const [activeImage, setActiveImage] = useState('https://images.unsplash.com/photo-1526485797145-514b2fe83749?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');

  const onImageClick = (image) => {
    console.log('clicked', image);
    setActiveImage(image);
  }

  const renderImages = (imageArray) => {
    return imageArray.map((image) => {
      return(
        <div key={image} onClick={() => onImageClick(image)} role="button">
          <PreviewImage src={image} />
        </div>
      )
    })
  }

  const matches = useMediaQuery('(min-width:900px)');


  return (
    <>
      <Wrapper>
        <ImagesPreview>
          <PreviewsList>
            {matches ? (
              <>
                {images.length > 3 ? (
                <HorizontalCaraosel>
                  <>
                  {renderImages(images)}
                  </>
                 </HorizontalCaraosel>
                ) : (
                  <>
                  {renderImages(images)}
                  </>
                )}
              </>
            ): (
              <>
                {images.length > 2 ? (
                <ItemCaraosel>
                  <>
                  {renderImages(images)}
                  </>
                 </ItemCaraosel>
                ) : (
                  <>
                  {renderImages(images)}
                  </>
                )}
               </>
            )}
          </PreviewsList>
        </ImagesPreview>
        <ActiveImage>
          <DispayImage src={activeImage} />
        </ActiveImage>
      </Wrapper>
    </>
  );
};

export default ImageGallery;
