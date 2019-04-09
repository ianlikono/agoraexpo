// eslint-disable
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import { ChromePicker } from 'react-color';
import { IconContext } from 'react-icons';
import { IoMdRemoveCircle } from 'react-icons/io';
import { updateVariant } from '../../../../graphql/mutations';
import { ColorWrapper, Cover, DeleteColor, Popover, SelectedColor } from './styles';

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
});

const Color: React.SFC<ColorProps> = props => {
  const { classes, variant } = props;
  const variantId = variant[0].id;
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    console.log('variant', variant);
    setColors(variant[0].values);
  }, []);

  const colorPickerDisplay = async (color, updateVariantMutaion) => {
    setDisplayColorPicker(!displayColorPicker);
    if (color.length > 0) {
      console.log('before', colors)
      setActiveColor('');
      console.log('after',colors);
      const response = await updateVariantMutaion({
        variables: {values: [...colors, color], variantId }
      });
      await setColors(response.data.updateVariant.values);
      console.log('response2', response);
    }
  };

  const handleColorPickerChange = color => {
    setActiveColor(color.hex);
  };

  const onColorClicked = color => {
    console.log('color', color);
    setSelectedColor(color);
  };

  const renderColors = colors => {
    return colors.map(color => {
      const onColorDelete = async (color, updateVariantMutaion) => {
        const filteredColors = colors.filter(out => {
          return out != color;
        });
        setColors(filteredColors);

        const response = await updateVariantMutaion({
          variables: {values: filteredColors, variantId }
        });
        console.log('response', response);
      };
      return (
        <Mutation mutation={updateVariant}>
          {(updateVariantMutaion) => (
            <ColorWrapper key={color}>
              <DeleteColor key={color} onClick={() => onColorDelete(color, updateVariantMutaion)}>
                <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '20px' } }}>
                  <div>
                    <IoMdRemoveCircle />
                  </div>
                </IconContext.Provider>
              </DeleteColor>
              <SelectedColor onClick={() => onColorClicked(color)} SelectedColor={color} />
            </ColorWrapper>
          )}
        </Mutation>
      );
    });
  };
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>Color</Typography>
          </div>
          <div className={classes.column}>
            {!selectedColor.length ? (
              'select color'
            ) : (
              <SelectedColor SelectedColor={selectedColor} />
            )}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Mutation mutation={updateVariant}>
            {(updateVariantMutaion) => (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                {colors.length ? renderColors(colors) : null}
              </div>
              <div onClick={() => colorPickerDisplay(activeColor, updateVariantMutaion)}>
                <IconButton color="inherit">
                  <Fab size="small" color="primary" className={classes.fab}>
                    <AddIcon />
                  </Fab>
                </IconButton>
              </div>
              <Dialog
                onClose={() => colorPickerDisplay(activeColor, updateVariantMutaion)}
                aria-labelledby="color-picker-dialog"
                open={displayColorPicker}
              >
                <DialogTitle id="color-picker-dialog">Select Color</DialogTitle>

                <Popover>
                  <Cover onClick={() => colorPickerDisplay(activeColor, updateVariantMutaion)} />
                  <ChromePicker
                    color={activeColor}
                    onChangeComplete={handleColorPickerChange}
                    disableAlpha
                  />
                </Popover>
              </Dialog>
            </div>
            )}
            </Mutation>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default withStyles(styles)(Color);
