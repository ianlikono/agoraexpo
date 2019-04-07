// eslint-disable-next-line no-unused-vars
import { NextContext } from 'next';
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import ProductDetails from '../src/components/ProductDetails/index';

export interface queryProps {
  id: String;
  shopName: String;
}

class Product extends React.Component<queryProps> {
  static getInitialProps({ query: { id, shopName } }: NextContext) {
    return { id, shopName };
  }

  render() {
    const { id, shopName } = this.props;
    return (
      <div>
        <ProductDetails shopName={shopName} productId={id} />
      </div>
    );
  }
}

export default Product;
