import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Query } from 'react-apollo';
import { getUserDetails } from '../../../graphql/queries';
import { FullName, UserAvatar, Username, Wrapper } from './styles';

export interface OverviewProps {
  classes: any;
  username: any;
}


const styles = theme => ({
  root: {
    marginRight: '1rem',
    cursor: 'pointer',
    width: '100%',
  },
});

function OverviewComponent(props: OverviewProps) {
  const { classes, username } = props;
  return (
    <Query query={getUserDetails} variables={{ username }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) console.log(error);
        return (
          <Paper className={classes.root} elevation={1} >
            <Wrapper>
              <UserAvatar src={data.getUser[0].profilePic} alt={data.getUser[0].name} />
              <FullName>{data.getUser[0].name}</FullName>
              <Username>{`@${data.getUser[0].username}`}</Username>
            </Wrapper>
          </Paper>
        )
      }}
    </Query>
  );
}

export default withStyles(styles)(OverviewComponent);

