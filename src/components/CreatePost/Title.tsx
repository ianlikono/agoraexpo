import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import './styles.css';

export interface TitleProps {
  classes: any;
}

const styles = theme => ({
  searchPaper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: '2rem',
  },
  inputRoot: {
    width: '100%',
    flexWrap: 'wrap',
    height: '4rem',
    fontSize: '2rem',
  },
  inputInput: {
    width: '100%',
    flexGrow: 1,
    fontSize: '2rem',
  },
})

function Title(props: TitleProps) {
  const { classes } = props;
  return (
    <>
      <Paper className={classes.searchPaper} elevation={1}>
        <TextField
          fullWidth
          label="Title"
          placeholder="Enter Title"
          InputProps={{
            classes: {
              root: classes.inputRoot,
              input: classes.inputInput,
            },
          }}
        />
      </Paper>
    </>
  );
}

export default withStyles(styles)(Title);

