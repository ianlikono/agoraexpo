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
    const { classes } = props;

    return (
        <Wrapper className={classes.root}>
            <Color />
            <Size />
        </Wrapper>
    )

  }

  export default withStyles(styles)(Panels);
