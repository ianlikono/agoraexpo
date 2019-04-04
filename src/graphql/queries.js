import gql from 'graphql-tag';

export const GetShop = gql`
  query shop($id: ID!) {
    shop(id:$id) {
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