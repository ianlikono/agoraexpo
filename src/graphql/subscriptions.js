// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateShopOwner = `subscription OnCreateShopOwner {
  onCreateShopOwner {
    id
    shop {
      id
      name
      location
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
export const onUpdateShopOwner = `subscription OnUpdateShopOwner {
  onUpdateShopOwner {
    id
    shop {
      id
      name
      location
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
export const onDeleteShopOwner = `subscription OnDeleteShopOwner {
  onDeleteShopOwner {
    id
    shop {
      id
      name
      location
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
export const onCreateShop = `subscription OnCreateShop {
  onCreateShop {
    id
    name
    location
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
export const onUpdateShop = `subscription OnUpdateShop {
  onUpdateShop {
    id
    name
    location
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
export const onDeleteShop = `subscription OnDeleteShop {
  onDeleteShop {
    id
    name
    location
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
export const onCreateProduct = `subscription OnCreateProduct {
  onCreateProduct {
    id
    title
    description
    image
    largeImage
    price
    shop {
      id
      name
      location
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
export const onUpdateProduct = `subscription OnUpdateProduct {
  onUpdateProduct {
    id
    title
    description
    image
    largeImage
    price
    shop {
      id
      name
      location
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
export const onDeleteProduct = `subscription OnDeleteProduct {
  onDeleteProduct {
    id
    title
    description
    image
    largeImage
    price
    shop {
      id
      name
      location
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
