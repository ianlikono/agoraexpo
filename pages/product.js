import React from 'react';
import ProductDetails from '../src/components/ProductDetails';

class Product extends React.PureComponent {
  static getInitialProps({ query: { id } }) {
    return { id };
  }

  render() {
    console.log(this.props.id);
    return (
      <div>
        <ProductDetails />
      </div>
    );
  }
}

export default Product;
