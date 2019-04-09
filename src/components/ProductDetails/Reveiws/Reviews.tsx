import React from 'react';
import Typography from '@material-ui/core/Typography';
import  Rating  from 'material-ui-rating';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Wrapper, ReviewWrapper, ReviewDetails, ReviewContent, LeftWrapper } from './styles';

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
})


export interface ProDuctDetailsProps {

}

const reviews = [{
    rating: 5,
    createdAt: '5 minutes ago',
    user: {
        username: "likono",
        url: "https://images.unsplash.com/photo-1487087850479-4792f4bdb5de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    review: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
 },
 {
    rating: 3,
    createdAt: '2 months ago',
    user: {
        username: "amanda",
        url: "https://images.unsplash.com/photo-1526921818655-f049068f1de9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    },
    review: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
 }
]

const ProDuctDetails: React.SFC<ProDuctDetailsProps> = props => {
  const { classes } = props;

  const renderReviews = (reviews) => {
    return reviews.map((review) => {
       return(
       <ReviewWrapper>
           <LeftWrapper>
           <Avatar alt="Remy Sharp" src={review.user.url} className={classes.avatar} />
                <ReviewDetails>
                    <Rating
                        value={review.rating}
                        max={5}
                        readOnly
                    />
                <Typography variant="caption" align="center">
                {review.createdAt}
                </Typography>

                <Typography component="p" align="center">
                {review.user.username}
                </Typography>
                </ReviewDetails>
            </LeftWrapper>
            <ReviewContent>
                <Typography component="p">
                {review.review}
                </Typography>
            </ReviewContent>
        </ReviewWrapper>
        )
    })
  }
  return (
    <>
      <Typography variant="h4" align="center">
            Reviews
        </Typography>
        <Wrapper>
            {reviews.length > 0 ? renderReviews(reviews) : null}
        </Wrapper>
        <div style={{marginLeft: '10%'}}>
            <Typography variant="h6">
                Leave A Review
            </Typography>
            <TextField label="Your Review" multiline rowsMax="6" rows="5" placeholder="Write your review" className={classes.input}/>
            <Rating
                value={1}
                max={5}
            />
            <Button variant="contained" color="primary" className={classes.button}>
                Post
            </Button>
        </div>

    </>
  );
};
export default withStyles(styles)(ProDuctDetails);
