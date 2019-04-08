import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Input from '@material-ui/core/Input';
import { SelectedColor, Popover, Cover } from './styles';

const styles = theme => ({
    root: {
        width: '100%',
      },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
      background: '#e6ecf0',
    },
    column: {
      flexBasis: '33.33%',
      marginRight: '20px',
    },
    fab: {
        margin: theme.spacing.unit * 0.05,
      },
      chip: {
        margin: theme.spacing.unit,
      },
  });

  const DialogActions = withStyles(theme => ({
    root: {
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit,
    },
  }))(MuiDialogActions);

  const Size: React.SFC<SizeProps> = props => {

    const [ selectedSize, setSelectedSize] = useState("");
    const [sizes, setSizes] = useState(["Large", "Medium", "Small"]);
    const [sizeToAdd, setSizeToAdd] = useState("");
    const [ openAddSize, setOpenAddSize] = useState(false);

    const renderSizes = () => {
      return sizes.map((size) => {
        const onSizeDelete = (size) => {
            const filteredSizes = sizes.filter((availableSize) => {
                return size != availableSize
            })
            setSizes(filteredSizes);
        }
        const onSizeSelect = (size) => {
            setSelectedSize(size)
        }
          return (
                <Chip
                    label={size}
                    clickable
                    onClick={() => onSizeSelect(size)}
                    onDelete={() => onSizeDelete(size)}
                    className={classes.chip}
                    color="primary"
            />
          )
      })
    }

    const onAddingSize = (e) => {
        setSizeToAdd(e.target.value);
    }

    const onAddSizeClose = (size) => {
        if(size.length > 0) {
          setSizes([...sizes, size]);
        }
        setOpenAddSize(false);
    }

    const openSizeDialog = () => {
        setOpenAddSize(true);
        setSizeToAdd("");
    }

    const { classes } = props;
    return (
        <div style={{marginTop: '20px'}} className={classes.root}>
          <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Size</Typography>
                    </div>
                    <div className={classes.column}>
                        {!selectedSize.length ? 'select Size' : selectedSize}
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div>
                        <div style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                            {renderSizes(sizes)}
                        </div>
                        <div onClick={openSizeDialog}>
                            <IconButton color="inherit">
                                <Fab size="small" color="primary" className={classes.fab}>
                                    <AddIcon />
                                </Fab>
                            </IconButton>
                        </div>
                        <Dialog onClose={() => onAddSizeClose(sizeToAdd)} aria-labelledby="size-dialog" open={openAddSize}>
                            <DialogTitle id="size-dialog">Add Size</DialogTitle>
                            <Input placeholde="Input Size" value={sizeToAdd} onChange={onAddingSize} />
                            <DialogActions>
                                <Button onClick={() => onAddSizeClose(sizeToAdd)} color="primary">
                                Save changes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}


export default withStyles(styles)(Size);
