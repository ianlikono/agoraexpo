import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Downshift from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash/debounce';
import Router from 'next/router';
import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { DropDown, DropDownItem, SearchStyles } from './styles';


const SEARCH_ITEMS_QUERY = gql`
  query filterProducts($searchString: String) {
    filterProducts(searchString: $searchString) {
      id
      title
      images {
        imageUrl
      }
    }
  }
`;

export interface SearchProps {
  classes: any;
}

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    height: '4rem',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: '100%',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    fontSize: '2rem',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
})

function Search(props: SearchProps) {
  const { classes } = props;
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  function routeToItem(item) {
    Router.push(`/product/${item.id}`)
  }

  const onChange = debounce(async (e, client) => {
    // turn loading on
    setLoading(true)
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchString: e.target.value },
    });
    setLoading(false)
    setItems(res.data.filterProducts)
  }, 350);

  return (
    <>
      <div className={classes.search}>
        <SearchStyles>
          <Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.title)}>
            {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
              <div>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <ApolloConsumer>
                  {client => (
                    <input
                      {...getInputProps({
                        type: 'search',
                        placeholder: 'Search For A Product',
                        id: 'search',
                        className: loading ? 'loading' : '',
                        onChange: e => {
                          e.persist();
                          onChange(e, client);
                        },
                      })}
                    />
                  )}
                </ApolloConsumer>
                {isOpen && (
                  <DropDown>
                    {items.map((item, index) => (
                      <DropDownItem
                        {...getItemProps({ item })}
                        key={item.id}
                        highlighted={index === highlightedIndex}
                      >
                        <img width="50" src={item.images[0].imageUrl} alt={item.title} />
                        {item.title}
                      </DropDownItem>
                    ))}
                    {!items.length &&
                      !loading && <DropDownItem> Product Not Currently Available </DropDownItem>}
                  </DropDown>
                )}
              </div>
            )}
          </Downshift>
        </SearchStyles>
      </div>
    </>
  );
}
export default withStyles(styles)(Search);

