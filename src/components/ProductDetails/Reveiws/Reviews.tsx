import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Rating from 'material-ui-rating';
import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import Moment from 'react-moment';
import { createProductReview } from '../../../graphql/mutations';
import { productReviews } from '../../../graphql/queries';
import { LeftWrapper, ReviewContent, ReviewDetails, ReviewParagraph, ReviewWrapper, Wrapper } from './styles';

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

export interface ReviewsProps {
  productId: any;
}

const ProDuctDetails: React.SFC<ReviewsProps> = props => {
  const { classes, productId } = props;

  const [reviewInput, setReviewInput] = useState('');
  const [enabledPostButton, setEnabledPostButton] = useState(true);
  const [rating, setRating] = useState();

  const onReviewInputChange = e => {
    setReviewInput(e.target.value);
    if (reviewInput.length > 0) {
      setEnabledPostButton(false);
    } else {
      setEnabledPostButton(true);
    }
  };

  const onRatingsChange = value => {
    setRating(value);
  };

  const onPostReview = async (createProductMutaion, error) => {
    if (rating && reviewInput.length > 0) {
      const response = await createProductMutaion({
        variables: {
          productId,
          rating,
          review: reviewInput,
        },
        refetchQueries: [
          {
            query: productReviews,
            variables: { productId }
          }
        ]
      });
      setReviewInput('');
      setRating();
    }
  };

  const renderReviews = reviews => {
    return (
      <Query query={productReviews} variables={{ productId }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return data.productReviews.map(review => {
            return (
              <ReviewWrapper>
                <LeftWrapper>
                  {review.user.profilePic ? (
                    <Avatar alt="Remy Sharp" src={review.user.profilePic} className={classes.avatar} />
                  ) : (
                    <Avatar className={classes.purpleAvatar}>
                      {review.user.username.charAt(0)}
                    </Avatar>
                  )}
                  <ReviewDetails>
                    <Rating value={review.rating} max={5} readOnly />
                    <Typography variant="caption" align="center">
                      <Moment fromNow>{review.createdAt}</Moment>
                    </Typography>

                    <Typography component="p" align="center">
                      {review.user.username}
                    </Typography>
                  </ReviewDetails>
                </LeftWrapper>
                <ReviewContent>
                  <ReviewParagraph>{review.review}</ReviewParagraph>
                </ReviewContent>
              </ReviewWrapper>
            );
          });
        }}
      </Query>
    );
  };
  return (
    <>
      <Typography variant="h4" align="center">
        Reviews
      </Typography>
      <Wrapper>{renderReviews()}</Wrapper>
      <Mutation mutation={createProductReview}>
        {(createProductMutaion, { loading, error }) => (
          <div style={{ marginLeft: '10%' }}>
            <Typography variant="h6">Leave A Review</Typography>
            <TextField
              value={reviewInput}
              onChange={onReviewInputChange}
              label="Your Review"
              multiline
              rowsMax="6"
              rows="5"
              placeholder="Write your review"
              className={classes.input}
            />
            <Rating value={rating} max={5} onChange={val => onRatingsChange(val)} />
            <Button
              disabled={loading || enabledPostButton}
              onClick={() => onPostReview(createProductMutaion, error)}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Post
            </Button>
          </div>
        )}
      </Mutation>
    </>
  );
};
export default withStyles(styles)(ProDuctDetails);
