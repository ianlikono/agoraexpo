// eslint-disable-next-line no-unused-vars
import { NextContext } from 'next';
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Query } from "react-apollo";
import ProductDetails from '../src/components/ProductDetails/index';
import { productQuery } from '../src/graphql/queries';


export interface queryProps {
  id: String;
}

class Product extends React.Component<queryProps> {
  static getInitialProps({ query: { id, shopName } }: NextContext) {
    return { id, shopName };
  }

  render() {
    const { id } = this.props;
    return (
      <Query query={productQuery} variables={{ id }}>
        {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
          return (
            <ProductDetails product={data.product} />
        )
      }}
        </Query>
    );
  }
}

export default Product;
