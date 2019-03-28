import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 0.05,
  },
});

const PlusIcon = props => {
  const { classes, toolTipTitle, fabSize } = props;
  return (
    <div>
      <Tooltip title={toolTipTitle} aria-label="Add">
        <IconButton color="inherit">
          <Fab size={fabSize} color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default withStyles(styles)(PlusIcon);
