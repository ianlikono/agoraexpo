/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-unused-expressions */
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import DownIcon from '@material-ui/icons/ArrowDownward';
import UpIcon from '@material-ui/icons/ArrowUpward';
import React from 'react';
import debounce from 'lodash/debounce';
import styled from 'styled-components';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 0.05,
  },
});


const HorizontalCaraosel = props => {

  return (
    <>
      <Wrapper>
          <UpWrapper role="button">
            <IconButton color="inherit">
              <Fab size="small" color="primary" className={props.classes.fab}>
                <UpIcon />
              </Fab>
            </IconButton>
          </UpWrapper>
          <Items>
          <div className="caraosel-items">
            {props.children}
          </div>
          </Items>
          <DownWrapper role="button">
            <IconButton color="inherit">
              <Fab size="small" color="primary" className={props.classes.fab}>
                <DownIcon />
              </Fab>
            </IconButton>
          </DownWrapper>
      </Wrapper>
    </>
  );
}


const Wrapper = styled.div`
 height: 100%;
 overflow: scroll;
 position: relative;
`;

const Items = styled.div`
  position: relative;
  // overflow-y: scroll;
`;

const UpWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 50px;
  left: 25%;
  z-index: 500;
`;

const DownWrapper = styled.div`
  position: sticky;
  bottom: 0;
  left: 25%;
  width: 50px;
  z-index: 500;
`;

export default withStyles(styles)(HorizontalCaraosel);
