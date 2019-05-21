/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import AutoComplete from 'antd/lib/auto-complete';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Tag from 'antd/lib/tag';
import gql from 'graphql-tag';
import debounce from 'lodash/debounce';
import Router from 'next/router';
import { TweenOneGroup } from 'rc-tween-one';
import React, { Component } from 'react';
import { ApolloConsumer, Mutation } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { isAuthenticated } from '../src/components/CheckAuth';
import { createDraft } from '../src/graphql/mutations';
import { filterCategories } from '../src/graphql/queries';
import { initGA, logPageView } from "../utils/analytics";

const { TextArea } = Input;
const Option = AutoComplete.Option;

const filterUsers = gql`
  query filterUsers($searchString: String) {
    filterUsers(searchString: $searchString) {
      id
      name
      username
    }
  }
`;

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class CreateShopPage extends Component {
  state = {
    name: '',
    category: '',
    description: '',
    activeButton: false,
    categorySuggestions: [],
    ownersIds: [],
    ownerNames: [],
    fetchedUsers: [],
    selectedUser: '',
    inputVisible: false,
    inputValue: '',
    noUserMsg: false,
  };

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  handleCategoryChange = debounce(async (client, value) => {
    const { name, category, description } = this.state;
    const res = await client.query({
      query: filterCategories,
      variables: { searchString: value },
    });
    const catNames = res.data.filterCategories.map(cat => cat.name);
    this.setState({
      categorySuggestions: catNames,
    });
    this.setState({
      category: value,
    });
    if (name.length > 0 && category.length > 0 && description.length > 0) {
      this.setState({
        activeButton: true,
      });
    } else {
      this.setState({
        activeButton: false,
      });
    }
  }, 10);

  handleUserInputChange = debounce(async (client, value) => {
    this.setState({
      noUserMsg: false,
    });
    const res = await client.query({
      query: filterUsers,
      variables: { searchString: value },
    });

    const owners = res.data.filterUsers.map(owner => ({
      name: owner.name,
      username: owner.username,
      userId: owner.id,
    }));

    const ownersNames = res.data.filterUsers.map(owner => ({
      name: owner.name,
      username: owner.username,
      userId: owner.id,
    }));
    this.setState({
      fetchedUsers: owners,
    });
    this.setState({
      selectedUser: value,
    });
    if (!this.state.fetchedUsers.length) {
      this.setState({
        noUserMsg: true,
      });
    }
  }, 10);

  handleUserSelect = val => {
    this.setState({
      selectedUser: val,
    });
  };

  handleInputConfirm = () => {
    let { ownerNames, fetchedUsers, selectedUser, ownersIds } = this.state;
    this.setState({
      noUserMsg: false,
    });
    if (fetchedUsers.length) {
      const Owner = fetchedUsers.filter(user => {
        return selectedUser === user.userId;
      });

      if (Owner.length) {
        if (Owner[0].userId && ownersIds.indexOf(Owner[0].userId) === -1) {
          ownersIds = [...ownersIds, Owner[0].userId];
        }

        if (Owner[0].username && ownerNames.indexOf(Owner[0].username) === -1) {
          ownerNames = [...ownerNames, Owner[0].username];
        }
        this.setState({
          ownerNames,
          ownersIds,
          inputVisible: false,
          selectedUser: '',
        });
      } else {
        this.setState({
          noUserMsg: true,
        });
      }
    } else {
      this.setState({
        inputVisible: false,
      });
    }
  };

  renderUserOptions = user => {
    return (
      <Option key={user.userId} text={user.name}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>@{user.username}</span>
          <span className="global-search-item-count">{user.name}</span>
        </div>
      </Option>
    );
  };

  handleClose = removedName => {
    const ownerNames = this.state.ownerNames.filter(name => name !== removedName);
    this.setState({ ownerNames });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleOwnersInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        color="#4caf50"
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  formSubmit = async (createShopDraft, error) => {
    const isLoggedIn = await isAuthenticated();
    if(isLoggedIn) {
      const { name, category, description, ownersIds } = this.state;
      const response = await createShopDraft({
        variables: { name, category, description, ownersIds },
      });
      Router.push(`/shop/${response.data.createShopDraft.id}`);
    } else {
      alert('Please Login First')
      Router.push('/auth');
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    const { category, description } = this.state;
    this.setState({ [name]: value });
    if (this.state.name.length > 0 && category.length > 0 && description.length > 0) {
      this.setState({
        activeButton: true,
      });
    } else {
      this.setState({
        activeButton: false,
      });
    }
  };

  render() {
    const {
      name,
      description,
      activeButton,
      categorySuggestions,
      inputVisible,
      inputValue,
      ownerNames,
      fetchedUsers,
      selectedUser,
      ownersIds,
      noUserMsg,
    } = this.state;
    const { classes, className, message, onClose, variant, ...other } = this.props;
    const tagChild = ownerNames.map(this.forMap);
    return (
      <>
        <Helmet>
          <title>'create new shop || AgoraExpo</title>
          <link rel="canonical" href="https://agoraexpo.com/new-shop" />
          <meta name="description" content="create new agoraexpo shop" />
          {/* Google / Search Engine Tags */}
          <meta itemProp="name" content="create new agoraexpo shop" />
          <meta itemProp="description" content="create new agoraexpo shop" />
          <meta itemProp="image" content="https://res.cloudinary.com/doelo01na/image/upload/v1556859500/static/logos/agoraexpobanner.png" />
          {/* Facebook Meta Tags */}
          <meta property="og:title" content="create new agoraexpo shop" />
          <meta property="og:description" content="create new agoraexpo shop" />
          <meta property="og:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
          <meta property="og:url" content="https://agoraexpo.com/new-shop" />
          <meta property="og:site_name" content="AgoraExpo" />
          {/* twitter Meta Tags */}
          <meta name="twitter:title" content="create new agoraexpo shop" />
          <meta name="twitter:description" content="create new agoraexpo shop" />
          <meta name="twitter:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image:alt" content="AgoraExpo" />
      </Helmet>
        <Mutation mutation={createDraft}>
          {(createShopDraft, { loading, error }) => (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h1 style={{ textAlign: 'center' }}>Create Shop</h1>
              <Paper elevation={1} className={classes.paper}>
                <Input
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                  size="large"
                  placeholder="Shop Name"
                />
                <ApolloConsumer>
                  {client => (
                    <AutoComplete
                      backfill
                      onChange={value => this.handleCategoryChange(client, value)}
                      size="large"
                      style={{ width: '100%' }}
                      dataSource={categorySuggestions}
                      filterOption={(inputValue, option) =>
                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                      }
                    >
                      <Input size="large" placeholder="Category" />
                    </AutoComplete>
                  )}
                </ApolloConsumer>
                <TextArea
                  onChange={this.handleInputChange}
                  name="description"
                  value={description}
                  rows={4}
                  placeholder="Shop Description"
                />
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ textAlign: 'center' }}> Add Owners</h3>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                      <div style={{ marginBottom: 16 }}>
                        <TweenOneGroup
                          enter={{
                            scale: 0.8,
                            opacity: 0,
                            type: 'from',
                            duration: 100,
                            onComplete: e => {
                              e.target.style = '';
                            },
                          }}
                          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                          appear={false}
                        >
                          {tagChild}
                        </TweenOneGroup>
                      </div>
                      {inputVisible && (
                        <ApolloConsumer>
                          {client => (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}
                            >
                              <AutoComplete
                                backfill
                                ref={this.saveInputRef}
                                size="medium"
                                style={{ width: 300 }}
                                dataSource={fetchedUsers.map(this.renderUserOptions)}
                                onSelect={val => this.handleUserSelect(val)}
                                onSearch={value => this.handleUserInputChange(client, value)}
                                placeholder="Search User"
                                optionLabelProp="text"
                                value={selectedUser}
                                onBlur={this.handleInputConfirm}
                              />
                              {noUserMsg && <span style={{ color: 'red' }}>No User Found</span>}
                            </div>
                          )}
                        </ApolloConsumer>
                      )}
                      {!inputVisible && (
                        <Tag
                          onClick={this.showInput}
                          style={{ background: '#f44336', borderStyle: 'dashed' }}
                        >
                          <Icon type="plus" /> <span style={{ color: '#fff' }}>Add Owner</span>
                        </Tag>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '100px' }}>
                  <Button
                    onClick={() => this.formSubmit(createShopDraft, error)}
                    type="submit"
                    fullWidth
                    variant="raised"
                    color="primary"
                    disabled={!activeButton || loading}
                  >
                    Create
                  </Button>
                </div>
              </Paper>
            </div>
          )}
        </Mutation>
      </>
    );
  }
}

export default withStyles(styles)(CreateShopPage);
