import { NextContext } from 'next';
import React from 'react';
import CheckAuth from '../src/components/CheckAuth';
import Order from '../src/components/Order';

export interface OrderItemProps {
  orderId: String;
}


class OrderItemPage extends React.Component<OrderItemProps> {
  static getInitialProps({ query: { orderId } }: NextContext) {
    return { orderId };
  }
  render() {
    const { orderId } = this.props;
    console.log(orderId);
    return (
      <>
        <CheckAuth>
          <Order />
        </CheckAuth>
      </>
    )
  }
}

export default OrderItemPage;
