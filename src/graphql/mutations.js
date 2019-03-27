// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createShopOwner = `mutation CreateShopOwner($input: CreateShopOwnerInput!) {
  createShopOwner(input: $input) {
    id
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
    owner {
      id
      name
      email
      shops {
        nextToken
      }
    }
  }
}
`;
export const updateShopOwner = `mutation UpdateShopOwner($input: UpdateShopOwnerInput!) {
  updateShopOwner(input: $input) {
    id
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
    owner {
      id
      name
      email
      shops {
        nextToken
      }
    }
  }
}
`;
export const deleteShopOwner = `mutation DeleteShopOwner($input: DeleteShopOwnerInput!) {
  deleteShopOwner(input: $input) {
    id
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
    owner {
      id
      name
      email
      shops {
        nextToken
      }
    }
  }
}
`;
export const createShop = `mutation CreateShop($input: CreateShopInput!) {
  createShop(input: $input) {
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
export const updateShop = `mutation UpdateShop($input: UpdateShopInput!) {
  updateShop(input: $input) {
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
export const deleteShop = `mutation DeleteShop($input: DeleteShopInput!) {
  deleteShop(input: $input) {
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
export const createProduct = `mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
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
export const updateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
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
export const deleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
  deleteProduct(input: $input) {
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
