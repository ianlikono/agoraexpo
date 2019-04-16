import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React from 'react';
import truncate from 'lodash/truncate';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IconContext } from 'react-icons';
import { IoMdRemoveCircle } from 'react-icons/io';
import { Query, Mutation } from 'react-apollo';
import { getMeCart } from '../../graphql/queries';
import { addItemToCart, deleteCartItem } from '../../graphql/mutations';
import { Wrapper, CartItem, ItemImg, ItemsDetails, ItemControls, DeleteItem } from './styles';

interface CartDrawerProps {
  props: any;
  open: any;
  manageDrawer: any;
  theme: any;
  classes: any;
}

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  card: {
    display: 'flex',
  },
});

const CartDrawer: React.SFC<CartDrawerProps> = props => {
  const onAddQuantityClicked = async (product, qty, variants, addItem) => {
    await addItem({
      variables: {
        productId: product,
        quantity: qty + 1,
        variant: variants,
      },
      refetchQueries: [
        {
          query: getMeCart,
        },
      ],
    });
  };

  const onRemoveQuantityClicked = async (product, qty, variants, addItem) => {
    if (qty > 1) {
      await addItem({
        variables: {
          productId: product,
          quantity: qty - 1,
          variant: variants,
        },
        refetchQueries: [
          {
            query: getMeCart,
          },
        ],
      });
    }
  };

  const onDeleteItem = async (id, deleteItem) => {
    console.log('clicked', id);
    await deleteItem({
      variables: {
        itemId: id,
      },
      refetchQueries: [
        {
          query: getMeCart,
        },
      ],
    });
  };

  const renderCartItems = cartItems => {
    return cartItems.map(item => {
      const { product, quantity, variants, id } = item;
      return (
        <div key={id}>
          <Mutation mutation={addItemToCart}>
            {(addItem, { data }) => (
              <>
                <div style={{ position: 'relative', width: '100%' }} key={product.title}>
                  <Mutation mutation={deleteCartItem}>
                    {(deleteItem, { data }) => (
                      <>
                        <DeleteItem onClick={() => onDeleteItem(id, deleteItem)}>
                          <IconContext.Provider
                            value={{ style: { color: 'inherit', fontSize: '30px' } }}
                          >
                            <div>
                              <IoMdRemoveCircle />
                            </div>
                          </IconContext.Provider>
                        </DeleteItem>
                      </>
                    )}
                  </Mutation>
                  <CartItem>
                    <ItemImg src={product.images[0].imageUrl} />
                    <ItemsDetails>
                      <Typography component="h6" variant="h6">
                        {truncate(product.title, {
                          length: 24,
                          separator: ' ',
                        })}
                      </Typography>
                      <Typography variant="subtitle1" align="center" color="textSecondary">
                        {variants.length > 0 ? variants.map(variant => <>{variant} </>) : null}
                      </Typography>
                      <Typography variant="subtitle2" align="center" color="textSecondary">
                        ${product.price}
                      </Typography>
                      <ItemControls>
                        <div
                          onClick={() =>
                            onRemoveQuantityClicked(product.id, quantity, variants, addItem)
                          }
                        >
                          <IconButton aria-label="minus">
                            <RemoveIcon />
                          </IconButton>
                        </div>
                        <Typography variant="h6" align="center" color="primary">
                          {quantity}
                        </Typography>
                        <div
                          onClick={() =>
                            onAddQuantityClicked(product.id, quantity, variants, addItem)
                          }
                        >
                          <IconButton aria-label="add">
                            <AddIcon />
                          </IconButton>
                        </div>
                      </ItemControls>
                    </ItemsDetails>
                  </CartItem>
                </div>
              </>
            )}
          </Mutation>
        </div>
      );
    });
  };

  const { classes, open, manageDrawer, theme } = props;
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Query query={getMeCart}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <>
                <div className={classes.drawerHeader}>
                  <IconButton onClick={manageDrawer}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                  <Typography variant="h5">Cart Items</Typography>
                  <IconButton color="inherit">
                    <Badge badgeContent={11} color="primary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </div>
                <Divider />
                <Wrapper>
                  {data.getMeCart.length > 0 ? renderCartItems(data.getMeCart[0].items) : null}
                </Wrapper>
              </>
            );
          }}
        </Query>
      </Drawer>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CartDrawer);
