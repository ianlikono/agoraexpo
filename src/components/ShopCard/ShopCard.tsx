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
  coverPic: string;
  avatarPic: string;
  shopName: string;
}

function ShopCard(props: ShopCardProps) {
  const { classes, coverPic, shopName, avatarPic } = props;
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
            <ShopCover src={coverPic} />
            <ContentWrapper>
              <ShopName>
                {truncate(`${shopName}`, {
                  length: 46,
                  separator: ' ',
                })}
              </ShopName>
              <ShopAvatar src={avatarPic} />
            </ContentWrapper>
          </CardWrapper>
        </Paper>
      </Wrapper>
    </>
  );
}

export default withStyles(styles)(ShopCard);
