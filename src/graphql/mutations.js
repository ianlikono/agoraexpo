/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const signUp = gql`
  mutation signUp(
    $name: String
    $email: String
    $profilePic: String
    $isAnonymous: Boolean!
    $emailVerified: Boolean
    $idToken: String!
  ) {
    signUp(
      name: $name
      email: $email
      profilePic: $profilePic
      isAnonymous: $isAnonymous
      emailVerified: $emailVerified
      idToken: $idToken
    ) {
      user {
        id
        name
        email
        username
        profilePic
        firebaseId
        isAnonymous
        emailVerified
      }
    }
  }
`;

export const login = gql`
  mutation login($idToken: String!) {
    login(idToken: $idToken) {
      user {
        id
        name
        email
        username
        profilePic
        firebaseId
        isAnonymous
        emailVerified
      }
    }
  }
`;

export const createDraft = gql`
  mutation createShopDraft(
    $name: String!
    $category: String!
    $description: String!
    $live: Boolean
    $ownersIds: [ID!]
  ) {
    createShopDraft(
      name: $name
      category: $category
      description: $description
      live: $live
      ownersIds: $ownersIds
    ) {
      id
    }
  }
`;

export const createProduct = gql`
  mutation createProduct(
    $id: ID!
    $title: String!
    $description: String!
    $price: String!
    $brand: String!
    $categories: [String!]
    $tags: [String!]
    $images: [String!]
  ) {
    createProduct(
      id: $id
      title: $title
      description: $description
      price: $price
      brand: $brand
      categories: $categories
      tags: $tags
      images: $images
    ) {
      title
      id
      brand {
        name
      }
      description
      id
      categories {
        name
      }
      tags {
        name
      }
      images {
        imageUrl
      }
      shop {
        name
      }
    }
  }
`;

export const createVariant = gql`
  mutation addVariant($productId: ID!, $name: String!, $values: [String!]) {
    addVariant(productId: $productId, name: $name, values: $values) {
      name
      values
      product {
        title
        id
      }
    }
  }
`;

export const updateVariant = gql`
  mutation updateVariant($variantId: ID!, $name: String, $values: [String!]) {
    updateVariant(variantId: $variantId, name: $name, values: $values) {
      id
      name
      values
      product {
        title
        id
      }
    }
  }
`;

export const createProductReview = gql`
  mutation createProductReview($productId: ID!, $rating: Int!, $review: String) {
    createProductReview(productId: $productId, rating: $rating, review: $review) {
      rating
      review
      review
      user {
        name
        profilePic
      }
    }
  }
`;

export const addItemToCart = gql`
  mutation addItemToCart($productId: ID!, $quantity: Int!, $variant: [String!]) {
    addItemToCart(productId: $productId, quantity: $quantity, variants: $variant) {
      id
      items {
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

export const deleteCartItem = gql`
  mutation deleteCartItem($itemId: ID!) {
    deleteCartItem(itemId: $itemId) {
      id
    }
  }
`;
