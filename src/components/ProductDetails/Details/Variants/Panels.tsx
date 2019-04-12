import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Color from './Color';
import Size from './Size';
import { Wrapper } from './styles';

export interface ColorProps {
    Panels: any;
    color: any;
    onColorClicked: any;
    size: any;
    onSizeSelect: any;
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
    const { classes, variants, color, onColorClicked , size, onSizeSelect} = props;
    const colorVariant = variants.filter((variant) => {
      return variant.name == "Color"
    })
    const SizeVariant = variants.filter((variant) => {
      return variant.name == "Size"
    })
    return (
        <Wrapper className={classes.root}>
            <Color variant={colorVariant} color={color} onColorClicked={onColorClicked}/>
            <Size variant={SizeVariant} size={size} onSizeSelect={onSizeSelect}/>
        </Wrapper>
    )

  }

  export default withStyles(styles)(Panels);
