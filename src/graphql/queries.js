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
