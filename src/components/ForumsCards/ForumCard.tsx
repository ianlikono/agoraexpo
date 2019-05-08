import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { CardContent, GroupCardGradient, GroupName, Wrapper } from './styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: 0,
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    borderRadius: '50px',
    minHeight: 200,
    minWidth: 200,
  },
});

export interface GroupCardProps {
  classes: any;
  avatarPic: String;
  name: String;
}

function GroupCard(props: GroupCardProps) {
  const { classes, avatarPic, name } = props;
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
          <CardContent groupCover={avatarPic}>
            <GroupCardGradient />
            <GroupName>{name}</GroupName>
          </CardContent>
        </Paper>
      </Wrapper>
    </>
  );
}

export default withStyles(styles)(GroupCard);
