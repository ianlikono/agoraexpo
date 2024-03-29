import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import * as React from 'react';
import { CoverH1, CoverH3, CoverImage, CoverText, Wrapper } from './styles';

export interface CoverProps {
  classes: any;
}

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
        fontSize: '2rem'
      },
});

function Cover(props: CoverProps) {
  const { classes } = props;
  return (
    <Wrapper>
      <CoverImage>
        <CoverText>
          <CoverH1>Accomplish Your Dreams</CoverH1>
          <CoverH3>Start Your Online Business Risk Free with No Starting Capital Required</CoverH3>
          <Link href="/auth">
            <a>
            <Fab size="large" color="primary" variant="extended" aria-label="sign-up" className={classes.fab}>
              Sign Up
            </Fab>
            </a>
        </Link>
        </CoverText>
      </CoverImage>
    </Wrapper>
  );
}

export default withStyles(styles)(Cover);
