import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Wrapper } from './styles';
import Color from './Color';

export interface ColorProps {
    Panels: any;
  }

  const styles = theme => ({
    root: {
      width: '100%',
    },
  });


  const Panels: React.SFC<PanelsProps> = props => {
    const { classes } = props;
    return (
        <Wrapper className={classes.root}>
            <Color />
        </Wrapper>
    )

  }

  export default withStyles(styles)(Panels);
