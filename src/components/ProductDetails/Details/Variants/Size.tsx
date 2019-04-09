import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import { updateVariant } from '../../../../graphql/mutations';

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
  const { classes, variant } = props;
  const variantId = variant[0].id;
  const [selectedSize, setSelectedSize] = useState('');
  const [sizes, setSizes] = useState([]);
  const [sizeToAdd, setSizeToAdd] = useState('');
  const [openAddSize, setOpenAddSize] = useState(false);

  useEffect(() => {
    setSizes(variant[0].values);
  }, []);

  const renderSizes = () => {
    return sizes.map(size => {
      const onSizeDelete = async (size, updateVariantMutaion) => {
        const filteredSizes = sizes.filter(availableSize => {
          return size != availableSize;
        });
        setSizes(filteredSizes);
        const response = await updateVariantMutaion({
          variables: {values: filteredSizes, variantId }
        });
        console.log(response);
      };
      const onSizeSelect = size => {
        setSelectedSize(size);
      };
      return (
        <Mutation mutation={updateVariant}>
          {(updateVariantMutaion) => (
            <Chip
              key={size}
              label={size}
              clickable
              onClick={() => onSizeSelect(size)}
              onDelete={() => onSizeDelete(size, updateVariantMutaion)}
              className={classes.chip}
              color="primary"
            />
          )}
        </Mutation>
      );
    });
  };

  const onAddingSize = e => {
    setSizeToAdd(e.target.value);
  };

  const onAddSizeClose = async (size, updateVariantMutaion) => {
    if (size.length > 0) {
      const response = await updateVariantMutaion({
        variables: {values: [...sizes, size], variantId }
      });
      console.log(response);
      await setSizes(response.data.updateVariant.values);
    }
    setOpenAddSize(false);
  };

  const openSizeDialog = () => {
    setOpenAddSize(true);
    setSizeToAdd('');
  };

  return (
    <div style={{ marginTop: '20px' }} className={classes.root}>
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
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
              {renderSizes(sizes)}
            </div>
            <Mutation mutation={updateVariant}>
                {(updateVariantMutaion) => (
                  <>
                    <div onClick={openSizeDialog}>
                      <IconButton color="inherit">
                        <Fab size="small" color="primary" className={classes.fab}>
                          <AddIcon />
                        </Fab>
                      </IconButton>
                    </div>
                    <Dialog
                      onClose={() => onAddSizeClose(sizeToAdd, updateVariantMutaion)}
                      aria-labelledby="size-dialog"
                      open={openAddSize}
                    >
                      <DialogTitle id="size-dialog">Add Size</DialogTitle>
                      <Input placeholde="Input Size" value={sizeToAdd} onChange={onAddingSize} />
                      <DialogActions>
                        <Button onClick={() => onAddSizeClose(sizeToAdd, updateVariantMutaion)} color="primary">
                          Save changes
                        </Button>
                      </DialogActions>
                    </Dialog>
                </>
                )}
            </Mutation>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default withStyles(styles)(Size);
