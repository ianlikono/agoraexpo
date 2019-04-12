import React, {useState} from 'react';
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io';
import { IconContext } from "react-icons";
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import  Rating  from 'material-ui-rating';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Mutation } from 'react-apollo';
import { Wrapper, ShareIconsWrapper, ShareIcon, HeaderTitle, DescriptionWrapper, RatingsWrapper, VariantWrapper, ButtonsWrapper } from './styles';
import Variants from './Variants/Variants';
import { addItemToCart } from '../../../graphql/mutations';
import { getMeCart } from '../../../graphql/queries';


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
    color: '#fff',
  },
});


export interface ProductDetailsProps {
  product: any;
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
  return (
    <Wrapper>
      <ShareIconsWrapper>
        <ShareIcon>
          <IconContext.Provider value={{ style: {color: 'inherit', fontSize: '30px'} }}>
            <IoLogoFacebook />
          </IconContext.Provider>
        </ShareIcon>
      <ShareIcon>
        <IconContext.Provider value={{ style: {color: 'inherit', fontSize: '30px'} }}>
          <IoLogoTwitter />
        </IconContext.Provider>
      </ShareIcon>
      <ShareIcon>
        <IconContext.Provider value={{ style: {color: 'inherit', fontSize: '30px'} }}>
          <IoLogoInstagram />
        </IconContext.Provider>
      </ShareIcon>
      <ShareIcon>
        <IconContext.Provider value={{ style: {color: 'inherit', fontSize: '30px'} }}>
          <IoLogoLinkedin />
        </IconContext.Provider>
      </ShareIcon>
      </ShareIconsWrapper>
      <HeaderTitle>
        <Typography variant="h5">
        {product.title}
        </Typography>
      </HeaderTitle>
      <RatingsWrapper>
        <Rating
            value={3}
            max={5}
            onChange={(value) => console.log(`Rated with value ${value}`)}
          />
          <Typography component="p"> 3.8 (328 reviews)</Typography>
      </RatingsWrapper>
      <DescriptionWrapper>
        <Typography component="p">
        {product.description}
        </Typography>
      </DescriptionWrapper>
      <VariantWrapper>
        <Variants color={selectedColor} onColorClicked={onColorClicked} size={selectedSize} onSizeSelect={onSizeSelect} variants={product.variants} />
      </VariantWrapper>
        <h2 style={{alignSelf: 'end'}}>
            ${product.price}
        </h2>
        <Mutation mutation={addItemToCart}>
          {(addItem, { data }) => (
              <ButtonsWrapper>
                <Fab onClick={() => onAddToCartClick(product, addItem)} variant="extended" color="primary" aria-label="Add" className={classes.margin}>         Add To Cart
                </Fab>
              <Fab variant="extended" color="secondary" aria-label="Add" className={classes.margin}>         Add To Wishlist
                </Fab>
              </ButtonsWrapper>
            )}
      </Mutation>
    </Wrapper>
   );
};

export default withStyles(styles)(ProductDetails);

