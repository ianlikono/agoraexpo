import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';

export interface InputProps {
  placeholder: String;
  label: String;
  classes: any;
  value: any;
  onChange: any;
}

const styles = theme => ({
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
    fontSize: '1.5rem',
  },
});


function InputComponent (props: InputProps) {
  const {placeholder, label, classes, value, onChange} = props;
  return (
    <>
      <TextField
          id="outlined-full-width"
          label={`${label}`}
          style={{ fontSize: '2rem' }}
          placeholder={`${placeholder}`}
          value={value}
          onChange={onChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            classes: {
              root: classes.inputRoot,
              input: classes.inputInput,
            },
          }}
        />
    </>
  );
}
export default withStyles(styles)(InputComponent);

