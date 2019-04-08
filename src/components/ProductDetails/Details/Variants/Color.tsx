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
import { CirclePicker, SketchPicker, ChromePicker } from 'react-color';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { IoMdRemoveCircle } from 'react-icons/io';
import { IconContext } from "react-icons";
import { SelectedColor, Popover, Cover, ColorWrapper, DeleteColor } from './styles';

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
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [colors, setColors] = useState(["#fff", "#000"]);
    const [activeColor, setActiveColor] = useState("")
    const [selectedColor, setSelectedColor] = useState("");

    const colorPickerDisplay = (color) => {
        setDisplayColorPicker(!displayColorPicker);
        if(color.length > 0) {
          setColors([...colors, color])
          setActiveColor("")
        }
    }

    const handleColorPickerChange = (color) => {
        setActiveColor(color.hex);
    }

    const onColorClicked = (color) => {
       console.log('color', color);
       setSelectedColor(color);
    }

    const renderColors = (colors) => {
        return colors.map((color) => {
            const onColorDelete = (color) => {
                const filteredColors = colors.filter((out) => {
                    return out != color
                })
                setColors(filteredColors);
            }
            return (
                <ColorWrapper>
                     <DeleteColor onClick={() => onColorDelete(color)}>
                        <IconContext.Provider value={{ style: {color: 'inherit', fontSize: '20px'} }}>
                        <div>
                            <IoMdRemoveCircle />
                        </div>
                        </IconContext.Provider>
                     </DeleteColor>
                    <SelectedColor onClick={() => onColorClicked(color)} SelectedColor={color} />
                </ColorWrapper>
           )
        })
    }

    const { classes } = props;
    return (
        <div className={classes.root}>
          <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Color</Typography>
                    </div>
                    <div className={classes.column}>
                        {!selectedColor.length ? 'select color' : <SelectedColor SelectedColor={selectedColor} />}
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div>
                        <div style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                            {colors.length ? renderColors(colors) : null}
                        </div>
                        <div onClick={() => colorPickerDisplay(activeColor)}>
                            <IconButton color="inherit">
                                <Fab size="small" color="primary" className={classes.fab}>
                                    <AddIcon />
                                </Fab>
                            </IconButton>
                        </div>
                        <Dialog onClose={() => colorPickerDisplay(activeColor)} aria-labelledby="color-picker-dialog" open={displayColorPicker}>
                            <DialogTitle id="color-picker-dialog">Select Color</DialogTitle>

                            <Popover>
                            <Cover onClick={ colorPickerDisplay } />
                                <ChromePicker color={activeColor} onChangeComplete={handleColorPickerChange} disableAlpha={true} />
                            </Popover>

                        </Dialog>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}


export default withStyles(styles)(Color);
