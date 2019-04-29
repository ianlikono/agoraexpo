/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const GetShop = gql`
  query shop($id: ID!) {
    shop(id: $id) {
      id
      name
      description
      category
      live
      owners {
        username
      }
      images {
        imageUrl
      }
      products {
        id
        title
        description
        price
        categories {
          name
        }
        brand {
          name
        }
        tags {
          name
        }
        images {
          imageUrl
        }
      }
    }
  }
`;

export const filterCategories = gql`
  query filterCategories($searchString: String) {
    filterCategories(searchString: $searchString) {
      name
    }
  }
`;

export const productQuery = gql`
  query product($id: ID!) {
    product(id: $id) {
      id
      title
      description
      price
      categories {
        name
      }
      brand {
        name
      }
      tags {
        name
      }
      images {
        imageUrl
      }
      variants {
        id
        name
        values
      }
    }
  }
`;

export const productReviews = gql`
  query productReviews($productId: ID!) {
    productReviews(productId: $productId) {
      review
      rating
      user {
        username
        name
        profilePic
      }
      createdAt
    }
  }
`;

export const getMeCart = gql`
  query getMeCart {
    getMeCart {
      id
      items {
        id
        product {
          id
          title
          images {
            imageUrl
          }
          price
        }
        quantity
        variants
      }
    }
  }
`;

export const getMeQuery = gql`
  query me {
    me {
      id
      username
      name
      profilePic
    }
  }
`;

export const forumPostQuery = gql`
  query forumPost($id: ID!) {
    forumPost(id: $id) {
      id
      postedBy {
        username
        id
      }
      forum {
        id
        name
        avatarPic
      }
      createdAt
      title
      content
      type
    }
  }
`;
