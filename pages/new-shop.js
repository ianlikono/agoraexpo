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
import { TweenOneGroup } from 'rc-tween-one';
import React, { Component } from 'react';
import { ApolloConsumer, Mutation } from 'react-apollo';
import { createDraft } from '../src/graphql/mutations';

const { TextArea } = Input;

const filterCategories = gql`
  query filterCategories($searchString: String) {
    filterCategories(searchString: $searchString) {
      name
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
    ownerNames: ['Tag 1', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  };

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
  }, 100);

  handleClose = (removedName) => {
    const ownerNames = this.state.ownerNames.filter(name => name !== removedName);
    console.log(ownerNames);
    this.setState({ ownerNames });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleOwnersInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { ownerNames } = this.state;
    if (inputValue && ownerNames.indexOf(inputValue) === -1) {
      ownerNames = [...ownerNames, inputValue];
    }
    console.log(ownerNames);
    this.setState({
      ownerNames,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => this.input = input

  forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
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
  }


  formSubmit = async (createShopFunction, createShopOwnerFunction, error, error2) => {
    this.setState({ successSnackBar: true });
    // Router.push({
    //   pathname: '/shop',
    //   query: { id: finalResponse.data.createShopOwner.shop.id },
    // });
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
    const { name, description, activeButton, categorySuggestions, inputVisible, inputValue, ownerNames } = this.state;
    const { classes, className, message, onClose, variant, ...other } = this.props;
    const tagChild = ownerNames.map(this.forMap);
    return (
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
                <div>
        <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8, opacity: 0, type: 'from', duration: 100,
              onComplete: (e) => {
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
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleOwnersInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
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
    );
  }
}

export default withStyles(styles)(CreateShopPage);
