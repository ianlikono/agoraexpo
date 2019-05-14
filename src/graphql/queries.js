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
        id
        username
        name
        profilePic
      }
      images {
        id
        imageUrl
        largeImageUrl
      }
      products {
        id
        title
        description
        price
        categories {
          id
          name
        }
        brand {
          id
          name
        }
        tags {
          id
          name
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
      user {
        username
        id
        email
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
      comments {
        id
        comment
        createdAt
        user {
          username
          profilePic
        }
      }
    }
  }
`;

export const forumPostComments = gql`
  query forumPostComments($postId: ID!) {
    forumPostComments(postId: $postId) {
      id
      comment
      user {
        username
        profilePic
      }
      createdAt
      }
  }
`;

export const forums = gql`
  {
  forums {
    id
    title
    createdAt
    content
    forum {
      avatarPic
      name
    }
    postedBy {
      username
    }
    comments {
      id
      comment
      user {
        username
        profilePic
      }
    }
  }
}
`;

export const forumPosts = gql`
  query forumPosts($forumName: String!) {
    forumPosts(forumName: $forumName) {
      id
      title
      createdAt
      content
      forum {
        avatarPic
        name
      }
      postedBy {
        username
      }
      comments {
        id
        comment
        user {
          username
          profilePic
        }
      }
    }
  }
`;

export const getShopProducts = gql`
  query getShopProducts($shopId: ID!) {
    getShopProducts(shopId: $shopId) {
      shop {
        owners {
          id
          username
        }
      }
      id
      title
      description
      price
      categories {
        id
        name
      }
      brand {
        id
        name
      }
      tags {
        id
        name
      }
      images {
        imageUrl
        largeImageUrl
      }
      variants {
        id
        name
        values
      }
    }
  }
`;

export const getUserDetails = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      id
      name
      username
      email
      profilePic
      emailVerified
      shops {
        id
        name
        description
        images {
          imageUrl
          largeImageUrl
        }
      }
    }
  }
`;
export const getUserForums = gql`
  query getUserForums($username: String!) {
    getUserForums(username: $username) {
      id
      avatarPic
      coverPic
      name
      description
      createdAt
      updatedAt
      members {
        username
      }
    }
  }
`;

export const getUserPosts = gql`
  query getUserPosts($username: String!) {
    getUserPosts(username: $username) {
      id
      title
      content
      postedBy {
        username
        id
        profilePic
      }
      forum {
        name
        avatarPic
      }
      createdAt
      comments {
        id
        user {
          username
          profilePic
        }
        comment
        createdAt
      }
    }
  }
`;

export const getOrder = gql`
  query getOrder($orderId: ID!) {
    getOrder(orderId: $orderId) {
      id
      PayerID,
      paymentId,
      createdAt
      updatedAt
      total
      imageUrl
      user {
        username
      }
      items {
        id
        title
        description
        price
        variants
        imageUrl
        quantity
      }
    }
  }
`;

export const getMeOrders = gql`
  query getMeOrders {
    getMeOrders {
        id
        PayerID,
        paymentId,
        createdAt
        updatedAt
        total
        imageUrl
        user {
          username
        }
        items {
          id
          title
          description
          price
          variants
          imageUrl
          quantity
          createdAt
        }
      }
  }
`;

