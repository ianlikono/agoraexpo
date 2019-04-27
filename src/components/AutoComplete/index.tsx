import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Downshift from 'downshift';
import deburr from 'lodash/deburr';
import React from 'react';
import { ForumImage, Wrapper } from './styles';


export interface AutoCompleteProps {
  suggestions: any;
  classes: any;
  placeholder: any;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '2rem',
  },

  searchPaper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  inputRoot: {
    flexWrap: 'wrap',
    height: '4rem',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
    fontSize: '2rem',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});


function AutoComplete(props: AutoCompleteProps) {
  const { suggestions, classes, placeholder } = props;

  function renderInput(inputProps: any) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <Paper className={classes.searchPaper} elevation={1}>
        <TextField
          InputProps={{
            inputRef: ref,
            classes: {
              root: classes.inputRoot,
              input: classes.inputInput,
            },
            ...InputProps,
          }}
          {...other}
        />
      </Paper>
    );
  }

  //@ts-ignore
  function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.name}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
          fontSize: '2rem',
        }}
      >
        <Wrapper>
          <ForumImage>
            <Avatar alt="Remy Sharp" src={suggestion.pic} />
          </ForumImage>
          {suggestion.name}
        </Wrapper>
      </MenuItem>
    );
  }

  function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }


  return (
    <>
      <div className={classes.root}>
        <Downshift id="downshift-simple">
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem,
          }) => (
              <div className={classes.container}>
                {renderInput({
                  fullWidth: true,
                  classes,
                  InputProps: getInputProps({
                    placeholder: `${placeholder}`,
                  }),
                })}
                <div {...getMenuProps()}>
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {getSuggestions(inputValue).map((suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.name }),
                          highlightedIndex,
                          selectedItem,
                        }),
                      )}
                    </Paper>
                  ) : null}
                </div>
              </div>
            )}
        </Downshift>
      </div>
    </>
  );
}

export default withStyles(styles)(AutoComplete);

