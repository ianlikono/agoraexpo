import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import deepPurple from '@material-ui/core/colors/deepPurple';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { Query } from 'react-apollo';
import { getMeCart, getMeQuery } from '../../graphql/queries';
import CartDrawer from '../CartDrawer/CartDrawer';
import PlusIcon from '../PlusIcon/PlusIcon';

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
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
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
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
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
  };

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
    const { anchorEl, mobileMoreAnchorEl } = this.state;
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
                            <div className={classes.search}>
                              <div className={classes.searchIcon}>
                                <SearchIcon />
                              </div>
                              <InputBase
                                placeholder="Search…"
                                classes={{
                                  root: classes.inputRoot,
                                  input: classes.inputInput,
                                }}
                              />
                            </div>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                              <Link href="/new-shop">
                                <a>
                                  <PlusIcon toolTipTitle="Create Shop" fabSize="small" />
                                </a>
                              </Link>
                              <div onClick={this.onCartClicked} role="button">
                                <IconButton color="inherit">
                                  <Badge badgeContent={data.getMeCart && data.getMeCart[0] ? data.getMeCart[0].items.length : 0} color="secondary">
                                    <ShoppingCartIcon />
                                  </Badge>
                                </IconButton>
                              </div>
                              {renderUserAvatar(meData)}
                            </div>
                            <div className={classes.sectionMobile}>
                              <div onClick={() => this.handleMobileMenuClose('cart')} role="button">
                                <IconButton color="inherit">
                                  <Badge badgeContent={data.getMeCart && data.getMeCart[0] ? data.getMeCart[0].items.length : 0} color="secondary">
                                    <ShoppingCartIcon />
                                  </Badge>
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

export default withStyles(styles)(Header);
