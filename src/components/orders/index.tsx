import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { Query } from 'react-apollo';
import { getMeOrders } from '../../graphql/queries';
import OrderItemStyles, { OrderUl } from './styles';

export interface OrdersProps { }

function Order(props: OrdersProps) {
  return (
    <>
      <Query query={getMeOrders}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) { console.log(error) };
          const { getMeOrders } = data;
          if(getMeOrders) {
            return (
              <>
                <div>
                  <h2 style={{ fontSize: '2rem' }}>You have {getMeOrders.length} {getMeOrders.length > 1 ? 'Orders' : 'Order'}</h2>
                  <OrderUl>
                    {getMeOrders.map(order => {
                      return (
                        <OrderItemStyles key={order.id}>
                          <Link
                            href={`/order/${order.id}`}>
                            <a>
                              <>
                                <p>{order.items.reduce((a, b) => a + b.quantity, 0)} Items</p>
                                <p>{order.items.length} Products</p>
                                <p>{format(order.createdAt, 'MMMM d, YYYY h:mm a', { awareOfUnicodeTokens: true })}</p>
                                <p>5 days ago</p>
                                <p>500</p>
                              </>
                              <div className="images">
                                {order.items.map(item => (
                                  <img key={item.id} src={item.imageUrl} alt={item.title} />
                                ))}
                              </div>
                            </a>
                          </Link>
                        </OrderItemStyles>
                      )
                    })}
                  </OrderUl>
                </div>
              </>
            );
          } else {
            <div>
              <h2>You Have No Orders</h2>
            </div>
          }
        }}
      </Query>
    </>
  );
}

export default Order;
