// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    email
    shops {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      email
      shops {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getShop = `query GetShop($id: ID!) {
  getShop(id: $id) {
    id
    name
    category
    description
    owners {
      items {
        id
      }
      nextToken
    }
    products {
      items {
        id
        title
        description
        image
        largeImage
        price
      }
      nextToken
    }
  }
}
`;
export const listShops = `query ListShops(
  $filter: ModelShopFilterInput
  $limit: Int
  $nextToken: String
) {
  listShops(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      category
      description
      owners {
        nextToken
      }
      products {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getProduct = `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    title
    description
    image
    largeImage
    price
    shop {
      id
      name
      category
      description
      owners {
        nextToken
      }
      products {
        nextToken
      }
    }
  }
}
`;
export const listProducts = `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      image
      largeImage
      price
      shop {
        id
        name
        category
        description
      }
    }
    nextToken
  }
}
`;
