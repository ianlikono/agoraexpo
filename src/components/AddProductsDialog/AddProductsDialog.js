/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import 'antd/dist/antd.css';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import classNames from 'classnames';
import { DropzoneArea } from 'material-ui-dropzone';
import Router from 'next/router';
import React from 'react';
import { Mutation } from 'react-apollo';
import NumberFormat from 'react-number-format';
import { createProduct, createVariant } from '../../graphql/mutations';


const { TextArea } = Input;


const { Option } = Select;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddProductsDialog extends React.PureComponent {
  state = {
    name: '',
    description: '',
    price: '',
    categories: [],
    tags: [],
    brand: "",
    brandLimit: false,
    images: [],
    categoriesSuggestion: [],
    tagsSuggestion: [],
    disabledSave: false,
    snackOpen: false,
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({
      snackOpen: false,
      disabledSave: false,
    })
  };

  PriceFormatCustom = props => {
    const { inputRef, onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
      />
    );
  };

  handlePriceChange = name => event => {
    this.setState({
      [name]: event.target.value,
      snackOpen: false,
      disabledSave: false,
    });
  };

  renderCategorySuggestions = () => {
    const { categoriesSuggestion } = this.state;

    categoriesSuggestion.map(cat => {
      return <Option key={cat}>{cat}</Option>;
    });
  };

  handleCategoryChange = value => {
    this.setState({
      categories: value,
      snackOpen: false,
      disabledSave: false,
    })
  };

  renderTagsSuggestions = () => {
    const { tagsSuggestion } = this.state;

    tagsSuggestion.map(cat => {
      return <Option key={cat}>{cat}</Option>;
    });
  };

  handletagsChange = value => {
    this.setState({
      tags: value,
      snackOpen: false,
      disabledSave: false,
    })
  };

  onFilesDropped = async file => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'agoraexpo');

    const res = await fetch('https://api.cloudinary.com/v1_1/doelo01na/image/upload', {
      method: 'POST',
      body: data,
    });
    const uploadedFile = await res.json();
    this.setState(prevState => ({
      images: [...prevState.images, uploadedFile.secure_url],
    }));
  }

  handleCloseSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackOpen: false });
  }

  onProductSave = async (productCreate,variantCreate, error, error2) => {
    const { name, description, price, categories, tags, brand, images } = this.state;
    if (name.length < 1 && description.length < 1 && price.length < 1 && categories.length < 1 && tags.length < 1 && brand.length < 1 && images.length < 1) {
      this.setState({
        snackOpen: true,
        disabledSave: true,
      })
    } else {
      const response = await productCreate({
        variables: { id: this.props.shopId, title: name, description, price, categories, tags, brand, images },
      });
      const productId = response.data.createProduct.id;

      const firstVariantResponse = await variantCreate({
        variables: {
           productId: productId,
           name: "Color",
           values: ["#fff", "#000"]
        }
      })
      const secondVariantResponse = await variantCreate({
        variables: {
           productId: productId,
           name: "Size",
           values: ["Large", "Medium", "Small"]
        }
      })
      Router.push({
        pathname: `/product/${productId}`,
      });
    }

  }

  render() {
    const { classes, open, close, theme } = this.props;
    const {
      name,
      tags,
      brand,
      description,
      price,
      images,
      disabledSave,
      snackOpen
    } = this.state;
    return (
      <>
        <Mutation mutation={createProduct}>
          {(productCreate, { loading, error }) => (
            <Dialog fullScreen open={open} onClose={close} TransitionComponent={Transition}>
            <Mutation mutation={createVariant}>
            {(variantCreate, { loading2, error2 }) => (
              <>
              <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={snackOpen}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Please Ensure All FIelds Are Filled</span>}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.handleCloseSnackClose}
                  >
                    <CloseIcon />
                  </IconButton>,
                ]}
              />
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <div onClick={close} role="button">
                    <IconButton color="inherit" aria-label="Close">
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <Typography variant="h6" color="inherit" className={classes.flex}>
                    Add Product
                </Typography>
                  {/* //TODO: save prducts */}
                  <div onClick={() => this.onProductSave(productCreate,variantCreate, error, error2)} role="button">
                    <IconButton disabled={disabledSave || loading || loading2} color="inherit" aria-label="Close">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <SaveIcon />
                        save
                    </div>
                    </IconButton>
                  </div>
                </Toolbar>
              </AppBar>
              <div style={{ width: '100%', height: '100%' }}>
                <div className="wrapper">
                  <div style={{ marginTop: '50px' }}>
                    <Typography variant="h4" align="center">
                      Create Product
                  </Typography>
                  </div>
                  <div className="form-wrapper">
                    <Paper className={classes.root} elevation={1}>
                      <div
                        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}
                      >
                        <div className="col-1">
                          <div className="field-size">
                            <Input id="name" name="name" value={name} style={{ width: '100%' }} placeholder="Product Name" onChange={this.handleInputChange} />
                          </div>
                          <div className="sepearator" />
                          <div className="field-size">
                            <Select
                              mode="tags"
                              style={{ width: '100%' }}
                              placeholder="Product Categories"
                              onChange={this.handleCategoryChange}
                            >
                              {this.renderCategorySuggestions()}
                            </Select>
                          </div>
                          <div className="sepearator" />
                          <div className="field-size">
                            <Select
                              mode="tags"
                              style={{ width: '100%' }}
                              placeholder="Product Tags"
                              onChange={this.handletagsChange}
                            >
                              {this.renderCategorySuggestions()}
                            </Select>
                          </div>
                          <div className="sepearator" />
                          <Typography variant="h5">Upload Images</Typography>
                          <div className="field-size">
                            <DropzoneArea
                              acceptedFiles={['image/*']}
                              filesLimit={10}
                              onDrop={this.onFilesDropped}
                              dropzoneText="Drag and drop an image file here or click"
                            />
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="field-size">
                            <Input onChange={this.handleInputChange} id="brand" name="brand" value={brand} style={{ width: '100%' }} placeholder="Product Brand" />
                          </div>
                          <div className="sepearator" />
                          <div className="field-size">
                            <TextArea id="description" name="description" value={description} onChange={this.handleInputChange} rows={4} placeholder="Add Product Description" />
                            <div className="sepearator" />
                            <div className="field-size">
                              <div>
                                <Typography variant="h5">Price</Typography>
                                <div style={{ marginTop: '10px' }}>
                                  <TextField
                                    name="price"
                                    onChange={this.handlePriceChange('price')}
                                    fullWidth
                                    id="price"
                                    value={price}
                                    className={classNames(classes.margin, classes.textField)}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">$</InputAdornment>
                                      ),
                                      inputComponent: this.PriceFormatCustom,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Paper>
                  </div>
                </div>
              </div>
              </>
              )}
              </Mutation>
            </Dialog>
          )}
        </Mutation>
        <style jsx>{`
          .form-wrapper {
            display: flex;
            margin: 0 auto;
            width: 80%;
            margin-top: 5px;
            flex-wrap: wrap;
            justify-content: space-evenly;
          }
          .col-1 {
            min-width: 350px;
            max-width: 450px;
          }
          .col-2 {
            min-width: 350px;
            max-width: 450px;
          }
          .sepearator {
            margin-top: 20px;
          }
          .field-size {
            max-width: 500px;
          }
          .limit-error {
            width: 200px;
            color: red;
          }
        `}</style>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddProductsDialog);
