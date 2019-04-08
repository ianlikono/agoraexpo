import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Wrapper } from './styles';
import Panels from './Panels';

export interface VariantsProps {
    variants: any;
  }

  const styles = theme => ({
    root: {
      width: '100%',
    },
  });


  const Variants: React.SFC<VariantsProps> = props => {
    const { classes } = props;
    return (
        <Wrapper className={classes.root}>
            <Panels />
        </Wrapper>
    )

  }

  export default withStyles(styles)(Variants);
