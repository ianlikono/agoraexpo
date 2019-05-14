import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import truncate from 'lodash/truncate';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { IconContext } from 'react-icons';
import { IoMdRemoveCircle } from 'react-icons/io';
import formatMoney from '../../../lib/formatMoney';
import { addItemToCart, deleteCartItem } from '../../graphql/mutations';
import { getMeCart } from '../../graphql/queries';
import PayPal from '../paypal';
import { CartItem, DeleteItem, ItemControls, ItemImg, ItemsDetails, TotalAmount, Wrapper } from './styles';

interface CartDrawerProps {
  props: any;
  open: any;
  manageDrawer: any;
  theme: any;
  classes: any;
}

const CLIENT = {
  sandbox: 'AXG_2eQKPth6LBbf2fIKc2lA8vZTMKQ6JhkOK0oEupEeBfTewdIbTZKbrTjjfvu4dgkKkMHbO9RcmGQ7',
  production: 'AYo62ySaC0CRtxdEEuL6AgA0k9Ur8HA0XI2-J2R80Dc4kKBAkmUUUT_SoEbxQv-upJINhWJXapwaSKIH',
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';

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
  button: {
    margin: theme.spacing.unit,
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

  const onSuccess = (payment) => {
    console.log('Successful payment!', payment);
  }

  const onError = (error) => {
    console.log('Erroneous payment OR failed to load script!', error);
  }

  const onCancel = (data) => {
    console.log('Cancelled payment!', data);
  }

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
            if (data.getMeCart && data.getMeCart.length) {
              const totalAmount = data.getMeCart[0].items.reduce((acc, val) => acc + val.product.price * val.quantity, 0)
              return (
                <>
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={manageDrawer}>
                      {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <Typography variant="h5">Cart Items</Typography>
                    <IconButton color="inherit">
                      <Badge badgeContent={data.getMeCart && data.getMeCart.length ? data.getMeCart[0].items.length : 0} color="primary">
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </div>
                  <Divider />
                  <Wrapper>
                    {data.getMeCart && data.getMeCart.length ? renderCartItems(data.getMeCart[0].items) : null}
                  </Wrapper>
                  <TotalAmount>total: {formatMoney(totalAmount)}</TotalAmount>
                  <PayPal
                    client={CLIENT}
                    env={ENV}
                    commit={true}
                    currency={'USD'}
                    total={totalAmount}
                    onSuccess={onSuccess}
                    onError={onError}
                    onCancel={onCancel}
                  />
                </>
              );
            } else {
              return (
                <>
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={manageDrawer}>
                      {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <Typography variant="h5"> No Cart Items</Typography>
                  </div>
                  <Divider />
                  <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', width: '100%' }}>
                    <Typography align="center" variant="h5"> No Cart Items</Typography>
                  </div>
                </>
              )
            }
          }}
        </Query>
      </Drawer>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CartDrawer);
