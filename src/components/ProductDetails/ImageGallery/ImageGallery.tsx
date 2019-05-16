import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import React, { useEffect, useState } from 'react';
import HorizontalCaraosel from '../../HorizontalCaraosel';
import ItemCaraosel from '../../itemsCaraosel/ItemCaraosel';
import { ActiveImage, DispayImage, ImagesPreview, PreviewImage, PreviewsList, Wrapper } from './styles';

export interface ImageGalleryProps {
  images: any;
}

const ImageGallery: React.SFC<ImageGalleryProps> = props => {
  const { images } = props;

  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    setActiveImage(images[0].imageUrl)
  }, [])

  const onImageClick = (image) => {
    setActiveImage(image);
  }

  const renderImages = (imageArray) => {
    return imageArray.map((image) => {
      return(
        <div key={image.imageUrl} onClick={() => onImageClick(image.imageUrl)} role="button">
          <PreviewImage src={image.imageUrl} />
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
