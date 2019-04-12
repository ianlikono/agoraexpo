import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Wrapper } from './styles';
import Panels from './Panels';

export interface VariantsProps {
    variants: any;
    color: any;
    onColorClicked: any;
    size: any;
    onSizeSelect: any;
  }

  const styles = theme => ({
    root: {
      width: '100%',
    },
  });


  const Variants: React.SFC<VariantsProps> = props => {
    const { classes, variants, color, onColorClicked, size, onSizeSelect } = props;
    return (
        <Wrapper className={classes.root}>
            <Panels variants={variants} color={color} onColorClicked={onColorClicked} size={size} onSizeSelect={onSizeSelect}/>
        </Wrapper>
    )

  }

  export default withStyles(styles)(Variants);
