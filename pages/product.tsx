import React from 'react';
import ProductDetails from '../src/components/ProductDetails';

class Product extends React.PureComponent {
  static getInitialProps({ query: { id, shopName } }) {
    return { id, shopName };
  }

  render() {
    console.log(this.props);
    const { id, shopName } = this.props;
    return (
      <div>
        <ProductDetails />
      </div>
    );
  }
}

export default Product;
