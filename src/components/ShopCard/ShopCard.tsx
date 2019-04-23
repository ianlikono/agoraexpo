import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import truncate from 'lodash/truncate';
import React, { useState } from 'react';
import { CardWrapper, ContentWrapper, ShopAvatar, ShopCover, ShopName, Wrapper } from './style';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: 0,
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    borderRadius: '50px',
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

export interface ShopCardProps {
  classes: any;
}

function ShopCard(props: ShopCardProps) {
  const { classes } = props;
  const [cardElevation, setCardElevation] = useState(2);

  const onMouseLeave = () => {
    setCardElevation(2);
  };
  const onMouseEnter = () => {
    setCardElevation(6);
  };
  return (
    <>
      <Wrapper onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
        <Paper className={classes.root} elevation={cardElevation}>
          <CardWrapper>
            <ShopCover src="https://images.unsplash.com/photo-1553531889-56cc480ac5cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
            <ContentWrapper>
              <ShopName>
                {truncate(`Electronics Today What you see is what you get`, {
                  length: 46,
                  separator: ' ',
                })}
              </ShopName>
              <ShopAvatar src="https://images.unsplash.com/photo-1497094360950-14687b7e44c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
            </ContentWrapper>
          </CardWrapper>
        </Paper>
      </Wrapper>
    </>
  );
}

export default withStyles(styles)(ShopCard);
