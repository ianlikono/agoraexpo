import React from 'react';
import { Helmet } from 'react-helmet';
import CheckAuth from '../src/components/CheckAuth';
import Orders from '../src/components/orders';

export interface OrdersProps { }

function OrdersPage(props: OrdersProps) {
  return (
    <>
      <Helmet
        title='orders'
        meta={[{ name: "description", content: "orders Page" }]}
      />
      <CheckAuth>
        <Orders />
      </CheckAuth>
    </>
  );
}

export default OrdersPage;
