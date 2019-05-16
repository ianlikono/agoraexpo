import { InputAdornment } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DropDownIcon from '@material-ui/icons/ArrowDropDownCircle';
import Downshift from 'downshift';
import gql from 'graphql-tag';
import deburr from 'lodash/deburr';
import React, { useContext, useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { CreatePostContext } from '../../contexts/CreatePost';
import { ForumImage, Wrapper } from './styles';

const SEARCH_FORUMS = gql`
    query filterForums($searchString: String) {
    filterForums(searchString: $searchString) {
      id
      name
      avatarPic
    }
  }
`;


export interface AutoCompleteProps {
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
    flexDirection: 'column',
    justifyContent: 'center'
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
  const { classes, placeholder } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [selectedForumError, setSelectedForumError] = useState(false);
  const { selectedForum, onForumSelected } = useContext(CreatePostContext);

  function renderInput(inputProps: any) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <Paper className={classes.searchPaper} elevation={1}>
        <TextField
          InputProps={{
            inputRef: ref,
            startAdornment: (
              <InputAdornment position="start">
                {selectedForum ? <Avatar alt="Remy Sharp" src={selectedForum.avatarPic} /> : <DropDownIcon />}
              </InputAdornment>
            ),
            classes: {
              root: classes.inputRoot,
              input: classes.inputInput,
            },
            ...InputProps,
          }}
          {...other}
        />
        {selectedForumError ? <span style={{ width: '100%', color: 'red', textAlign: 'center', fontSize: '2rem' }}>Select a forum</span> : null}
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
            <Avatar alt="Remy Sharp" src={suggestion.avatarPic} />
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

  async function onInputChange(e, client) {
    setSelectedForumError(false);
    const res = await client.query({
      query: SEARCH_FORUMS,
      variables: { searchString: e.target.value },
    });
    setSuggestions(res.data.filterForums)
  }

  function onInputBlured() {
    if (!selectedForum) {
      setSelectedForumError(true);
    } else {
      setSelectedForumError(false);
    }

  }



  return (
    <>
      <div className={classes.root}>
        <ApolloConsumer>
          {client => (
            <Downshift onChange={(item) => onForumSelected(item, suggestions)} id="downshift-simple">
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
                        onChange: (e) => onInputChange(e, client),
                        onBlur: onInputBlured,
                        error: selectedForumError,
                        label: selectedForumError ? "Select Forum" : null,
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
          )}
        </ApolloConsumer>
      </div>
    </>
  );
}

export default withStyles(styles)(AutoComplete);

