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
  details: any;
}

const ProductDetails: React.SFC<ProductDetailsProps> = (props) => {
  const { classes } = props;
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
        New Sonic Bomb Sonic Bomb Alarm Clock Turbo charged loud Built-in alert lights Adjustable volume
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
        2560*1600 IPS Screen 11.6\ Inch Ten Core 6G+16G/32G/64G Arge Android 7.1 WiFi Tablet PC Dual SIM Dual Camera Rear 13.0MP IPS Bluetooth MTK6797 4G WiFi Call Phone Tablet Gifts Tablet-PC
        </Typography>
      </DescriptionWrapper>
      <VariantWrapper>
        <Variants />
      </VariantWrapper>
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

