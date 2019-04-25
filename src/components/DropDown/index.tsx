import { withStyles } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
export interface DropDownProps {
  classes: any;
  anchorEl: any;
  handlePopupClose: any;
  open: any;
  children: any;
  handlePopItemClick: any;
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.primary,
  },
});

function DropDown(props: DropDownProps) {
  const { classes, anchorEl, handlePopupClose, open, children, handlePopItemClick } = props;


  return (
    <>
      <Popper open={open} anchorEl={anchorEl.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handlePopupClose}>
                <MenuList>{children}</MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
export default withStyles(styles)(DropDown);
