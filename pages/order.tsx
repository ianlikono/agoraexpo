import { NextContext } from 'next';
import React from 'react';
import CheckAuth from '../src/components/CheckAuth';
import Order from '../src/components/Order';
import { initGA, logPageView } from "../utils/analytics";

export interface OrderitemProps {
  orderId: String;
}


class OrderItemPage extends React.Component<OrderitemProps> {
  static getInitialProps({ query: { orderId } }: NextContext) {
    return { orderId };
  }
  componentDidMount() {
    //@ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA();
      //@ts-ignore
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    const { orderId } = this.props;
    return (
      <>
        <CheckAuth>
          <Order orderId={orderId} />
        </CheckAuth>
      </>
    )
  }
}

export default OrderItemPage;
