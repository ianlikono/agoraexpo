/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import ChipInput from 'material-ui-chip-input';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';
import NumberFormat from 'react-number-format';

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
  categoriesChip: {
    background:
      'linear-gradient(124deg, #f44336, #f44336, #f44336, #f44336, #f44336, #f44336, #f44336, #f44336, #f44336)',
    backgroundSize: '1800% 1800%',
    animation: 'rainbow 18s ease infinite',
  },
  tagsChip: {
    background:
      'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)',
    backgroundSize: '1800% 1800%',
    animation: 'rainbow 18s ease infinite',
  },
  '@keyframes rainbow': {
    '0%': { backgroundPosition: '0% 82%' },
    '50%': { backgroundPosition: '100% 19%' },
    '100%': { backgroundPosition: '0% 82%' },
  },
});
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddProductsDialog extends React.PureComponent {
  state = {
    name: '',
    description: '',
    price: '22222',
    categories: [],
    categoriesLimit: false,
    tags: [],
    brand: [],
    brandLimit: false,
    file: [],
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleAddCategory = chip => {
    const { categories } = this.state;
    if (categories.length >= 4) {
      this.setState({
        categoriesLimit: true,
      });
    } else {
      this.setState(prevState => ({
        categories: [...prevState.categories, chip],
        categoriesLimit: false,
      }));
    }
  };

  handleAddTag = chip => {
    const { tags } = this.state;
    this.setState(prevState => ({
      tags: [...prevState.tags, chip],
    }));
  };

  handleDeleteCategory = (chip, index) => {
    const { categories } = this.state;
    this.setState({
      categories: this.state.categories.filter(function(category) {
        return category !== chip;
      }),
    });
    this.setState({
      categoriesLimit: false,
    });
  };

  handleDeleteTag = (chip, index) => {
    const { categories } = this.state;
    this.setState({
      tags: this.state.tags.filter(function(tag) {
        return tag !== chip;
      }),
    });
  };

  handleAddBrandChip = (chip, index) => {
    const { brand } = this.state;
    if (brand.length >= 1) {
      this.setState({
        brandLimit: true,
      });
    } else {
      this.setState(prevState => ({
        brand: [...prevState.brand, chip],
      }));
    }
  };

  handleDeleteBrandChip = (chip, index) => {
    const { brand } = this.state;
    this.setState({
      brand: this.state.brand.filter(function(brand) {
        return brand !== chip;
      }),
    });
    this.setState({
      brandLimit: false,
    });
  };

  handleFilesChange = files => {
    this.setState({
      files,
    });
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
    });
    console.log(this.state);
  };

  render() {
    const { classes, open, close, theme } = this.props;
    const {
      name,
      categories,
      categoriesLimit,
      tags,
      brand,
      brandLimit,
      description,
      price,
    } = this.state;
    return (
      <>
        <div>
          <Dialog fullScreen open={open} onClose={close} TransitionComponent={Transition}>
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
                <Button color="inherit" onClick={close}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <div style={{ backgroundColor: '#F2F3F3', width: '100%', height: '100%' }}>
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
                          <TextField
                            onChange={this.handleInputChange}
                            id="name"
                            name="name"
                            label="Product Name"
                            fullWidth
                            value={name}
                          />
                        </div>
                        <div className="sepearator" />
                        <div className="field-size">
                          <ChipInput
                            value={categories}
                            onAdd={chip => this.handleAddCategory(chip)}
                            onDelete={(chip, index) => this.handleDeleteCategory(chip, index)}
                            placeholder="Categories"
                            alwaysShowPlaceholder
                            fullWidth
                            classes={{
                              root: classes.chipInputRoot,
                              input: classes.chipInputInput,
                              chip: classes.categoriesChip,
                            }}
                          />
                          {categoriesLimit && <span className="limit-error">Max</span>}
                        </div>
                        <div className="sepearator" />
                        <div className="field-size">
                          <ChipInput
                            value={tags}
                            onAdd={chip => this.handleAddTag(chip)}
                            onDelete={(chip, index) => this.handleDeleteTag(chip, index)}
                            placeholder="Tags"
                            alwaysShowPlaceholder
                            fullWidth
                            classes={{
                              root: classes.chipInputRoot,
                              input: classes.chipInputInput,
                              chip: classes.tagsChip,
                            }}
                          />
                        </div>
                        <div className="sepearator" />
                        <Typography variant="h5">Upload Images</Typography>
                        <div className="field-size">
                          <DropzoneArea
                            acceptedFiles={['image/*']}
                            filesLimit={10}
                            onChange={this.handleFilesChange}
                          />
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="field-size">
                          <ChipInput
                            value={brand}
                            onAdd={chip => this.handleAddBrandChip(chip)}
                            onDelete={(chip, index) => this.handleDeleteBrandChip(chip, index)}
                            placeholder="Brand"
                            alwaysShowPlaceholder
                            fullWidth
                            classes={{
                              root: classes.chipInputRoot,
                              input: classes.chipInputInput,
                              chip: classes.tagsChip,
                            }}
                          />
                          {brandLimit && <span className="limit-error">Max</span>}
                        </div>
                        <div className="sepearator" />
                        <div className="field-size">
                          <TextField
                            onChange={this.handleInputChange}
                            id="description"
                            name="description"
                            label="Description"
                            fullWidth
                            rows={5}
                            multiline
                            value={description}
                          />
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
          </Dialog>
        </div>
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
