import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { IconContext } from "react-icons";
import { IoLogoFacebook, IoLogoLinkedin, IoLogoReddit, IoLogoTwitter } from 'react-icons/io';
import { FacebookShareButton, LinkedinShareButton, RedditShareButton, TwitterShareButton } from 'react-share';
import { addItemToCart } from '../../../graphql/mutations';
import { getMeCart } from '../../../graphql/queries';
import { ButtonsWrapper, DescriptionWrapper, HeaderTitle, ProductDescription, ShareIcon, ShareIconsWrapper, VariantWrapper, Wrapper } from './styles';
import Variants from './Variants/Variants';


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
    color: '#fff',
  },
});


export interface ProductDetailsProps {
  product: any;
  classes: any;
}

const ProductDetails: React.SFC<ProductDetailsProps> = (props) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');


  const onSizeSelect = size => {
    setSelectedSize(size);
  };

  const onColorClicked = color => {
    setSelectedColor(color);
  };

  const onAddToCartClick = async (product, addItem) => {
    await addItem({
      variables: {
        productId: product.id,
        quantity: 1,
        variants: [selectedSize, selectedColor]
      },
      refetchQueries: [
        {
          query: getMeCart,
        }
      ]
    })
  }
  const { classes, product } = props;
  const twitterHashTag = ["agoraexpo"]
  return (
    <Wrapper>
      <ShareIconsWrapper>
        <ShareIcon>
          <FacebookShareButton url={`https://agoraexpo.com/product/${product.id}`} hashtag="#agoraexpo">
            <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '30px' } }}>
              <IoLogoFacebook />
            </IconContext.Provider>
          </FacebookShareButton>
        </ShareIcon>
        <ShareIcon>
          <TwitterShareButton url={`https://agoraexpo.com/product/${product.id}`}>
            <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '30px' } }}>
              <IoLogoTwitter />
            </IconContext.Provider>
          </TwitterShareButton>
        </ShareIcon>
        <ShareIcon>
          <RedditShareButton url={`https://agoraexpo.com/product/${product.id}`} title={product.title}>
            <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '30px' } }}>
              <IoLogoReddit />
            </IconContext.Provider>
          </RedditShareButton>
        </ShareIcon>
        <ShareIcon>
          <LinkedinShareButton url={`https://agoraexpo.com/product/${product.id}`}>
            <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '30px' } }}>
              <IoLogoLinkedin />
            </IconContext.Provider>
          </LinkedinShareButton>
        </ShareIcon>
      </ShareIconsWrapper>
      <HeaderTitle>
        <Typography variant="h2">
          {product.title}
        </Typography>
      </HeaderTitle>
      <DescriptionWrapper>
        <ProductDescription>
          {product.description}
        </ProductDescription>
      </DescriptionWrapper>
      <VariantWrapper>
        <Variants color={selectedColor} onColorClicked={onColorClicked} size={selectedSize} onSizeSelect={onSizeSelect} variants={product.variants} />
      </VariantWrapper>
      <h2 style={{ alignSelf: 'end' }}>
        ${product.price}
      </h2>
      <Mutation mutation={addItemToCart}>
        {(addItem, { data }) => (
          <ButtonsWrapper>
            <Fab onClick={() => onAddToCartClick(product, addItem)} variant="extended" color="primary" aria-label="Add" className={classes.margin}>         Add To Cart
            </Fab>
          </ButtonsWrapper>
        )}
      </Mutation>
    </Wrapper>
  );
};

export default withStyles(styles)(ProductDetails);

