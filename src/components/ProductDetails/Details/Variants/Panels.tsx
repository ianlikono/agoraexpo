import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Wrapper } from './styles';
import Color from './Color';
import Size from './Size';

export interface ColorProps {
    Panels: any;
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
    const { classes, variants } = props;
    const colorVariant = variants.filter((variant) => {
      return variant.name == "Color"
    })
    const SizeVariant = variants.filter((variant) => {
      return variant.name == "Size"
    })
    return (
        <Wrapper className={classes.root}>
            <Color variant={colorVariant} />
            <Size variant={SizeVariant} />
        </Wrapper>
    )

  }

  export default withStyles(styles)(Panels);
