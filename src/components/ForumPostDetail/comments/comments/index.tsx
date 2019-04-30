import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Query } from 'react-apollo';
import Moment from 'react-moment';
import { forumPostComments } from '../../../../graphql/queries';
import { LeftWrapper, ReviewContent, ReviewDetails, ReviewWrapper } from './styles';

const styles = theme => ({
  avatar: {
    width: 60,
    height: 60,
  },
  input: {
    width: '70%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
});

export interface CommentsProps {
  comments: any;
  postId: any
  classes: any;
}

const CommentsDisplay: React.SFC<CommentsProps> = props => {
  const { classes, postId } = props;
  return (
    <Query query={forumPostComments} variables={{ postId }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return data.forumPostComments.map(comment => {
          const HtmlToReactParser = require('html-to-react').Parser;
          const htmlToReactParser = new HtmlToReactParser();
          const contentElement = htmlToReactParser.parse(comment.comment);
          return (
            <ReviewWrapper>
              <LeftWrapper>
                {comment.user.profilePic ? (
                  <Avatar alt="Remy Sharp" src={comment.user.profilePic} className={classes.avatar} />
                ) : (
                    <Avatar className={classes.purpleAvatar}>
                      {comment.user.username.charAt(0)}
                    </Avatar>
                  )}
                <ReviewDetails>
                  <Typography variant="caption" align="center">
                    <Moment fromNow>{comment.createdAt}</Moment>
                  </Typography>

                  <Typography component="p" align="center">
                    {comment.user.username}
                  </Typography>
                </ReviewDetails>
              </LeftWrapper>
              <ReviewContent>
                <Typography component="p">{contentElement}</Typography>
              </ReviewContent>
            </ReviewWrapper>
          );
        });
      }}
    </Query>
  )
};
export default withStyles(styles)(CommentsDisplay);
