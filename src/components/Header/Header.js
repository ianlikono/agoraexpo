import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import deepPurple from '@material-ui/core/colors/deepPurple';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { Query } from 'react-apollo';
import { fire } from '../../../firebase';
import { getMeCart, getMeQuery } from '../../graphql/queries';
import CartDrawer from '../CartDrawer/CartDrawer';
import PlusIcon from '../PlusIcon/PlusIcon';
import Guest from './Guest';
import Search from './Search';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  avatar: {
    margin: 10,
    cursor: 'pointer',
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
    cursor: 'pointer',
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  fab: {
    margin: theme.spacing.unit * 0.05,
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    alignItems: 'center',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class Header extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    cartOpen: false,
    isAuthenticated: false,
  };

  componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({isAuthenticated: true})
      } else {
        this.setState({isAuthenticated: false})
      }
    });
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = type => {
    this.setState({ mobileMoreAnchorEl: null });
    const { cartOpen } = this.state;
    if (type == 'cart') {
      this.setState({
        cartOpen: !cartOpen,
      });
    }
  };

  onCartClicked = () => {
    const { cartOpen } = this.state;

    this.setState({
      cartOpen: !cartOpen,
    });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl, isAuthenticated } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
      </Menu>
    );

    const renderUserAvatar = data => {
      if (data.me) {
        return data.me.profilePic ? (
          <div onClick={this.handleProfileMenuOpen} role="button">
            <Avatar alt="Remy Sharp" src={data.me.profilePic} className={classes.avatar} />
          </div>
        ) : (
          <div onClick={this.handleProfileMenuOpen} role="button">
            <Avatar className={classes.purpleAvatar}>{data.me.username.charAt(0)}</Avatar>
          </div>
        );
      }
      return (
        <Button
          onClick={() => Router.push('/auth')}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Login
        </Button>
      );
    };

    const renderMobileMenu = data => {
      return (
        <div>
          <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={this.handleMenuClose}
          >
            {data.me ? (
              <MenuItem onClick={() => this.handleMobileMenuClose('create')}>
                <IconButton color="inherit">
                  <AddIcon />
                </IconButton>
                <p>Create Shop</p>
              </MenuItem>
            ) : null}
            <MenuItem>
              {renderUserAvatar(data)}
              {data.me ? (
                <div onClick={this.handleProfileMenuOpen}>
                  <p>Account</p>
                </div>
              ) : null}
            </MenuItem>
            {data.me ? (
              <MenuItem onClick={() => this.handleMobileMenuClose('account')}>
                <p style={{ textAlign: 'center' }}>Logout</p>
              </MenuItem>
            ) : null}
          </Menu>
        </div>
      );
    };

    if(!isAuthenticated) {
      return (
        <Guest />
      )
    } else {
    return (
      <Query query={getMeQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return null;
          const meData = data;
          return (
            <>
              <Query query={getMeCart}>
                {({ loading, error, data }) => {
                  if (loading) return 'Loading...';
                    return (
                      <div className={classes.root}>
                        <AppBar position="static">
                          <Toolbar>
                            <Link href="/">
                              <a>
                                <Typography className={classes.title} variant="h2" color="inherit" noWrap>
                                  AgoraExpo
                                </Typography>
                              </a>
                            </Link>
                            <Search />
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                              <Link href="/new-shop">
                                <a>
                                  <PlusIcon toolTipTitle="Create Shop" fabSize="small" />
                                </a>
                              </Link>
                              {meData.me ? (<div onClick={this.onCartClicked} role="button">
                                <IconButton color="inherit">
                                  {data.getMeCart && data.getMeCart.length ? (<Badge badgeContent={data.getMeCart.length && data.getMeCart ? data.getMeCart[0].items.length : 0} color="secondary">
                                      <ShoppingCartIcon />
                                    </Badge>) : (<ShoppingCartIcon />)}
                                  </IconButton>
                              </div>): null}
                              {renderUserAvatar(meData)}
                            </div>
                            <div className={classes.sectionMobile}>
                              <div onClick={() => this.handleMobileMenuClose('cart')} role="button">
                                <IconButton color="inherit">
                                  {data.getMeCart && data.getMeCart.length ? (<Badge badgeContent={data.getMeCart.length && data.getMeCart ? data.getMeCart[0].items.length : 0} color="secondary">
                                      <ShoppingCartIcon />
                                    </Badge>) : (<ShoppingCartIcon />)}
                                </IconButton>
                              </div>
                              <IconButton
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuOpen}
                                color="inherit"
                              >
                                <MoreIcon />
                              </IconButton>
                            </div>
                          </Toolbar>
                        </AppBar>
                        <CartDrawer open={this.state.cartOpen} manageDrawer={this.onCartClicked} />
                        {renderMenu}
                        {renderMobileMenu(meData)}
                      </div>
                  )
              }
            }
            </Query>
          </>
          );
        }}
      </Query>
    );
  }
  }
}

export default withStyles(styles)(Header);
