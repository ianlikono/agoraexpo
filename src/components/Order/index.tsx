import { format } from 'date-fns';
import truncate from 'lodash/truncate';
import React from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import formatMoney from '../../../lib/formatMoney';
import { getOrder } from '../../graphql/queries';
import OrderStyles from './styles';

export interface OrderProps {
  orderId: any;
}

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
  const { orderId } = props;
  return (
    <>
      <Helmet
        title={`order ${OrderItem.id}`}
        meta={[{ name: "description", content: "orders Page" }]}
      />
      <Query query={getOrder} variables={{ orderId }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) { console.log(error) };
          const { id, createdAt, total, items } = data.getOrder[0];
          return (
            <>
              <OrderStyles data-test="order">
                <p>
                  <span>Order ID:</span>
                  <span>{id}</span>
                </p>
                <p>
                  <span>Date</span>
                  <span>{format(createdAt, 'MMMM d, YYYY h:mm a', { awareOfUnicodeTokens: true })}</span>
                </p>
                <p>
                  <span>Order Total</span>
                  <span>{formatMoney(total)}</span>
                </p>
                <p>
                  <span>Item Count</span>
                  <span>{items.length}</span>
                </p>
                <div className="items">
                  {items.map(item => (
                    <div className="order-item" key={item.id}>
                      <img src={item.imageUrl} alt={item.title} />
                      <div className="item-details">
                        <h2>{item.title}</h2>
                        <p>Qty: {item.quantity}</p>
                        <p>Each: {formatMoney(item.price)}</p>
                        <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                        <p>Description: {truncate(item.description, {
                          length: 150,
                          separator: ' ',
                        })}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </OrderStyles>
            </>
          );
        }}
      </Query>
    </>
  );
}

export default Order;
