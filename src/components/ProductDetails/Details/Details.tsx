import React from 'react';
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io';
import { IconContext } from "react-icons";
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import  Rating  from 'material-ui-rating';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Wrapper, ShareIconsWrapper, ShareIcon, HeaderTitle, DescriptionWrapper, RatingsWrapper, VariantWrapper, ButtonsWrapper } from './styles';
import Variants from './Variants/Variants';

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
        <Variants variants={product.variants} />
      </VariantWrapper>
        <h2 style={{alignSelf: 'end'}}>
            ${product.price}
        </h2>
      <ButtonsWrapper>
        <Fab variant="extended" color="primary" aria-label="Add" className={classes.margin}>         Add To Cart
        </Fab>
      <Fab variant="extended" color="secondary" aria-label="Add" className={classes.margin}>         Add To Wishlist
        </Fab>
      </ButtonsWrapper>
    </Wrapper>
   );
};

export default withStyles(styles)(ProductDetails);

