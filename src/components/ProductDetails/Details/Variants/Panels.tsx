import { withStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { MeContext } from '../../../../contexts/Me';
import Color from './Color';
import Size from './Size';
import { Wrapper } from './styles';

export interface PanelsProps {
  Panels: any;
  color: any;
  onColorClicked: any;
  size: any;
  onSizeSelect: any;
  product: any;
  variants: any;
  classes: any;
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  column: {
    flexBasis: '33.33%',
    marginRight: '20px',
  },
});

const Panels: React.SFC<PanelsProps> = props => {
  const { classes, variants, color, onColorClicked, size, onSizeSelect, product } = props;
  const {me, isShopOwner} = useContext(MeContext);
  const userIsShopOwner = isShopOwner(product.shop.owners)
  const colorVariant = variants.filter(variant => {
    return variant.name == 'Color';
  });
  const SizeVariant = variants.filter(variant => {
    return variant.name == 'Size';
  });
  return (
    <Wrapper className={classes.root}>
      <Color userIsShopOwner={userIsShopOwner} product={product} variant={colorVariant} color={color} onColorClicked={onColorClicked} />
      <Size userIsShopOwner={userIsShopOwner} variant={SizeVariant} size={size} onSizeSelect={onSizeSelect} />
    </Wrapper>
  );
};

export default withStyles(styles)(Panels);
