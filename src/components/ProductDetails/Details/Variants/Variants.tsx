import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Panels from './Panels';
import { Wrapper } from './styles';

export interface VariantsProps {
    variants: any;
    color: any;
    onColorClicked: any;
    size: any;
    onSizeSelect: any;
    product: any;
  }

  const styles = theme => ({
    root: {
      width: '100%',
    },
  });


  const Variants: React.SFC<VariantsProps> = props => {
    const { classes, variants, color, onColorClicked, size, onSizeSelect, product } = props;
    return (
        <Wrapper className={classes.root}>
            <Panels product={product} variants={variants} color={color} onColorClicked={onColorClicked} size={size} onSizeSelect={onSizeSelect}/>
        </Wrapper>
    )

  }

  export default withStyles(styles)(Variants);
