import { format } from 'date-fns';
import React from 'react';
import Helmet from 'react-helmet';
import formatMoney from '../../../lib/formatMoney';
import OrderStyles from './styles';

export interface OrderProps { }

const OrderItem = {
  id: 4004,
  charge: 1000,
  total: 1000,
  createdAt: '2019-04-30T23:36:33.580Z',
  items: [
    {
      id: 2323,
      title: 'waddup',
      description: "jdsjsdjsdajdlad",
      price: 344,
      image: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      quantity: 4
    }
  ]
}

function Order(props: OrderProps) {
  return (
    <>
      <Helmet
        title={`order ${OrderItem.id}`}
        meta={[{ name: "description", content: "orders Page" }]}
      />
      <OrderStyles data-test="order">
        <p>
          <span>Order ID:</span>
          <span>{OrderItem.id}</span>
        </p>
        <p>
          <span>Charge</span>
          <span>{OrderItem.charge}</span>
        </p>
        <p>
          <span>Date</span>
          <span>{format(OrderItem.createdAt, 'MMMM d, YYYY h:mm a', { awareOfUnicodeTokens: true })}</span>
        </p>
        <p>
          <span>Order Total</span>
          <span>{formatMoney(OrderItem.total)}</span>
        </p>
        <p>
          <span>Item Count</span>
          <span>{OrderItem.items.length}</span>
        </p>
        <div className="items">
          {OrderItem.items.map(item => (
            <div className="order-item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="item-details">
                <h2>{item.title}</h2>
                <p>Qty: {item.quantity}</p>
                <p>Each: {formatMoney(item.price)}</p>
                <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </OrderStyles>
    </>
  );
}

export default Order;
