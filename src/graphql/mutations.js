/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const Login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        username
      }
    }
  }
`;

export const createDraft = gql`
  mutation createShopDraft($name: String!, $category: String!, $description: String!, $live: Boolean, $ownersIds: [ID!]) {
    createShopDraft(name: $name,  category: $category, description: $description, live:$live, ownersIds: $ownersIds){
      id
    }
  }
`

export const createProduct = gql`
  mutation createProduct($id: ID!, $title: String!, $description: String!, $price: String!, $brand: String!, $categories: [String!], $tags: [String!], $images: [String!]){
  createProduct(id: $id, title: $title, description:$description, price: $price, brand: $brand, categories: $categories, tags: $tags, images: $images) {
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
