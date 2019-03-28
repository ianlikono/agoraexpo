/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-unused-expressions */
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBack';
import ForwardIcon from '@material-ui/icons/ArrowForward';
import React, { Component } from 'react';
import debounce from 'lodash/debounce';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 0.05,
  },
});

const scrollLeft = (element, change, duration) => {
  const start = element.scrollLeft;
  let currentTime = 0;
  const increment = 20;

  const animateScroll = () => {
    currentTime += increment;
    const val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
};

Math.easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

class ItemCaraosel extends Component {

  constructor(props) {
    super(props)

    this.state = {}

    this.debounceButton = debounce(scrollLeft, 300);
  }

  backButtonClicked = () => {
    console.log('back clicked')
    this.refs.scroller ? this.debounceButton(this.refs.scroller, -300, 1000) : null;
  };

  frontButtonClicked = () => {
    console.log('front clicked')
    this.refs.scroller ? this.debounceButton(this.refs.scroller, 300, 1000) : null;
  };

  render() {
    const { children, classes } = this.props;

    return (
      <>
        <div className="wrapper">
          <div className="on-screen">
            <div className="back-btn-wrapper" onClick={this.backButtonClicked}>
              <IconButton color="inherit">
                <Fab size="small" color="primary" className={classes.fab}>
                  <BackIcon />
                </Fab>
              </IconButton>
            </div>
            <div ref="scroller" className="caraosel-items">
              {children}
            </div>
            <div className="front-btn-wrapper" onClick={this.frontButtonClicked}>
              <IconButton color="inherit">
                <Fab size="small" color="primary" className={classes.fab}>
                  <ForwardIcon />
                </Fab>
              </IconButton>
            </div>
          </div>
          <style jsx>{`
            .back-btn-wrapper {
              z-index: 500;
              position: absolute;
              left: 5px;
              margin-right: 5px;
            }
            .front-btn-wrapper {
              z-index: 500;
              position: absolute;
              right: 5px;
              margin-right: 5px;
            }
            .on-screen {
              display: flex;
              align-items: center;
              position: relative;
            }
            .caraosel-items {
              display: flex;
              margin: 0 0 20px 20px;
              overflow-x: auto;
            }
            .caraosel-items::-webkit-scrollbar {
              display: none;
            }
            .wrapper {
              width: 100%;
              overflow: hidden;
            }
          `}</style>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(ItemCaraosel);
