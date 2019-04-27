import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';
import React from 'react';

export interface CreatePostProps {
  classes: any;
}

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 0.05,
  },
});

function CreatePost(props: CreatePostProps) {
  const { classes } = props;
  return (
    <>
      <Link href="/create-post">
        <a>
          <div>
            <Tooltip title="create post" aria-label="Add">
              <IconButton color="inherit">
                <Fab size="small" color="primary" className={classes.fab}>
                  <EditIcon />
                </Fab>
              </IconButton>
            </Tooltip>
          </div>
        </a>
      </Link>
    </>
  );
}

export default withStyles(styles)(CreatePost);
